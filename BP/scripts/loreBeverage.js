import { system, world } from '@minecraft/server'


const loreAle = 'spimton:ale'
const loreWine = 'spimton:wine'
const loreMead = 'spimton:mead'
const loreCider = 'spimton:cider'
const loreGrog = 'spimton:grog'
const loreVodka = 'spimton:vodka'
const loreBeetAle = 'spimton:beetroot_ale'
const loreRedRum = 'spimton:red_rum'
const loreDreadGrog = 'spimton:dread_grog'
const loreEggnog = 'spimton:egg_nog'
const lorePoison = 'spimton:poisoned_drink'
const loreGbeer = 'spimton:goblin_beer'
const loreSTStout = 'spimton:steel_toe_stout'
const lorespoison = 'spimton:spoison'
const lorevliquor = 'spimton:void_liquor'
const lorewwine = 'spimton:white_wine'
const lorerwine = 'spimton:red_wine'
const lorevliquors = 'spimton:snareling_drink'

const loreLead = 'spimton:lead_ingot'
const loreHTLead = 'spimton:ht_lead_ingot'
const loreCannate = 'spimton:canned_jarate'

const randomwinel1 = "spimton:random_wine_1"
const randomwinel2 = "spimton:random_wine_2"
const randomwinel3 = "spimton:random_wine_3"
const randomwinel4 = "spimton:random_wine_4"
const randomwinel5 = "spimton:random_wine_5"
const randomwinel6 = "spimton:random_wine_6"
const randomwinel7 = "spimton:random_wine_7"
const randomwinel8 = "spimton:random_wine_8"
const randomwinel9 = "spimton:random_wine_9"
const scrumpy = [
    "spimton:scrumpy_1",
    "spimton:scrumpy_2",
    "spimton:scrumpy_3"
]
const whitew = [
    "spimton:random_wine_w1",
    "spimton:random_wine_w2",
    "spimton:random_wine_w3",
    "spimton:random_wine_w4",
    "spimton:random_wine_w5"
]
const ale = [
    "spimton:random_ale_1",
    "spimton:random_ale_2",
    "spimton:random_ale_3",
    "spimton:random_ale_4",
    "spimton:random_ale_5",
    "spimton:random_ale_6"
]
const lager = [
    "spimton:random_lager_1",
    "spimton:random_lager_2",
    "spimton:random_lager_3"
]
const unfwinel = "spimton:random_wine_f1"
const expwinel = "spimton:exploded_beverage"
const crude = [
    "spimton:crude_ale",
    "spimton:crude_lager",
    "spimton:crude_vodka"
]
const vodka = "spimton:random_vodka"

function checkPlayerInventory() {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent('minecraft:inventory').container;

        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i)

            if (item && item.typeId === loreWine) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Applies §aResistance I§7 for §e10§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreMead) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Applies §aStrength I§7 for §e10§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreCider) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Fully restores hunger bar'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreAle) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Applies §aRegeneration I§7 for §e10§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreBeetAle) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e5§7 seconds',
                    ' §r§7Applies §cSlowness I§7 for §e5§7 seconds',
                    ' §r§7Applies §aAbsorption III§7 for §e5§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreGrog) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e10§7 seconds',
                    ' §r§7Replenishes a few hunger bars'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreVodka) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e30§7 seconds',
                    ' §r§7Applies §cWeakness I§7 for §e15§7 seconds',
                    ' §r§7Has high saturation'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreRedRum) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e10§7 seconds',
                    ' §r§7Applies §cBlindness§7 for §e10§7 seconds',
                    ' §r§7Applies §aStrength III§7 for §e10§7 seconds',
                    ' §r§7Sets consumer on fire'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreDreadGrog) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e5§7 seconds',
                    ' §r§7Applies §cBad Omen I§7 for §e60§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreEggnog) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e10§7 seconds',
                    ' §r§7Applies §aJump Boost§7 for §e10§7 seconds',
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorePoison) {
                item.setLore([
                    'This drink was poisoned.',
                    'You can thank me later',
                    'PIPIS, Spimton'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreGbeer) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Applies §aSpeed II§7 for §e20§7 seconds',
                    ' §r§7Applies §cHunger II§7 for §e20§7 seconds'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreHTLead) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §5[Profund Brain Damage]',
                    ' §r§7-§cNausea X',
                    ' §r§7-§cWeakness X',
                    ' §r§7-§cSlowness X',
                    ' §r§7-§cFatal Poison CCLVI',
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreLead) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §5[Brain Damage]',
                    ' §r§7-§cNausea II',
                    ' §r§7-§cWeakness II',
                    ' §r§7-§cSlowness II',
                    ' §r§7-§cPoison II',
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreSTStout) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Applies §cSlowness V§7 for §e20§7 seconds',
                    ' §r§7Applies §cResistance V§7 for §e20§7 seconds',
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorevliquor) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e20§7 seconds',
                    ' §r§7Removes §cALL§7 experience levels ',
                    ' §r§7Adds §a2 hearts§7 for each 2 points consumed,',
                    ' §r§7plus an additional 2',
                    ' §r§4Results in an explosion if the user had',
                    ' §r§4already drunk the Liquor.',
                    '',
                    'The Economist',
                    'In this world of Spies and Hats',
                    'Trades XP for better Stats'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreCannate) {
                item.setLore([
                    '',
                    'The Australian',
                    'TF2 is the best game ever and',
                    'this Jarate is surprisingly tasty!'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorespoison) {
                item.setLore([
                    '§r§7Affects HP a lot!',
                    '§r§7The Smooth Taste that melts in your pants,',
                    '§r§7not in your mouth.'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorerwine) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e40§7 seconds',
                    ' §r§7Applies §aResistance I§7 for §e20§7 seconds',
                    '',
                    'Cosmetic variant of normal Wine'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorewwine) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7Applies §cNausea§7 for §e10§7 seconds',
                    ' §r§7Applies §aResistance I§7 for §e5§7 seconds',
                    '',
                    'Cosmetic variant of normal Wine'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorevliquors) {
                item.setLore([
                    '§r§9Upon Consumption:',
                    ' §r§7For each effect active on the drinker,',
                    ' §r§7one experience level is added',
                    ' §r§7Removes all active effects',
                    ' §r§7Applies §cNausea§7 afterwards,',
                    ' §r§7with its duration based on removed effects.',
                    ' §r§7Prevents Spontaneous Combustion if you already',
                    ' §r§7drank a Void Liquor',
                    '',
                    'LimiTed Snareling Edition',
                    'Digest powerful acid that dissolves everything.'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel1) {
                item.setLore([
                    'Barolo'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel2) {
                item.setLore([
                    'Chianti'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel3) {
                item.setLore([
                    'Merlot'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel4) {
                item.setLore([
                    'Pinot Noir'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel5) {
                item.setLore([
                    'Cabernet Sauvignon'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel6) {
                item.setLore([
                    'Bordeaux'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel7) {
                item.setLore([
                    'Tactical Amarone'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel8) {
                item.setLore([
                    'Semi-flammable Wine'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel9) {
                item.setLore([
                    'Barbera'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === scrumpy[0]) {
                item.setLore([
                    'Scrumpy'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === scrumpy[1]) {
                item.setLore([
                    'Applewine'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === scrumpy[2]) {
                item.setLore([
                    'Ice Cider'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[0]) {
                item.setLore([
                    'Champagne'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[1]) {
                item.setLore([
                    'Prosecco'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[2]) {
                item.setLore([
                    'Verdicchio'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[3]) {
                item.setLore([
                    'Vermentino'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[4]) {
                item.setLore([
                    'Gewürztraminer'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === unfwinel) {
                item.setLore([
                    'Rose'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === expwinel) {
                item.setLore([
                    'I hate it when I accidentally',
                    'mess up a recipe and the cellar',
                    'suddenly explodes.'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[0]) {
                item.setLore([
                    'Strong Ale'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[1]) {
                item.setLore([
                    'Pale Ale'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[2]) {
                item.setLore([
                    'Trippel'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[3]) {
                item.setLore([
                    'Brown Ale'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[4]) {
                item.setLore([
                    'Red Ale'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[5]) {
                item.setLore([
                    'Porter'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lager[0]) {
                item.setLore([
                    'Lager'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lager[1]) {
                item.setLore([
                    'Pilsner'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lager[2]) {
                item.setLore([
                    'Bock'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === vodka) {
                item.setLore([
                    'Vodka'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === crude[0]) {
                item.setLore([
                    'Crude Ale'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === crude[1]) {
                item.setLore([
                    'Crude Lager'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === crude[2]) {
                item.setLore([
                    'Crude Vodka'
                ])
                inventory.setItem(i, item)
            }
        }
    }
}


system.runInterval(checkPlayerInventory, 10)