import { EquipmentSlot, GameMode, world, system } from "@minecraft/server";

/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maxPower = 15;

/** @type {import("@minecraft/server").BlockCustomComponent} */
const Powaa = {
    onRandomTick({ block }) {
        const powerChanc = 0.1;
        if (Math.random() > powerChanc) return;

        block.setPermutation(block.permutation.withState("spimton:activated", true))
    }
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:overgrown_act",
        Powaa
    );
});