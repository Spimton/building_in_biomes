import { world, system, ItemStack, GameMode, BlockPermutation } from '@minecraft/server'

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:hamer', {
        onUseOn({ source, block }) {

            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "chiseled_" + name
                block.setType(blockToSet)

                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
            else {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "cracked_" + name
                block.setType(blockToSet)

                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
            }
        }
    })
})
const hamer = 'spimton:hammer'
world.afterEvents.itemStartUseOn.subscribe(evd => {
    const { source: player, block, itemStack: itemUsed } = evd;
    if (!itemUsed) return;

    if (hamer.includes(itemUsed.typeId)) {
        const playerEquippableComp = player.getComponent("equippable");
        if (!playerEquippableComp) return;
        if (player.matches({ gameMode: GameMode.Creative })) return;
        const itemEnchantmentComp = itemUsed.getComponent("minecraft:enchantable");
        const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        const randomizeChance = Math.random() * 100;
        if (breakChance < randomizeChance) return;
        const itemUsedDurabilityComp = itemUsed.getComponent("durability");
        if (!itemUsedDurabilityComp) return;
        system.run(function () {
            const maxDurability = itemUsedDurabilityComp.maxDurability
            const currentDamage = itemUsedDurabilityComp.damage
            if (currentDamage >= maxDurability) {
                system.run(() => {
                    player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 })
                    playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
                });
            }
            else if (currentDamage < maxDurability) {
                system.run(() => {
                    itemUsedDurabilityComp.damage += 1;
                    playerEquippableComp.setEquipment("Mainhand", itemUsed);
                });
            }
        })
    }
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:chisel', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "chiseled_" + name
                block.setType(blockToSet)

                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
            else {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "chiseled_" + name
                block.setType(blockToSet)
                source.runCommand(`execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 ${blockToSet} replace ${blockfull}`)
                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
            }

        }
    })
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:mallet', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "cracked_" + name
                block.setType(blockToSet)

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
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:smoothener', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "smooth_" + name
                block.setType(blockToSet)

                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
            else {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "polished_" + name
                block.setType(blockToSet)

                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
            }
        }
    })
})




system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:file', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "smooth_" + name
                block.setType(blockToSet)

                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

            }
            else {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "smooth_" + name
                block.setType(blockToSet)
                source.runCommand(`execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 ${blockToSet} replace ${blockfull}`)
                source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
            }
        }
    })
})


system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:sbrush', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                const blockfull = block.typeId
                const id = blockfull.substring(0, blockfull.indexOf(':') + 1)
                const name = blockfull.substring(blockfull.indexOf(':') + 1, blockfull.length)
                const blockToSet = id + "polished_" + name
                block.setType(blockToSet)

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


system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:abrush', {
        onUseOn({ source, block }) {
            if (source?.isSneaking) {
                if (block.typeId === 'spimton:sandy_hoary_stone_bricks') {
                    block.setType('spimton:hoary_stone_bricks')
                    source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')

                    HamDur(source, item, 1)
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run loot spawn ~ ~ ~ loot "chests/antique_dust"')
                }
                else if (block.typeId === 'spimton:cracked_sandy_hoary_stone_bricks') {
                    block.setType('spimton:cracked_hoary_stone_bricks')
                    source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run loot spawn ~ ~ ~ loot "chests/antique_dust"')
                    HamDur(source, item, 1)

                }
                else if (block.typeId === 'spimton:chiseled_sandy_hoary_stone_bricks') {
                    block.setType('spimton:chiseled_hoary_stone_bricks')
                    source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run loot spawn ~ ~ ~ loot "chests/antique_dust"')
                    HamDur(source, item, 1)

                }

            }
            else {

                if (block.typeId === 'spimton:sandy_hoary_stone_bricks') {
                    block.setType('spimton:hoary_stone_bricks')
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run loot spawn ~ ~ ~ loot "chests/antique_dust"')
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 spimton:hoary_stone_bricks replace spimton:sandy_hoary_stone_bricks')
                    HamDur(source, item, 1)
                }
                else if (block.typeId === 'spimton:cracked_sandy_hoary_stone_bricks') {
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run loot spawn ~ ~ ~ loot "chests/antique_dust"')
                    block.setType('spimton:cracked_hoary_stone_bricks')
                    source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 spimton:cracked_hoary_stone_bricks replace spimton:cracked_sandy_hoary_stone_bricks')
                    HamDur(source, item, 1)
                }
                else if (block.typeId === 'spimton:chiseled_sandy_hoary_stone_bricks') {
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run loot spawn ~ ~ ~ loot "chests/antique_dust"')
                    block.setType('spimton:chiseled_hoary_stone_bricks')
                    source.runCommand('playsound hit.iron @a[r=5] ~ ~ ~')
                    source.runCommand('execute at @p anchored eyes positioned ^ ^1 ^1 run fill ~1 ~ ~1 ~-1 ~-2 ~-1 spimton:chiseled_hoary_stone_bricks replace spimton:chiseled_sandy_hoary_stone_bricks')
                    HamDur(source, item, 1)
                }
            }
        }
    })
})


function pleasedurabilitywork(source, item, durabilityModifier) {
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
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:codex', {
        onUseOn({ source, block, itemStack }) {

            if (source?.isSneaking) {
                if (block.typeId === 'spimton:gloom_tiles') {
                    block.setType('spimton:runed_gloom_tiles_p')
                    if (!source.matches({ gameMode: GameMode.Creative })) {
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                        pleasedurabilitywork(source, itemStack, 1)
                    }
                }

            }
            else {
                if (block.typeId === 'spimton:gloom_tiles') {
                    block.setType('spimton:runed_gloom_tiles')
                    if (!source.matches({ gameMode: GameMode.Creative })) {
                        pleasedurabilitywork(source, itemStack, 1)
                    }
                }
                else {
                    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
                    const eq = source.getComponent("equippable").getEquipment("Head")
                    const ec = source.getComponent("equippable").getEquipment("Chest")
                    if (block.typeId === 'spimton:hoary_runestone') {

                        if (eq?.typeId === "spimton:antique_cloth_hood" && ec?.typeId === "spimton:antique_cloth_cape") {

                            block.setPermutation(block.permutation.withState("spimton:rune", randomInt(1, 9)))
                            block.dimension.playSound("block.grindstone.use", block.location, { volume: 0.5 })
                            if (!source.matches({ gameMode: GameMode.Creative })) {
                                pleasedurabilitywork(source, itemStack, 1)

                            };
                        }
                    }
                    if (block.typeId === 'spimton:nethengic_runestone') {

                        if (eq?.typeId === "spimton:nethengic_cloth_hood" && ec?.typeId === "spimton:nethengic_cloth_cape") {

                            block.setPermutation(block.permutation.withState("spimton:rune", randomInt(1, 9)))
                            block.dimension.playSound("block.grindstone.use", block.location, { volume: 0.5 })
                            if (!source.matches({ gameMode: GameMode.Creative })) {
                                pleasedurabilitywork(source, itemStack, 1)
                            };
                        }
                    }
                }
            }
        }
    })
})

world.beforeEvents.playerInteractWithBlock.subscribe(arg => {

    const { block, player } = arg

    const equipment = player.getComponent('equippable');
    const selectedItem = equipment.getEquipment('Mainhand');
    if (selectedItem?.hasTag('minecraft:is_axe') && block?.hasTag('spimton:stripper')) {

        system.runTimeout(() => {

            strip(block, player, arg.itemStack)
        }, 0)

    }
})

function strip(block, source, itemStack) {
    const woodType = block.typeId
    const id = woodType.substring(0, woodType.indexOf(':') + 1)
    const name = woodType.substring(woodType.indexOf(':') + 1, woodType.length)
    const blockToSet = id + "stripped_" + name
    const blockState = block.permutation.getState("minecraft:block_face");
    if (blockState) {
        block.dimension.playSound("use.wood", block.center())
        const strippedWood = BlockPermutation.resolve(blockToSet, { "minecraft:block_face": blockState })
        block.setPermutation(strippedWood)
        if (!source.matches({ gameMode: GameMode.Creative })) {
            pleasedurabilitywork(source, itemStack, 1)
        };
    }
}