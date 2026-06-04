import { EquipmentSlot, GameMode, world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";


/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maxGrowth = 7;
let Effect = undefined

function BeaconInterfaceOLD(player) {
    let IntBC = new ActionFormData()

    IntBC.title("Tainted Beacon")
    IntBC.body("Sacrifice ore blocks to give yourself helpful effects. \n§7Iron Block§f: Effect lasts 30 minutes, with a potency of 1. \n§gGold Block§f: Effects lasts 10 minutes, with a potency of 2.\n§qEmerald Block§f: Effect lasts 20 minutes and is given to nearby players.\n§bDiamond Block§f: Effect lasts indefinitely, with a potency of 1.\n§nNetherite Block§f: Effect lasts indefinitely, with a potency of 2")
    IntBC.button("Strength")
    IntBC.button("Speed")
    IntBC.button("Jump Boost")
    IntBC.button("Resistance")
    IntBC.button("Haste")
    IntBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§4Strength§r effect selected"}]}')
            BlockInterface(player)
            Effect = "Strength";
        }
        if (r.selection === 1) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§bSpeed§r effect selected"}]}')
            BlockInterface(player)
            Effect = "Speed";
        }
        if (r.selection === 2) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§aJump Boost§r effect selected"}]}')
            BlockInterface(player)
            Effect = "Jboost";
        }
        if (r.selection === 3) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§uResistance§r effect selected"}]}')
            BlockInterface(player)
            Effect = "Resistance";
        }
        if (r.selection === 4) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§gHaste§r effect selected"}]}')
            BlockInterface(player)
            Effect = "Haste";
        }
    })
}

function BeaconInterface(player) {
    let IntBC = new ModalFormData()

    IntBC.title("Tainted Beacon")
    const effects = ["Strength", "Speed", "Jump Boost", "Resistance", "Haste"]
    const materials = ["Iron", "Gold", "Emerald", "Diamond", "Netherite"]
    IntBC.dropdown("Effect", effects)
    IntBC.dropdown("Material", materials)
    IntBC.show(player).then(r => {
        if (r.canceled) return
        const materialIndex = r.formValues[1]
        const materialSel = materials[materialIndex]
        const effectIndex = r.formValues[0]
        const effectSel = ["strength", "speed", "jump_boost", "resistance", "haste"]
        //const effectId = effectSel.toLowerCase().replace(" ", "_")
        const effectId = effectSel[effectIndex]
        if (materialSel == "Iron") {
            player.runCommand('execute unless entity @s[hasitem={item=iron_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand(`execute if entity @p[hasitem={item=iron_block}] run effect @p ${effectId} 1800 0 true`)

            player.runCommand('clear @p iron_block 0 1');
        }
        if (materialSel == "Gold") {
            player.runCommand('execute unless entity @s[hasitem={item=gold_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand(`execute if entity @p[hasitem={item=gold_block}] run effect @p ${effectId} 900 1 true`)
            player.runCommand('clear @p gold_block 0 1');
        }
        if (materialSel == "Emerald") {
            player.runCommand('execute unless entity @s[hasitem={item=emerald_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand(`execute if entity @p[hasitem={item=emerald_block}] run effect @a[r=10] ${effectId} 1200 0 true`)
            player.runCommand('clear @p emerald_block 0 1');
        }
        if (materialSel == "Diamond") {
            player.runCommand('execute unless entity @s[hasitem={item=diamond_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand(`execute if entity @p[hasitem={item=diamond_block}] run effect @p ${effectId} infinite 0 true`)
            player.runCommand('clear @p diamond_block 0 1');
        }
        if (materialSel == "Netherite") {
            player.runCommand('execute unless entity @s[hasitem={item=netherite_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand(`execute if entity @p[hasitem={item=netherite_block}] run effect @p ${effectId} infinite 1 true`)
            player.runCommand('clear @p netherite_block 0 1');
        }
        else console.warn("Material doesn't exist")
    })
}
function BlockInterface(player) {
    let EffectBC = new ActionFormData()

    EffectBC.title("Select Block")
    EffectBC.button("Iron")
    EffectBC.button("Gold")
    EffectBC.button("Emerald")
    EffectBC.button("Diamond")
    EffectBC.button("Netherite")
    EffectBC.show(player).then(r => {
        if (r.canceled) BeaconInterface
        if (r.selection === 0) {
            player.runCommand("effect @s clear")
            player.runCommand('execute unless entity @s[hasitem={item=iron_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand('tellraw @s {"rawtext": [{"text":"§7Iron§r block selected"}]}')
            if (Effect == "Strength") player.runCommand('execute if entity @p[hasitem={item=iron_block}] run effect @p strength 1800 0 true')
            if (Effect == "Speed") player.runCommand('execute if entity @p[hasitem={item=iron_block}] run effect @p speed 1800 0 true')
            if (Effect == "Jboost") player.runCommand('execute if entity @p[hasitem={item=iron_block}] run effect @p jump_boost 1800 0 true')
            if (Effect == "Resistance") player.runCommand('execute if entity @p[hasitem={item=iron_block}] run effect @p resistance 1800 0 true')
            if (Effect == "Haste") player.runCommand('execute if entity @p[hasitem={item=iron_block}] run effect @p haste 1800 0 true')
            player.runCommand('clear @p iron_block 0 1');
        }
        if (r.selection === 1) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§gGold§r block selected"}]}')
            player.runCommand('execute unless entity @s[hasitem={item=gold_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand("effect @s clear")
            if (Effect == "Strength") player.runCommand('execute if entity @p[hasitem={item=gold_block}] run effect @p strength 900 1 true')
            if (Effect == "Speed") player.runCommand('execute if entity @p[hasitem={item=gold_block}] run effect @p speed 900 1 true')
            if (Effect == "Jboost") player.runCommand('execute if entity @p[hasitem={item=gold_block}] run effect @p jump_boost 900 1 true')
            if (Effect == "Resistance") player.runCommand('execute if entity @p[hasitem={item=gold_block}] run effect @p resistance 900 1 true')
            if (Effect == "Haste") player.runCommand('execute if entity @p[hasitem={item=gold_block}] run effect @p haste 900 1 true')
            player.runCommand('clear @p gold_block 0 1');
        }
        if (r.selection === 2) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§qEmerald§r block selected"}]}')
            player.runCommand('execute unless entity @s[hasitem={item=emerald_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand("effect @s clear")
            if (Effect == "Strength") player.runCommand('execute if entity @p[hasitem={item=emerald_block}] run effect @a[r=10] strength 1200 0 true')
            if (Effect == "Speed") player.runCommand('execute if entity @p[hasitem={item=emerald_block}] run effect @a[r=10] speed 1200 0 true')
            if (Effect == "Jboost") player.runCommand('execute if entity @p[hasitem={item=emerald_block}] run effect @a[r=10] jump_boost 1200 0 true')
            if (Effect == "Resistance") player.runCommand('execute if entity @p[hasitem={item=emerald_block}] run effect @a[r=10] resistance 1200 0 true')
            if (Effect == "Haste") player.runCommand('execute if entity @p[hasitem={item=emerald_block}] run effect @a[r=10] haste 1200 0 true')
            player.runCommand('clear @p emerald_block 0 1');
        }
        if (r.selection === 3) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§bDiamond§r block selected"}]}')
            player.runCommand('execute unless entity @s[hasitem={item=diamond_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand("effect @s clear")
            if (Effect == "Strength") player.runCommand('execute if entity @p[hasitem={item=diamond_block}] run effect @p strength infinite 0 true')
            if (Effect == "Speed") player.runCommand('execute if entity @p[hasitem={item=diamond_block}] run effect @p speed infinite 0 true')
            if (Effect == "Jboost") player.runCommand('execute if entity @p[hasitem={item=diamond_block}] run effect @p jump_boost infinite 0 true')
            if (Effect == "Resistance") player.runCommand('execute if entity @p[hasitem={item=diamond_block}] run effect @p resistance infinite 0 true')
            if (Effect == "Haste") player.runCommand('execute if entity @p[hasitem={item=diamond_block}] run effect @p haste infinite 0 true')
            player.runCommand('clear @p diamond_block 0 1');
        }
        if (r.selection === 4) {
            player.runCommand('tellraw @s {"rawtext": [{"text":"§nNetherite§r block selected"}]}')
            player.runCommand('execute unless entity @s[hasitem={item=netherite_block}] run tellraw @p{"rawtext":[{"text":"§cMissing resources!"}]}')
            player.runCommand("effect @s clear")
            if (Effect == "Strength") player.runCommand('execute if entity @p[hasitem={item=netherite_block}] run effect @p strength infinite 1 true')
            if (Effect == "Speed") player.runCommand('execute if entity @p[hasitem={item=netherite_block}] run effect @p speed infinite 1 true')
            if (Effect == "Jboost") player.runCommand('execute if entity @p[hasitem={item=netherite_block}] run effect @p jump_boost infinite 1 true')
            if (Effect == "Resistance") player.runCommand('execute if entity @p[hasitem={item=netherite_block}] run effect @p resistance infinite 1 true')
            if (Effect == "Haste") player.runCommand('execute if entity @p[hasitem={item=netherite_block}] run effect @p haste infinite 1 true')
            player.runCommand('clear @p netherite_block 0 1');
        }
    })
}


/** @type {import("@minecraft/server").BlockCustomComponent} */
const WeeperB = {
    onPlayerInteract({ block, dimension, player }) {
        if (!player) return;
        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        // Decrement stack
        BeaconInterface(player);






    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:tainted",
        WeeperB
    );
});


