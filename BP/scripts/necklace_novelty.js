import { world, system, EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server'
import { NoveltyManager, AccessoriesSlot } from "./lib/NoveltyManager";

NoveltyManager.registerAccessoriesItem("spimton:galena_necklace", AccessoriesSlot.Neckless);
NoveltyManager.registerAccessoriesItem("spimton:iridescence_necklace", AccessoriesSlot.Neckless);
NoveltyManager.registerAccessoriesItem("spimton:chilling_necklace", AccessoriesSlot.Neckless);




world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const player = data.hitEntity
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')
    let curio = NoveltyManager.getAccessoriesSlot(player, AccessoriesSlot.Neckless);
    if (((curio.typeId == 'spimton:galena_necklace')) && chance <= 0.2
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
    let curio = NoveltyManager.getAccessoriesSlot(player, AccessoriesSlot.Neckless);
    if (((curio.typeId == 'spimton:iridescence_necklace'))
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
    let curio = NoveltyManager.getAccessoriesSlot(player, AccessoriesSlot.Neckless);
    const playerEquipment = player.getComponent('equippable')
    if ((curio.typeId == 'spimton:chilling_necklace')
    ) {
        entity.runCommand('damage @s 6 freezing')
    }
})

