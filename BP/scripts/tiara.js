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
    const chance = Math.random()
    const playerEquipment = entity.getComponent('equippable')
    if (entity?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:wisdom_tiara'
    ) {
        entity.dimension.spawnEntity('minecraft:xp_orb', entity.location)
    }
})

world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const player = data.hitEntity
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')
    if (player?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:iridescence_tiara'
    ) {
        player.runCommand('effect @s invisibility 2 1 true')
        const chance = Math.random()
        if (chance >= 0.8) {
            entity.addEffect('weakness', 300, { showParticles: false })
        }
        else {
            const chance = Math.random()
            if (chance >= 0.5) {
                const chance = Math.random()
                entity.addEffect('slowness', 300, { showParticles: false })
            }
            else {
                entity.addEffect('poison', 300, { showParticles: false })
            }
        }
    }
})

world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const chance = Math.random()
    const playerEquipment = entity.getComponent('equippable')
    if (entity?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:wisdom_tiara'
    ) {
        if (chance >= 0.45) {
            entity.dimension.spawnEntity('minecraft:xp_orb', entity.location)
        }
    }
})

world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const chance = Math.random()
    const masochist = data.hitEntity
    const playerEquipment = entity.getComponent('equippable')
    if (entity?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:creeping_tiara'
    ) {
        if (chance >= 0.5) {
            entity.dimension.spawnEntity('spimton:creepie_hostile', masochist.location)
        }
    }
})
