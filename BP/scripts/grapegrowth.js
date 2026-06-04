import { EquipmentSlot, GameMode, BlockPermutation, ItemStack, world, system } from "@minecraft/server";

/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */

function DURABILITYAAA(source, item, durabilityModifier, slot) {
    const equippable = source.getComponent("equippable");
    const durability = item.getComponent("durability");

    durability.damage += durabilityModifier;

    const maxDurability = durability.maxDurability
    const currentDamage = durability.damage
    if (currentDamage >= maxDurability) {


        source.playSound('random.break', { pitch: 1, location: source.location, volume: 1 })
        equippable.setEquipment(slot, undefined);
    }
    else if (currentDamage < maxDurability) {

        equippable.setEquipment(slot, item);
    }
}


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maxGrowth = 7;

/** @type {import("@minecraft/server").BlockCustomComponent} */
const GrapeGrowthBlockComponent = {
    beforeOnPlayerPlace: arg1 => {
        const block = arg1.block
        if (block.above().isAir) return;
        arg1.cancel = true;
    },
    onPlace: arg => {

        const block = arg.block
        const blockstates = block.permutation.getAllStates()
        if (block.permutation.getState("spimton:part") != 0) return;

        const Permutation = BlockPermutation.resolve(block.typeId, {
            'spimton:part': 1
        })
        block.above().setPermutation(Permutation)
    },
    onRandomTick({ block }) {
        const growthChance = 1 / 3;
        if (Math.random() > growthChance) return;
        const growthS = block.permutation.getState("spimton:growth")
        if (growthS === 7) return;
        setGrowth(block, 0, 1)

    },
    onPlayerInteract({ block, dimension, player }) {
        if (!player) return;

        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainhand.hasItem()) return;
        if (mainhand.typeId === "minecraft:bone_meal") {

            const growth = block.permutation.getState("spimton:growth");
            if (growth != 7) {
                if (player.getGameMode() === GameMode.Creative) {
                    // Grow crop fully


                    setGrowth(block, 1, 7)

                } else {

                    // Add random amount of growth
                    setGrowth(block, 2, 1)


                    // Decrement stack
                    if (mainhand.amount > 1) mainhand.amount--;
                    else mainhand.setItem(undefined);
                }

                // Play effects
                const effectLocation = block.center();
                dimension.playSound("item.bone_meal.use", effectLocation);
                dimension.spawnParticle("minecraft:crop_growth_emitter", effectLocation);
            }
        }
        if (mainhand.typeId === "minecraft:shears") {

            const growth = block.permutation.getState("spimton:growth");
            if (growth == 7) {


                // Add random amount of growth
                setGrowth(block, 1, 0)


                // Decrement stack
                const hand0 = mainhand.getItem()
                if (player.getGameMode() != GameMode.Creative) {
                    DURABILITYAAA(player, hand0, 1, EquipmentSlot.Mainhand)
                };

                block.dimension.spawnItem(new ItemStack(block.typeId, randomInt(1, 3)), block.center())


                // Play effects
                const effectLocation = block.center();
                dimension.playSound("item.shears.use", effectLocation);
            }
        }
        if (mainhand.typeId === "minecraft:glass_bottle" && block.typeId === "spimton:grapes") {
            const growth = block.permutation.getState("spimton:growth");
            if (growth === 7) {
                if (player.getGameMode() === GameMode.Creative) {
                    // Grow crop fully

                    setGrowth(block, 1, 0)
                    player.runCommand("give @s spimton:grape_bottle")
                } else {


                    setGrowth(block, 1, 0)

                    // Decrement stack
                    if (mainhand.amount > 1) mainhand.amount--;
                    else mainhand.setItem(undefined);
                    player.runCommand("give @s spimton:grape_bottle")
                }
            }
        }

    },
    onBreak({ block, brokenBlockPermutation }, { params }) {
        const prp = brokenBlockPermutation
        const ripe = block.below().permutation.getState("spimton:growth")
        const ripeu = block.above().permutation.getState("spimton:growth")
        const iden = params.iden;
        if (prp.getState("spimton:part") === 1) {
            if (ripe == 7) block.dimension.spawnItem(new ItemStack(iden, randomInt(1, 2)), block.below().center())
            block.below().setType("air");
            //else block.dimension.runCommand(`setblock ${block.below().location.x} ${block.below().location.y} ${block.below().location.z} air destroy`)
        }
        else {

            if (ripeu == 7) block.dimension.spawnItem(new ItemStack(iden, randomInt(1, 2)), block.above().center())
            block.above().setType("air");

        }
    }
};


function setGrowth(block, operation, Level) {
    const perm = block.permutation;
    let growth = perm.getState("spimton:growth");
    const part = perm.getState("spimton:part")
    growth += (randomInt(1, maxGrowth - growth)) * Level;
    const PermtoSet = BlockPermutation.resolve(block.typeId, {
        "spimton:growth": operation == 0 ? (growth + Level) : (operation == 1 ? Level : growth),
        "spimton:part": part
    })
    block.setPermutation(PermtoSet);

}

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:grapegrowth",
        GrapeGrowthBlockComponent
    );
});