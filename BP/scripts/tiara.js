import { world, system, EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server'

world.afterEvents.playerBreakBlock.subscribe(data => {
    const player = data.player
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')
    if (playerEquipment.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:wisdom_tiara' && chance < 0.4
    ) {
        if (chance >= 0.2) {
            player.dimension.spawnEntity('minecraft:xp_orb', player.location)
        }
    }
})



world.afterEvents.entityHurt.subscribe(data => {
    const entity = data.hurtEntity
    const source = data.damageSource
    const sauce = source.damagingEntity;
    const chance = Math.random();
    const equippableHurt = entity.getComponent("equippable");
    //console.warn(equippableHurt.getEquipment(EquipmentSlot.Head).typeId);
    if (sauce) {
        console.warn("Sauce")
        const equippableHurting = sauce.getComponent("equippable");
        if (equippableHurting) {
            //console.warn(equippableHurting.getEquipment(EquipmentSlot.Head).typeId);
            if (equippableHurting.getEquipment(EquipmentSlot.Head) === undefined) { console.log("Headlee") }
            else {
                switch (equippableHurting.getEquipment(EquipmentSlot.Head).typeId) { //Hurting Entity
                    case "spimton:creeping_tiara":
                        if (chance < 0.07 * data.damage && entity.typeId != "spimton:creepie_hostile") sauce.dimension.spawnEntity('spimton:creepie_hostile', entity.location)
                        break;
                    case "spimton:wisdom_tiara":
                        if (chance >= 0.45) sauce.dimension.spawnEntity('minecraft:xp_orb', sauce.location);
                        break;


                };
            }
        }
    };
    if (equippableHurt) {
        if (equippableHurt.getEquipment(EquipmentSlot.Head) === undefined) { console.log("Headlee") }
        else {
            switch (equippableHurt.getEquipment(EquipmentSlot.Head).typeId) { //Hurt Entity
                case "spimton:wisdom_tiara":
                    console.warn("heyya")
                    entity.dimension.spawnEntity('minecraft:xp_orb', entity.location)
                    break;
                case "spimton:iridescence_tiara":
                    entity.runCommand('effect @s invisibility 2 1 true')
                    if (sauce) {
                        if (chance >= 0.67) {
                            sauce.addEffect('weakness', 300, { showParticles: false })
                        }
                        else {
                            if (chance < 0.35) {
                                sauce.addEffect('slowness', 300, { showParticles: false })
                            }
                            else {
                                sauce.addEffect('poison', 300, { showParticles: false })
                            }
                        };

                    };
                    break;

            };
        }
    }

})

