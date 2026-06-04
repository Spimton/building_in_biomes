import { EquipmentSlot, GameMode, world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";


/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maxGrowth = 7;

function TimeCont(player) {
    let OptionTC = new ActionFormData()

    OptionTC.title("Time Controller")
    OptionTC.body("Sacrifice a clock to select daytime, or destroy your Chronos Staff to freeze daylight cycle, which can be reversed with the Unfreeze button.")
    OptionTC.button("Day")
    OptionTC.button("Noon")
    OptionTC.button("Night")
    OptionTC.button("Midnight")
    OptionTC.button("Sunrise")
    OptionTC.button("Sunset")
    OptionTC.button("Freeze daylight cycle")
    OptionTC.button("Unfreeze daylight cycle")

    OptionTC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('time set day'), player.runCommand('clear @s clock 0 1'), player.runCommand('tellraw @a {"rawtext": [{"translate": "§a%%1§f set time to §eDay", "with":{"rawtext": [{"selector":"@p"}]}}]}')
        if (r.selection === 1) player.runCommand('time set noon'), player.runCommand('clear @s clock 0 1'), player.runCommand('tellraw @a {"rawtext": [{"translate": "§a%%1§f set time to §eNoon", "with":{"rawtext": [{"selector":"@p"}]}}]}')
        if (r.selection === 2) player.runCommand('time set night'), player.runCommand('clear @s clock 0 1'), player.runCommand('tellraw @a {"rawtext": [{"translate": "§a%%1§f set time to §eNight", "with":{"rawtext": [{"selector":"@p"}]}}]}')
        if (r.selection === 3) player.runCommand('time set midnight'), player.runCommand('clear @s clock 0 1'), player.runCommand('tellraw @a {"rawtext": [{"translate": "§a%%1§f set time to §eMidnight", "with":{"rawtext": [{"selector":"@p"}]}}]}')
        if (r.selection === 4) player.runCommand('time set sunrise'), player.runCommand('clear @s clock 0 1'), player.runCommand('tellraw @a {"rawtext": [{"translate": "§a%%1§f set time to §eSunrise", "with":{"rawtext": [{"selector":"@p"}]}}]}')
        if (r.selection === 5) player.runCommand('time set sunset'), player.runCommand('clear @s clock 0 1'), player.runCommand('tellraw @a {"rawtext": [{"translate": "§a%%1§f set time to §eSunset", "with":{"rawtext": [{"selector":"@p"}]}}]}')
        if (r.selection === 6) player.runCommand('execute unless entity @s[hasitem={item=spimton:chronos_staff}] run tellraw @s {"rawtext": [{"text":"§cYou need a Chronos Staff to freeze time!"}]}'), player.runCommand('execute if entity @s[hasitem={item=spimton:chronos_staff}] run gamerule dodaylightcycle false'), player.runCommand('execute if entity @s[hasitem={item=spimton:chronos_staff}] run tellraw @a {"rawtext": [{"translate": "§a%%1§f froze time!", "with":{"rawtext": [{"selector":"@p"}]}}]}'), player.runCommand('clear @s spimton:chronos_staff -1 1')
        if (r.selection === 7) player.runCommand('gamerule dodaylightcycle true'), player.runCommand('tellraw @a {"rawtext": [{"text": "Time flows normally now"}]}')
    })
}
function BayCont(player) {
    let OptionBC = new ActionFormData()

    OptionBC.title("Rune Control Panel")
    OptionBC.body("Sacrifice a Blaze Rod to make all your placed runes go boom! You can also retrieve your placed runes with the second option.")
    OptionBC.button("Do Michael Bay")
    OptionBC.button("Retrieve Runes")
    OptionBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('execute if entity @e[type=spimton:rune_fire] run clear @s blaze_rod 0 1'), player.runCommand('execute unless entity @e[type=spimton:rune_fire] run tellraw @p {"rawtext": [{"translate": "§cYou need at least one Fire Rune to use this ability!"}]}'), player.runCommand('execute if entity @e[type=spimton:rune_fire] run tellraw @a {"rawtext": [{"translate": "§a%%1§f activated their Runes!", "with":{"rawtext": [{"selector":"@p"}]}}]}'), player.runCommand('execute at @e[type=spimton:rune_fire] run summon spimton:fireball_spawner'), player.runCommand('execute as @e[type=spimton:rune_fire] run tp @s ~ ~-10 ~'), player.runCommand('execute as @e[type=spimton:rune_fire] run kill @s')
        if (r.selection === 1) player.runCommand('execute if entity @e[type=spimton:rune_fire] run tellraw @p {"rawtext": [{"translate": "Retrieved all runes!"}]}'), player.runCommand('execute unless entity @e[type=spimton:rune_fire] run tellraw @p {"rawtext": [{"translate": "§cNo runes to retrieve!"}]}'), player.runCommand('execute as @e[type=spimton:rune_fire] run give @p spimton:rune_fire_spawner'), player.runCommand('execute as @e[type=spimton:rune_fire] run tp @s ~ ~-10 ~'), player.runCommand('execute as @e[type=spimton:rune_fire] run kill @s')
    })
}

/** @type {import("@minecraft/server").BlockCustomComponent} */
const OvergrownOrb = {
    onPlayerInteract({ block, dimension, player }) {
        if (!player) return;

        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainhand.hasItem() || mainhand.typeId === "minecraft:clock") {

            // Decrement stack
            if (mainhand.amount >= 1) TimeCont(player);


            else mainhand.setItem(undefined);


        }
        else if (!mainhand.hasItem() || mainhand.typeId === "minecraft:blaze_rod") {

            // Decrement stack
            if (mainhand.amount >= 1) BayCont(player);


            else mainhand.setItem(undefined);


        }

    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:overgrown_orb",
        OvergrownOrb
    );
});


