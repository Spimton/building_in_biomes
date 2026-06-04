import { world, system, EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server'


world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const player = data.hitEntity
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')

    if (((player?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Chest)?.typeId == 'spimton:galena_necklace')) && chance <= 0.2
    ) {
        entity.addEffect('fatal_poison', 600, { amplifier: 4, showParticles: true })
        entity.addEffect('slowness', 300, { amplifier: 4, showParticles: true })
        entity.addEffect('weakness', 300, { amplifier: 4, showParticles: true })
        entity.runCommand("title @s actionbar You have §5[Profound Brain Damage]")
    }
})
world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const player = data.hitEntity
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')

    if (((player?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Chest)?.typeId == 'spimton:iridescence_necklace'))
    ) {
        entity.runCommand('effect @s blindness 2 1 true')
        const chance = Math.random()
        if (chance >= 0.8) {
            player.addEffect('strength', 300, { showParticles: false })
        }
        else {
            const chance = Math.random()
            if (chance >= 0.5) {
                const chance = Math.random()
                player.addEffect('speed', 300, { showParticles: false })
            }
            else {
                const chance = Math.random()
                if (chance >= 0.5) {
                    const chance = Math.random()
                    if (chance >= 0.5) {
                        player.addEffect('regeneration', 300, { showParticles: false })
                    }
                    else player.addEffect('resistance', 300, { showParticles: false })
                }
                else player.addEffect('fire_resistance', 300, { showParticles: false })
            }
        }
    }
})
world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const player = data.hitEntity
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')
    if ((player?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Chest)?.typeId == 'spimton:chilling_necklace')
    ) {
        entity.runCommand('damage @s 6 freezing')
    }
})

