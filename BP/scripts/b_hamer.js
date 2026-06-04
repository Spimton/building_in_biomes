import { world, system, ItemStack } from '@minecraft/server';

function HamDur(source, item, durabilityModifier) {
    const equippable = source.getComponent("equippable");
    const durability = item.getComponent("durability");

    durability.damage += durabilityModifier;

    const maxDurability = durability.maxDurability
    const currentDamage = durability.damage
    if (currentDamage >= maxDurability) {


        source.playSound('random.break', { pitch: 1, location: source.location, volume: 1 })
        equippable.setEquipment("Mainhand", undefined);
    }
    else if (currentDamage < maxDurability) {

        equippable.setEquipment("Mainhand", item);
    }
}

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:b_hamer', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {

                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "chiseled_" + name
                block.setType(blockToSet)
                source.runCommand(`execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 ${blockToSet} replace ${blockfull}`)
                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
            else {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "cracked_" + name
                block.setType(blockToSet)
                source.runCommand(`execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 ${blockToSet} replace ${blockfull}`)
                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:b_smoothener', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "smooth_" + name
                block.setType(blockToSet)
                source.runCommand(`execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 ${blockToSet} replace ${blockfull}`)
                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
            else {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "polished_" + name
                block.setType(blockToSet)
                source.runCommand(`execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 ${blockToSet} replace ${blockfull}`)
                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
            }
        }
    })
})
