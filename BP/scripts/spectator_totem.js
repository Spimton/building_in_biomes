import {
    world,
    system,
    GameMode
} from "@minecraft/server";

import {
    ConfigItems
} from "./CONFIG.js";

const CONFIG = ConfigItems.totemConfig.totemVision;

// ============================================================
// CHARGING PLAYERS
// ============================================================
//
// We only keep the start tick in memory while a player is
// charging the item.
//
// The actual spectator state is stored using dynamic properties.
// ============================================================

const chargingPlayers = new Map();


// ============================================================
// CUSTOM ITEM COMPONENT
// ============================================================

export const TotemVisionComponent = {

    onUse(event) {

        const player = event.source;

        // Don't allow the item to be activated while the
        // player is already using its spectator ability.
        if (player.getDynamicProperty(CONFIG.properties.active) === true) {
            return;
        }

        // Don't start another charge if one already exists.
        if (chargingPlayers.has(player.id)) {
            return;
        }

        chargingPlayers.set(player.id, {
            startTick: system.currentTick
        });
    },

    onCompleteUse(event) {

        const player = event.source;
        const charge = chargingPlayers.get(player.id);

        if (!charge) {
            return;
        }

        chargingPlayers.delete(player.id);

        // Clear actionbar
        player.onScreenDisplay.setActionBar("");

        // Full 10 second charge
        activateSpectator(
            player,
            CONFIG.maxChargeSeconds * 20
        );
    }
};


// ============================================================
// ITEM RELEASE
// ============================================================
// chargedTicks = 200 - remainingTicks
// ============================================================

world.afterEvents.itemReleaseUse.subscribe((event) => {

    const player = event.source;
    const item = event.itemStack;

    if (!item) {
        return;
    }

    const customComponent =
        item.getComponent("spimton:spectator_item");

    if (!customComponent) {
        return;
    }

    const charge =
        chargingPlayers.get(player.id);

    if (!charge) {
        return;
    }

    chargingPlayers.delete(player.id);

    player.onScreenDisplay.setActionBar("");

    const maxChargeTicks =
        CONFIG.maxChargeSeconds * 20;

    let chargedTicks =
        maxChargeTicks - event.useDuration;

    chargedTicks = Math.max(
        0,
        Math.min(
            chargedTicks,
            maxChargeTicks
        )
    );
    const inventory =
        player.getComponent("minecraft:inventory")?.container;

    const mainhand =
        inventory?.getItem(player.selectedSlotIndex);

    if (
        !mainhand ||
        !mainhand.getComponent("spimton:spectator_item")
    ) {
        chargingPlayers.delete(player.id);
        player.onScreenDisplay.setActionBar("");
        return;
    }
    activateSpectator(
        player,
        chargedTicks
    );
});


// ============================================================
// SPECTATOR TIMER
// ============================================================
//
// Runs every tick.
//
// The remaining time is stored in a dynamic property, so the
// actual timer isn't dependent on the JavaScript Map.
// ============================================================

system.runInterval(() => {

    for (const player of world.getAllPlayers()) {

        // ====================================================
        // CHARGE ACTIONBAR
        // ====================================================

        const charge = chargingPlayers.get(player.id);

        if (charge) {

            const mainhand = player.getComponent("minecraft:inventory")
                ?.container
                ?.getItem(player.selectedSlotIndex);

            const isSpectatorItem =
                mainhand?.getComponent("spimton:spectator_item") !== undefined;

            // Player changed item / no longer has the spectator item
            if (!isSpectatorItem) {

                chargingPlayers.delete(player.id);

                player.onScreenDisplay.setActionBar("");

                continue;
            }


            // ========================================================
            // UPDATE CHARGE BAR
            // ========================================================

            const elapsedTicks =
                system.currentTick - charge.startTick;

            const maxChargeTicks =
                CONFIG.maxChargeSeconds * 20;

            const chargeTicks =
                Math.min(
                    elapsedTicks,
                    maxChargeTicks
                );

            const chargeSeconds =
                chargeTicks / 20;


            const filledCharacters =
                Math.min(
                    10,
                    Math.floor(chargeSeconds)
                );

            const emptyCharacters =
                10 - filledCharacters;


            const bar =
                "§2" +
                "0".repeat(filledCharacters) +
                "§5" +
                "0".repeat(emptyCharacters);


            player.onScreenDisplay.setActionBar(bar);
        }


        // ====================================================
        // SPECTATOR TIMER
        // ====================================================

        const active =
            player.getDynamicProperty(
                CONFIG.properties.active
            );

        if (active !== true) {
            continue;
        }


        let remaining =
            player.getDynamicProperty(
                CONFIG.properties.time
            );


        if (typeof remaining !== "number") {

            endSpectator(player);

            continue;
        }


        remaining--;


        if (remaining > 0) {

            player.setDynamicProperty(
                CONFIG.properties.time,
                remaining
            );

        } else {

            endSpectator(player);

        }

        const minY =
            CONFIG.spectatorMinY[player.dimension.id];

        if (
            minY !== undefined &&
            player.location.y <= minY
        ) {
            endSpectator(player);
            player.sendMessage("§5§oYou lost it when you tried to see too far...")
            continue;
        }
    }

}, 1);


// ============================================================
// END SPECTATOR
// ============================================================

function endSpectator(player) {

    const gameMode =
        player.getDynamicProperty(
            CONFIG.properties.previousGameMode
        );

    const location =
        player.getDynamicProperty(
            CONFIG.properties.previousLocation
        );

    const dimensionId =
        player.getDynamicProperty(
            CONFIG.properties.previousDimension
        );

    const chargeTicks =
        player.getDynamicProperty(
            CONFIG.properties.chargeTime
        );

    if (typeof chargeTicks === "number") {

        const chargeSeconds =
            chargeTicks / 20;

        const cooldownSeconds =
            chargeSeconds *
            CONFIG.cooldownSecondsPerChargeSecond;

        const cooldownTicks =
            Math.ceil(cooldownSeconds * 20);

        player.startItemCooldown(
            "spectator_item",
            cooldownTicks
        );
    }

    // ========================================================
    // RESTORE GAMEMODE
    // ========================================================

    if (typeof gameMode === "string") {

        try {

            player.setGameMode(gameMode);

        } catch (error) {

            console.warn(
                `[SpectatorItem] ` +
                `Failed to restore gamemode for ${player.name}: ` +
                `${error}`
            );
        }
    }


    // ========================================================
    // RESTORE LOCATION
    // ========================================================

    if (
        location &&
        typeof location.x === "number" &&
        typeof location.y === "number" &&
        typeof location.z === "number"
    ) {

        try {

            if (typeof dimensionId === "string") {

                const dimension =
                    world.getDimension(dimensionId);

                player.teleport(
                    location,
                    {
                        dimension: dimension
                    }
                );

            } else {

                player.teleport(location);
            }

        } catch (error) {

            console.warn(
                `[SpectatorItem] ` +
                `Failed to restore location for ${player.name}: ` +
                `${error}`
            );
        }
    }


    // ========================================================
    // CLEAR DYNAMIC PROPERTIES
    // ========================================================

    player.setDynamicProperties({

        [CONFIG.properties.active]:
            undefined,

        [CONFIG.properties.time]:
            undefined,

        [CONFIG.properties.previousGameMode]:
            undefined,

        [CONFIG.properties.previousLocation]:
            undefined,

        [CONFIG.properties.previousDimension]:
            undefined,

        [CONFIG.properties.chargeTime]:
            undefined
    });


    player.sendMessage(
        "§bSpectator time ended."
    );
}

function activateSpectator(player, chargedTicks) {

    const maxChargeTicks =
        CONFIG.maxChargeSeconds * 20;

    chargedTicks = Math.max(
        0,
        Math.min(
            chargedTicks,
            maxChargeTicks
        )
    );

    if (chargedTicks <= 0) {
        return;
    }

    const chargeSeconds =
        chargedTicks / 20;

    const xpCost =
        Math.ceil(
            chargeSeconds *
            CONFIG.xpLevelsPerChargeSecond
        );

    if (player.level < xpCost) {

        player.sendMessage(
            `§cNot enough XP levels! ` +
            `§7You need §e${xpCost} §7levels.`
        );

        return;
    }

    const spectatorSeconds =
        chargeSeconds *
        CONFIG.spectatorSecondsPerChargeSecond;

    const spectatorTicks =
        Math.round(
            spectatorSeconds * 20
        );

    // Save state
    player.setDynamicProperties({

        [CONFIG.properties.active]:
            true,

        [CONFIG.properties.time]:
            spectatorTicks,

        [CONFIG.properties.previousGameMode]:
            player.getGameMode(),

        [CONFIG.properties.previousLocation]:
            player.location,

        [CONFIG.properties.previousDimension]:
            player.dimension.id,

        [CONFIG.properties.chargeTime]:
            chargedTicks
    });

    // XP
    player.addLevels(-xpCost);

    // Spectator
    player.setGameMode(GameMode.Spectator);

    player.sendMessage(
        `§bSpectator activated! ` +
        `§7Charge: §e${chargeSeconds.toFixed(1)}s ` +
        `§7| Time: §e${spectatorSeconds.toFixed(1)}s ` +
        `§7| XP: §e-${xpCost}`
    );
}