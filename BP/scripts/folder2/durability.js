import { world, ItemStack, GameMode } from '@minecraft/server'

const toolTypeIds = [
    'spimton:steel_pickaxe',
    'spimton:steel_axe',
    'spimton:steel_shovel',
    'spimton:steel_hoe',
    'spimton:bronze_pickaxe',
    'spimton:bronze_axe',
    'spimton:bronze_shovel',
    'spimton:bronze_hoe',
    'spimton:limestone_hatchet',
    'spimton:red_limestone_hatchet',
    'spimton:electrum_hatchet',
    'spimton:obsidian_hatchet',
    'spimton:applen_pickaxe',
    'spimton:applen_axe',
    'spimton:applen_shovel',
    'spimton:applen_hoe',
    'spimton:agold_hatchet',
    'spimton:imperial_jade_hatchet',
    'spimton:firebrand'
];

const weaponTypeIds = [
    'spimton:steel_sword',
    'spimton:bronze_sword',
    'spimton:applen_sword',
    'spimton:frost_cutter',
    'spimton:black_knife',
    'spimton:silver_sword'
];


world.afterEvents.playerBreakBlock.subscribe(evd => {
    const { player, itemStackBeforeBreak: itemUsed } = evd;
    if (!itemUsed || player.matches({ gameMode: GameMode.Creative })) return;

    if (toolTypeIds.includes(itemUsed.typeId) || weaponTypeIds.includes(itemUsed.typeId) || itemUsed.hasTag("spimton:breakdurability")) {
        const playerEquippableComp = player.getComponent("equippable");
        if (!playerEquippableComp) return;
        const itemEnchantmentComp = itemUsed.getComponent("minecraft:enchantable");
        const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        const randomizeChance = Math.random() * 100;
        if (breakChance < randomizeChance) return;
        const itemUsedDurabilityComp = itemUsed.getComponent("durability");
        if (!itemUsedDurabilityComp) return;

        let durabilityModifier = 0;
        if (toolTypeIds.includes(itemUsed.typeId)) {
            durabilityModifier = 1;
        } else {
            durabilityModifier = 2;
        }
        const maxDurability = itemUsedDurabilityComp.maxDurability
        const currentDamage = itemUsedDurabilityComp.damage
        if (currentDamage >= maxDurability) {
            player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 })
            playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
        }
        else if (currentDamage < maxDurability) {
            itemUsedDurabilityComp.damage += durabilityModifier;
            playerEquippableComp.setEquipment("Mainhand", itemUsed);
        }
    }
})
