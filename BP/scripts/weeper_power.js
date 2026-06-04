import { EquipmentSlot, GameMode, world, system } from "@minecraft/server";

/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maxGrowth = 7;

/** @type {import("@minecraft/server").BlockCustomComponent} */
const WeeperBossSpawner = {
    onPlayerInteract({ block, dimension, player }) {
        if (!player) return;

        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainhand.hasItem() || !(mainhand.typeId === "minecraft:wither_skeleton_skull" || mainhand.typeId === "spimton:crither_skull")) {
            player.runCommand("title @p actionbar The Altar needs a §cWither Skeleton Skull§f to activate...")
            return;
        }
        const activated = block.permutation.getState("spimton:activated")
        if (activated == false) {
            player.runCommand("title @p actionbar The Altar's Soul §vis not ready yet§f...")
            return;
        }


        block.setPermutation(block.permutation.withState('spimton:activated', false))

        // Decrement stack
        if (mainhand.amount > 1) mainhand.amount--;


        else mainhand.setItem(undefined);


        // Play effects
        const effectLocation = block.above();
        dimension.playSound("mob.wither.spawn", effectLocation);
        dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", effectLocation);
        dimension.runCommand('give @p spimton:weeper_soul')
    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:creeping_boss",
        WeeperBossSpawner
    );
});

