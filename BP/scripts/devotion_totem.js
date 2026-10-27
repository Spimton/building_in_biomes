import {
    world,
    system,
    EquipmentSlot
} from "@minecraft/server";

import {
    ConfigItems
} from "./CONFIG.js";

const CONFIG = ConfigItems.totemConfig.totemDevotion;

// ============================================================
// CHARGING PLAYERS
// ============================================================

const chargingPlayers = new Map();

const ITEM_COMPONENT = "spimton:totem_devotion";

// ============================================================
// CUSTOM ITEM COMPONENT
// ============================================================

export const TotemDevotionComponent = {

    onUse(event) {

        const player = event.source;

        // Don't charge while death protection is active.
        const active = player.getDynamicProperty(
            CONFIG.properties.active
        );

        if (typeof active === "number" && active > 0) {
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

        player.onScreenDisplay.setActionBar("");

        activateDeathProtection(
            player,
            CONFIG.maxChargeSeconds * 20
        );
        player.setDynamicProperty(CONFIG.properties.preventedDeaths, 0);
    }
};

// ============================================================
// ITEM RELEASE
// ============================================================

world.afterEvents.itemReleaseUse.subscribe((event) => {

    const player = event.source;
    const item = event.itemStack;

    if (!item) {
        return;
    }

    // Only handle Totem Devotion.
    if (!item.getComponent(ITEM_COMPONENT)) {
        return;
    }

    const charge = chargingPlayers.get(player.id);

    if (!charge) {
        return;
    }

    chargingPlayers.delete(player.id);

    player.onScreenDisplay.setActionBar("");

    const maxChargeTicks =
        CONFIG.maxChargeSeconds * 20;

    // The release event reports the remaining use duration.
    let chargedTicks =
        maxChargeTicks - event.useDuration;

    chargedTicks = Math.max(
        0,
        Math.min(chargedTicks, maxChargeTicks)
    );

    // Verify that the player is still holding the item
    // in their main hand when charging is released.
    const inventory = player.getComponent(
        "minecraft:inventory"
    )?.container;

    const mainhand = inventory?.getItem(
        player.selectedSlotIndex
    );

    if (!mainhand || !mainhand.getComponent(ITEM_COMPONENT)) {
        player.onScreenDisplay.setActionBar("");
        return;
    }
    if (chargedTicks > 20) {
        activateDeathProtection(player, chargedTicks);
        player.setDynamicProperty(CONFIG.properties.preventedDeaths, 0);
    }
    else {
        player.sendMessage(
            `§mNot enough charge!`
        )
    }
});

// ============================================================
// DEATH PROTECTION TIMER + CHARGE ACTIONBAR
// ============================================================
//
// Runs every tick.
//
// death_protection_active stores remaining protection ticks.
// 20 ticks = 1 second.
// ============================================================

system.runInterval(() => {

    for (const player of world.getAllPlayers()) {

        // ====================================================
        // CHARGE ACTIONBAR
        // ====================================================

        const charge = chargingPlayers.get(player.id);

        if (charge) {

            const mainhand = player.getComponent(
                "minecraft:inventory"
            )?.container
                ?.getItem(player.selectedSlotIndex);

            const isDevotionItem =
                mainhand?.getComponent(ITEM_COMPONENT) !== undefined;

            // Stop charging if the item is no longer held.
            if (!isDevotionItem) {

                chargingPlayers.delete(player.id);
                player.onScreenDisplay.setActionBar("");

                continue;
            }

            const elapsedTicks =
                system.currentTick - charge.startTick;

            const maxChargeTicks =
                CONFIG.maxChargeSeconds * 20;

            const chargeTicks = Math.min(
                elapsedTicks,
                maxChargeTicks
            );

            const chargeSeconds = chargeTicks / 20;

            const filledCharacters = Math.min(
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
        // DEATH PROTECTION TIMER
        // ====================================================

        const remaining = player.getDynamicProperty(
            CONFIG.properties.active
        );

        if (typeof remaining !== "number" || remaining <= 0) {
            continue;
        }

        const nextRemaining = Math.max(0, remaining - 1);

        player.setDynamicProperty(
            CONFIG.properties.active,
            nextRemaining
        );
        if (remaining > 0 && remaining % 2 === 0) {

            const location = player.location;

            // Random offsets around the player.
            const radius = 1.5;

            const x = location.x + (Math.random() * 2 - 1) * radius;
            const y = location.y + Math.random() * 2;
            const z = location.z + (Math.random() * 2 - 1) * radius;

            player.dimension.spawnParticle(
                "spimton:death_protection_emitter",
                { x, y, z }
            );
        }

        if (nextRemaining === 0) {
            const deaths = player.getDynamicProperty(CONFIG.properties.preventedDeaths) ?? 0;
            if (deaths > 0) {
                player.sendMessage(
                    "§7§oI'm at my limit"
                );
                player.addEffect("weakness", 200, { amplifier: deaths - 1 })
                // player.addEffect("slowness", 200, { amplifier: CONFIG.properties.preventedDeaths - 1 })
                player.addEffect("regeneration", 200, { amplifier: deaths - 1 })

            }
            else {
                player.sendMessage(
                    "§7§oWas it really worth it?"
                );
            }
            player.playSound("beacon.deactivate")
            player.setDynamicProperty(CONFIG.properties.preventedDeaths, 0);
            player.addEffect("resistance", 20, { amplifier: 4 });

        }

    }

}, 1);

// ============================================================
// ACTIVATE DEATH PROTECTION
// ============================================================

function activateDeathProtection(player, chargedTicks) {

    const maxChargeTicks =
        CONFIG.maxChargeSeconds * 20;

    chargedTicks = Math.max(
        0,
        Math.min(chargedTicks, maxChargeTicks)
    );

    if (chargedTicks <= 0) {
        return;
    }

    // Convert the charge duration into seconds.
    const chargeSeconds = chargedTicks / 20;

    // Calculate XP cost.
    const xpCost = Math.ceil(
        chargeSeconds *
        CONFIG.xpLevelsPerChargeSeconds
    );

    if (player.level < xpCost) {

        player.sendMessage(
            `§mNot enough XP levels! ` +
            `§7You need §e${xpCost} §7levels.`
        );

        return;
    }

    // Calculate protection duration in ticks.
    // This supports fractional multipliers such as 0.5.
    const protectionSeconds =
        chargeSeconds *
        CONFIG.protectionSecondsPerChargeSecond;

    const protectionTicks = Math.max(
        0,
        Math.round(protectionSeconds * 20)
    );

    if (protectionTicks <= 0) {
        return;
    }

    // Store the remaining protection duration.
    player.setDynamicProperty(
        CONFIG.properties.active,
        protectionTicks
    );

    // Store the charge duration for cooldown calculations.
    player.setDynamicProperty(
        CONFIG.properties.chargeTime,
        chargedTicks
    );

    // Deduct XP levels.
    player.addLevels(-xpCost);

    // Apply cooldown based on the charged duration.
    const cooldownSeconds =
        chargeSeconds *
        CONFIG.cooldownSecondsPerChargeSecond;

    const cooldownTicks = Math.ceil(
        cooldownSeconds * 20
    );

    player.startItemCooldown(
        "totem_devotion",
        cooldownTicks
    );

    player.sendMessage(
        `§7§oShine on me, Crazy Diamond!`
        /*`§bDeath protection activated! ` +
        `§7Charge: §e${chargeSeconds.toFixed(1)}s ` +
        `§7| Protection: §e${protectionSeconds.toFixed(1)}s ` +
        `§7| XP: §e-${xpCost}`*/
    );
}


world.beforeEvents.entityHurt.subscribe((event) => {

    const entity = event.hurtEntity;

    // Only protect players.
    if (entity.typeId !== "minecraft:player") {
        return;
    }

    // Must be lethal damage.
    const health = entity.getComponent("minecraft:health");

    if (!health) {
        return;
    }

    if (event.damage < health.currentValue) {
        return;
    }

    // Check the damage source against CONFIG.
    const cause = event.damageSource.cause;

    if (
        CONFIG.deathProtectionBypassSource.includes(cause)
    ) {
        return;
    }

    // Death protection must have remaining time.
    const protection = entity.getDynamicProperty(
        CONFIG.properties.active
    );

    if (typeof protection !== "number" || protection <= 0) {
        return;
    }

    // Require Totem of Devotion in the offhand.
    const equippable = entity.getComponent(
        "minecraft:equippable"
    );

    if (!equippable) {
        return;
    }

    const offhand = equippable.getEquipment(
        EquipmentSlot.Offhand
    );

    if (offhand?.typeId !== "spimton:totem_of_devotion") {
        return;
    }

    // Prevent the lethal damage.
    event.damage = 0;

    // Before-events restrict direct gameplay mutations.
    // Schedule the persistent counter update for the next tick.
    system.run(() => {
        try {
            const current = entity.getDynamicProperty(
                CONFIG.properties.preventedDeaths
            );

            entity.dimension.spawnParticle("minecraft:totem_particle", {
                x: entity.location.x,
                y: entity.location.y + 1,
                z: entity.location.z
            })
            entity.setDynamicProperty(
                CONFIG.properties.preventedDeaths,
                (typeof current === "number" ? current : 0) + 1
            );
            entity.playSound("random.totem");
        } catch (error) {
            console.warn(
                `[TotemDevotion] Failed to increment prevented deaths: ${error}`
            );
        }
    });

});