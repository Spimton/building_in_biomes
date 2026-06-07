import { world, system, EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server'

world.afterEvents.entityHurt.subscribe(data => {
    const entity = data.hurtEntity
    const sauce = data.damageSource.damagingEntity;
    const chance = Math.random();
    const equippableHurt = entity.getComponent("equippable");
    if (equippableHurt.getEquipment(EquipmentSlot.Chest)) {

        switch (equippableHurt.getEquipment(EquipmentSlot.Chest).typeId) { //Hurt Entity
            case "spimton:galena_necklace":
                console.warn("Galena")
                if (chance <= 0.2) {
                    if (sauce) {
                        sauce.addEffect('fatal_poison', 600, { amplifier: 4, showParticles: true })
                        sauce.addEffect('slowness', 300, { amplifier: 4, showParticles: true })
                        sauce.addEffect('weakness', 300, { amplifier: 4, showParticles: true })
                        sauce.runCommand("title @s actionbar You have §5[Profound Brain Damage]")
                    }
                }
                break;
            case "spimton:iridescence_necklace":
                console.warn("Iridiscence")
                if (sauce) sauce.runCommand('effect @s blindness 2 1 true')
                if (chance >= 0.8) {
                    entity.addEffect('strength', 300, { showParticles: false })
                }
                else {
                    if (chance >= 0.6) {

                        entity.addEffect('speed', 300, { showParticles: false })
                    }
                    else {

                        if (chance >= 0.2) {

                            if (chance >= 0.4) {
                                entity.addEffect('regeneration', 300, { showParticles: false })
                            }
                            else entity.addEffect('resistance', 300, { showParticles: false })
                        }
                        else entity.addEffect('fire_resistance', 300, { showParticles: false })
                    }
                }
                break;
            case "spimton:chilling_necklace":
                if (sauce) {
                    const dx = (sauce.location.x - entity.location.x)
                    const dy = (sauce.location.y - entity.location.y)
                    const dz = (sauce.location.z - entity.location.z)
                    const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
                    const maxDistance = 64
                    if (distance <= maxDistance) {
                        const percentageDamage = 1 - (distance / maxDistance)
                        sauce.applyDamage(data.damage * percentageDamage + 3.5, { cause: "freezing", damagingEntity: entity })
                    }

                }
                break;
        };
    }
})