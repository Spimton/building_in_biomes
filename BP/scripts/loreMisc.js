import { system, world } from '@minecraft/server'
import { ConfigItems } from "./CONFIG.js"

class loreItem {
    constructor(itemId, lore) {
        this.itemId = itemId;
        this.lore = lore;
    }
}


const ItemArray = [
    /*new loreItem("spimton:lootbox_dungeon", ["", "§r§7When broken, dispenses", "§r§eSpimple Dungeon§7 rewards"]),
    new loreItem("spimton:lootbox_mineshaft", ["", "§r§7When broken, dispenses", "§r§eAbandoned Mineshaft§7 rewards"]),
    new loreItem("spimton:lootbox_jungle_temple", ["", "§r§7When broken, dispenses", "§r§eJungle Temple§7 rewards"]),
    new loreItem("spimton:lootbox_pillager_outpost", ["", "§r§7When broken, dispenses", "§r§ePillager Outpost§7 rewards"]),
    new loreItem("spimton:lootbox_blacksmith", ["", "§r§7When broken, dispenses", "§r§eVillage Blacksmith§7 rewards"]),
    new loreItem("spimton:lootbox_stronghold", ["", "§r§7When broken, dispenses", "§r§eStronghold Altar§7 rewards"]),
    new loreItem("spimton:lootbox_woodland_mansion", ["", "§r§7When broken, dispenses", "§r§bWoodland Mansion§7 rewards"]),
    new loreItem("spimton:lootbox_desert_temple", ["", "§r§7When broken, dispenses", "§r§bDesert Temple§7 rewards"]),
    new loreItem("spimton:lootbox_vault", ["", "§r§7When broken, dispenses", "§r§bRegular Vault§7 rewards"]),
    new loreItem("spimton:lootbox_shipwreck", ["", "§r§7When broken, dispenses", "§r§bShipwreck Treasure§7 rewards"]),
    new loreItem("spimton:lootbox_buried_treasure", ["", "§r§7When broken, dispenses", "§r§bBuried Treasure§7 rewards"]),
    new loreItem("spimton:lootbox_ruined_portal", ["", "§r§7When broken, dispenses", "§r§bRuined Portal§7 rewards"]),
    new loreItem("spimton:lootbox_ancient_city", ["", "§r§7When broken, dispenses", "§r§dAncient City§7 rewards"]),*/
    new loreItem("spimton:galena_necklace", ["§r§9When on Chest:", " §r§7Applies §cSlowness II", " §r§7Has a §e20%§7 chance to inflict", " §r§5[Profound Brain Damage] §7to attackers"]),
    new loreItem("spimton:might_necklace", ["§r§9When on Chest:", " §r§7Applies §aStrength III", " §r§7Applies §aJump Boost III"]),
    new loreItem("spimton:iridescence_necklace", ["§r§9When on Chest:", " §r§7Inflicts §cBlindness§7 to attackers", " §r§7Applies a random buff when hit"]),
    new loreItem("spimton:chilling_necklace", ["§r§9When on Chest:", " §r§7Inflicts §cSlowness§7 to nearby entities", " §r§7Reflects some damage as §eFreezing damage"]),
    new loreItem("spimton:indestructibility_tiara", [" §r§7Increased durability"]),
    new loreItem("spimton:wisdom_tiara", ["§r§9When on Head:", " §r§7Gives experience when you break", " §r§7a block, get hit or hit something"]),
    new loreItem("spimton:iridescence_tiara", ["§r§9When on Head:", " §r§7Applies §aInvisibility§7 when attacked", " §r§7Inflicts a random debuff to attackers"]),
    new loreItem("spimton:nautilus_tiara", ["§r§9When on Head:", " §r§7Applies §aConduit Power§7 for §e20§7 seconds", " §r§7Recharges while out of water"]),
    //new loreItem("spimton:chronos_staff", ["§r§7Right click to accelerate daytime", "§r§7Shift right click to stop the ability"]),
    //  new loreItem("spimton:elon_termonucleare", ["", "§7Lunga vita a Elon Termonucleare!", "§7A NOI LA VITTORIA!!!", "", "§7-Francesco Marani, 2025"]),
    // new loreItem("spimton:chilling_horn", ["§r§9On Use:", " §r§7Inflicts permanent §cSlowness V§7 and", " §r§cWeakness V§7 to nearby enemies"]),
    //  new loreItem("spimton:splosion_staff", ["§r§7Shoots gravity-affected fireballs depending on ammo.", "§r§7Charge longer for further projectile landing.", "", "§r§vSmall Ammo§7: Explosion power = 2", "§r§vBig Ammo§7: Explosion power = 4", "§r§vHigh Velocity Ammo§7: Further throw"]),
    new loreItem("spimton:creeping_tiara", ["§r§9When on Head:", " §r§7Hitting an enemy will have a chance of summoning", " §r§7a §2Creepie§9. It will attack everything.", "§r§7Pacifies Player Creepies."]),
    new loreItem("spimton:ghostly_necklace", ["§r§9When on Chest:", " §r§7Crouching will create a path of ghostly blocks", " §r§7below you, that decay over time.", " §r§4WARNING:§c staying in one place for too long", " §r§cwill result in brief instabilities, which may", " §r§ccause a 'bugrock moment' when playing on a server.", " §r§cUse it at your own risk,", " §r§c-PIPIS, Spimton"]),
    // new loreItem("spimton:platinum_gauntlet", ["§r§7Use item to create explosion", "§r§7Use item while sneaking to create bigger explosion"]),
    //new loreItem("spimton:celerity_gauntlet", ["", "§r§7Use item to propel yourself forward", "§r§7Use item while sneaking to propel yourself backwards", "", "§7For three hundred years, people who needed", "§7to get to the second floor", "§7used the only method which was available", "§7to them, which was rocket jumping.", "§7This peristed until 1857, when the young president", "§7Abraham Lincoln invented stairs."]),
    //new loreItem("spimton:king_cannon", ["§r§7Shoots both pocket bombs and regular arrows,", "§r§7and can be charged to unleash the projactile with", "§r§7maximum velocity. Supports Crossbow enchantments"]),
    /* new loreItem("spimton:sit_bronze_statue", ["", "§r§7Sit"]),
     new loreItem("spimton:player_bronze_statue", ["", "§r§7Player"]),
     new loreItem("spimton:creeper_bronze_statue", ["", "§r§7Creeper"]),
     new loreItem("spimton:scared_bronze_statue", ["", "§r§7Scared"]),
     new loreItem("spimton:dance_bronze_statue", ["", "§r§7Dance"]),
     new loreItem("spimton:wryyy_bronze_statue", ["", "§r§7WRYYYYYYY"]),
    new loreItem("spimton:tough_mud_statue", ["", "§r§7Tough"]),
    new loreItem("spimton:brute_mud_statue", ["", "§r§7Brute"]),
    new loreItem("spimton:curious_mud_statue", ["", "§r§7Curious"]),
    new loreItem("spimton:calm_mud_statue", ["", "§r§7Calm"]),
    new loreItem("spimton:healthy_mud_statue", ["", "§r§7Healthy"]),
    new loreItem("spimton:tough_crimstone_statue", ["", "§r§7Tough"]),
    new loreItem("spimton:brute_crimstone_statue", ["", "§r§7Brute"]),
    new loreItem("spimton:curious_crimstone_statue", ["", "§r§7Curious"]),
    new loreItem("spimton:calm_crimstone_statue", ["", "§r§7Calm"]),
    new loreItem("spimton:healthy_crimstone_statue", ["", "§r§7Healthy"]),
    new loreItem("spimton:sit_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§vBlock of Bronze"]),
    new loreItem("spimton:scared_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§vBlock of Bronze"]),
    new loreItem("spimton:player_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§vBlock of Bronze"]),
    new loreItem("spimton:dance_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§vBlock of Bronze"]),
    new loreItem("spimton:creeper_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§vBlock of Bronze"]),
    new loreItem("spimton:wryyy_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§vBlock of Bronze"]),
    new loreItem("spimton:tough_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§nMud Bricks"]),
    new loreItem("spimton:brute_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§nMud Bricks"]),
    new loreItem("spimton:healthy_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§nMud Bricks"]),
    new loreItem("spimton:curious_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§nMud Bricks"]),
    new loreItem("spimton:calm_template", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§nMud Bricks"]),
    new loreItem("spimton:tough_template_c", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§mCrimstone Bricks"]),
    new loreItem("spimton:brute_template_c", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§mCrimstone Bricks"]),
    new loreItem("spimton:healthy_template_c", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§mCrimstone Bricks"]),
    new loreItem("spimton:curious_template_c", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§mCrimstone Bricks"]),
    new loreItem("spimton:calm_template_c", ["§r§7Statue Template", "", "§r§9Can Sculpt:", "§r§mCrimstone Bricks"]),*/
    // new loreItem("spimton:unbreakable_leggings", ["§r§7Applies §aSpeed I§7 when under half health", "§r§5Full Set Bonus:", "§r§7Applies §aFire Resistance§7 when", "§r§7under half health"]),
    // new loreItem("spimton:unbreakable_tiara", ["§r§7Applies §aStrength I§7 when under half health", "§r§5Full Set Bonus:", "§r§7Applies §aFire Resistance§7 when", "§r§7under half health"]),
    //new loreItem("spimton:unbreakable_necklace", ["§r§7Applies §aResistance I§7 when under half health", "§r§5Full Set Bonus:", "§r§7Applies §aFire Resistance§7 when", "§r§7under half health"]),

    new loreItem("spimton:steel_shield", ["§8Level 10 Shield\n", "§r§bCan block while attacking", `§r§bYou can dash forward, but with ${ConfigItems.steelTargeDash} ticks of cooldown`, `§r§c${100 - ConfigItems.steelTargeReduction * 100}% damage reduction penalty`, `§r§e${Math.round(Math.acos(ConfigItems.steelTargeBlockArc) * 180 / Math.PI)}§7 degrees protection`]),
    new loreItem("spimton:gold_shield", ["§8Level 10 Shield\n", "§r§bCan block while attacking", `§r§bYou can dash forward, but with ${ConfigItems.goldTargeDash} ticks of cooldown`, `§r§c${100 - ConfigItems.goldTargeReduction * 100}% damage reduction penalty`, `§r§e${Math.round(Math.acos(ConfigItems.goldTargeBlockArc) * 180 / Math.PI)}§7 degrees protection`]),
    new loreItem("spimton:charge_shield", ["§8Level 15 Shield\n", "§r§bCan block while attacking", "§r§bYou can dash forward with no cooldown", "§r§bDamages entities upon collision", `§r§c${100 - ConfigItems.chargeTargeReduction * 100}% damage reduction penalty`, "§r§c-100% Knockback resistance", "§r§cCharge is interrupted for 1 second upon recieving damage", `§r§e${Math.round(Math.acos(ConfigItems.chargeTargeBlockArc) * 180 / Math.PI)}§7 degrees protection`]),
    new loreItem("spimton:ancient_gold_shield", ["§8Level 15 Shield\n", "§r§bCan block while attacking", "§r§bYou can dash forward with no cooldown", "§r§bGain §eDash§b energy while on fire", `§r§c${100 - ConfigItems.sunTargeReduction * 100}% damage reduction penalty`, "§r§cCharge only when on fire", "§r§hDepending on §eDash§h energy, sets you or the enemy on fire", `§r§e${Math.round(Math.acos(ConfigItems.sunTargeBlockArc) * 180 / Math.PI)}§7 degrees protection`]),
    new loreItem("spimton:charge_shield_td", ["§8Level 20 Shield\n", "§r§bCan block while attacking", "§r§bYou can dash forward with no cooldown", "§r§bDamages entities upon collision", "§r§bReflects damage on attacker", `§r§c${100 - ConfigItems.chargeTarge2Reduction * 100}% damage reduction penalty`, "§r§c-100% Knockback resistance", "§r§cCharge is interrupted for 1 second upon collision", `§r§e${Math.round(Math.acos(ConfigItems.chargeTarge2BlockArc) * 180 / Math.PI)}§7 degrees protection`]),

];

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const playerContainer = player.getComponent("inventory").container
        for (let i = 0; i < playerContainer.size; i++) {
            const item = playerContainer.getItem(i);
            const findLore = ItemArray.find(x => x.itemId == item?.typeId);
            const lore = item?.getLore();
            if (!findLore || !item || lore?.length != 0) continue
            item.setLore(findLore.lore);
            playerContainer.setItem(i, item);
        }
    }
}, 1);

