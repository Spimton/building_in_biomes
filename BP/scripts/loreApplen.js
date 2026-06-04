import { system, world } from '@minecraft/server'

class loreItem {
    constructor(itemId, lore) {
        this.itemId = itemId;
        this.lore = lore;
    }
}

const ItemArray = [
    new loreItem("spimton:applen_helmet", ["§r§9Full set bonus:", " §r§7Never lose hunger"]),
    new loreItem("spimton:applen_chestplate", ["§r§9Full set bonus:", " §r§7Never lose hunger"]),
    new loreItem("spimton:applen_leggings", ["§r§9Full set bonus:", " §r§7Never lose hunger"]),
    new loreItem("spimton:applen_boots", ["§r§9Full set bonus:", " §r§7Never lose hunger"]),
    new loreItem("spimton:applen_sword", ["§r§7Hit an entity or mine a block", "§r§7to recover hunger points"]),
    new loreItem("spimton:applen_pickaxe", ["§r§7Hit an entity or mine a block", "§r§7to recover hunger points"]),
    new loreItem("spimton:applen_axe", ["§r§7Hit an entity or mine a block", "§r§7to recover hunger points"]),
    new loreItem("spimton:applen_shovel", ["§r§7Hit an entity or mine a block", "§r§7to recover hunger points"]),
    new loreItem("spimton:applen_hoe", ["§r§7Hit an entity or mine a block", "§r§7to recover hunger points"]),
    new loreItem("spimton:jade_helmet", ["§r§9Full set bonus:", "§r§7Poison and Wither immunity"]),
    new loreItem("spimton:jade_chestplate", ["§r§9Full set bonus:", "§r§7Poison and Wither immunity"]),
    new loreItem("spimton:jade_leggings", ["§r§9Full set bonus:", "§r§7Poison and Wither immunity"]),
    new loreItem("spimton:jade_boots", ["§r§9Full set bonus:", "§r§7Poison and Wither immunity"]),
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

