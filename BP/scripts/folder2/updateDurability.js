export function updateItemDurability(source, item, durabilityModifier, slot) {
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