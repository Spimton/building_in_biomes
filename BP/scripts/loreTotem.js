import { system, world, EquipmentSlot } from '@minecraft/server'


const loreTotemBulwark = 'spimton:totem_of_bulwark'
const loreTotemVision = 'spimton:totem_of_vision'
const loreTotemPoison = 'spimton:totem_of_poison'
const loreTotemVitality = 'spimton:totem_of_vitality'
const loreTotemEnfeeblement = 'spimton:totem_of_enfeeblement'
const loreTotemResonance = 'spimton:totem_of_resonance'
const loreTotemFlight = 'spimton:totem_of_flight'
const loreTotemCombustion = 'spimton:totem_of_combustion'
const loreTotemDevotion = 'spimton:totem_of_devotion'
const loreTotemLuxury = 'spimton:totem_of_luxury'

function checkPlayerInventory() {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent('minecraft:inventory').container;

        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i)


            if (item && item.typeId === loreTotemBulwark) {
                item.setLore([
                    '§r§9When in Main Hand:',
                    ' §r§7Right click to give yourself §aResistance II',
                    ' §r§7for §e30§7 seconds',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Grants §aAbsorption I§7'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemVision) {
                item.setLore([
                    '§r§9When in Main Hand:',
                    ' §r§7Grants §aNight Vision§7',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Grants §aInvisibility§7'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemPoison) {
                item.setLore([
                    '§r§9When in Main Hand:',
                    ' §r§7Removes §cPoison§7 and §cFatal Poison§7',
                    ' §r§7from nearby entities',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Inflicts §cPoison§7 to nearby entities',
                    ' §r§7every §e10§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemVitality) {
                item.setLore([
                    '§r§9When in Main Hand:',
                    ' §r§7Right click to give yourself §aRegeneration II',
                    ' §r§7for §e5§7 seconds',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Grants §aHealth Boost V§7'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemResonance) {
                item.setLore([
                    '§r§9When in Mainhand:',
                    ' §r§7Right click to remove all effects from nearby',
                    ' §r§7entities',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Negative effect immunity'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemFlight) {
                item.setLore([
                    '§r§9When in Main Hand:',
                    ' §r§7Grants §cLevitation II§7',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Grants §aSlow Falling§7'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemEnfeeblement) {
                item.setLore([
                    '§r§9When in Main Hand:',
                    ' §r§7Inflicts §cSlowness IV§7 to nearby entities',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Inflicts §cWeakness IV§7 to nearby entities'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemCombustion) {
                item.setLore([
                    '',
                    '§2This is the most beautiful thing I have',
                    '§2ever seen in this universe...',
                    '§3Gimmie the bomb',
                    '',
                    '§r§9When in Main Hand:',
                    ' §r§7Right click block to do Michael Bay on',
                    ' §r§7nearby entities',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Shift to summon various TNT around you'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemDevotion) {
                item.setLore([
                    '',
                    '§9Diamond is Unbreakable§7, but you are not.',
                    '',
                    '§r§7Stand: §9[Crazy Diamond]',
                    '',
                    '§r§9When in Main Hand:',
                    ' §r§7Right click to activate stand',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Applies brief §aResistance V§7 after being hit'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreTotemLuxury) {
                item.setLore([
                    '',
                    '§gHere comes the money, money money money money...',
                    '',
                    '§r§9When in Main Hand:',
                    ' §r§7Gives §aHero of the Village',
                    '',
                    '§r§9When in Offhand:',
                    ' §r§7Gives you random riches every 5 seconds'
                ])
                inventory.setItem(i, item)
            }
        }
    }
}


system.runInterval(checkPlayerInventory, 10)

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:totem_bulwark', {
        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            source.addEffect("resistance", 600, { showParticles: false, amplifier: 1 })
            source.playSound("smithing_table.use")
        }
    })
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:totem_vitality', {
        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            source.addEffect("regeneration", 100, { showParticles: false, amplifier: 1 })
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:totem_resonance', {
        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            source.runCommand("effect @e[r=5] clear")
            source.playSound("random.totem")
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:totem_devotion', {
        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            source.runCommand("effect @e[r=10] regeneration 45 255 true")
            source.extinguishFire
            source.addEffect("instant_health", 40, { showParticles: false, amplifier: 100 })
            source.runCommand('tellraw @a[r=10] {"rawtext": [{"translate": "§f<%%1> Diamond is Unbreakable!", "with":{"rawtext": [{"selector":"@p"}]}}]}')
            source.playSound("random.totem")
        }
    })
})

world.afterEvents.entityHitEntity.subscribe(data => {
    const entity = data.damagingEntity
    const player = data.hitEntity
    const chance = Math.random()
    const playerEquipment = player.getComponent('equippable')
    if (player?.hasComponent('equippable') && playerEquipment.getEquipment(EquipmentSlot.Offhand)?.typeId == 'spimton:totem_of_devotion'
    ) {
        player.addEffect('resistance', 20, { showParticles: false, amplifier: 4 })
    }
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:totem_combustion', {
        onUse: arg => {
            let source = arg.source
            source.addTag("bay")
            source.runCommand('tag @e[type=item] add bay')
            source.runCommand('tag @e[type=xp_orb] add bay')
            source.runCommand('execute at @e[tag=!bay, r=32, c=1] run summon tnt')
            source.removeTag("bay")
        }
    })
})

