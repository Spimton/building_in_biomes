import { system, world } from '@minecraft/server'
import { ConfigItems } from "./CONFIG.js"


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

const drunkConfig = ConfigItems.beverageConfig.bottledBeverageConfig.drunkConfig;

function drunkDuration(drunkEffect) {
    const { interval, duration } = drunkEffect
    return Math.round((interval * duration) / 20)
}

function checkPlayerInventory() {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent('minecraft:inventory').container;

        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i)

            if (item && item.typeId === loreWine) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Resistance (0:10)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreMead) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Strength (0:10)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreCider) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Saturation (0:01)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreAle) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Regeneration (0:10)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreBeetAle) {
                item.setLore([
                    '§r§9Nausea (0:05)',
                    '§r§9Absorption III (0:10)',
                    '§r§9Slowness I (0:05)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreGrog) {
                item.setLore([
                    '§r§9Nausea (0:10)',
                    '§r§9Saturation (0:0025)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreVodka) {
                item.setLore([
                    '§r§9Nausea (0:30)',
                    '§r§9Weakness (0:30)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreRedRum) {
                item.setLore([
                    '§r§9Nausea (0:10)',
                    '§r§9Blindness (0:10)',
                    '§r§9Strength III (0:10)',
                    '§r§9Sets consumer on fire'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreDreadGrog) {
                item.setLore([
                    '§r§9Nausea (0:05)',
                    '§r§9Bad Omen (0:60)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreEggnog) {
                item.setLore([
                    '§r§9Nausea (0:10)',
                    '§r§9Jump Boost (0:10)'
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
                    '§r§9Nausea (0:20)',
                    '§r§9Speed II (0:20)',
                    '§r§9Hunger II (0:20)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreHTLead) {
                item.setLore([
                    '§r§9Applies §5Profound Brain Damage§9:',
                    ' §r§7-§cNausea X',
                    ' §r§7-§cWeakness X',
                    ' §r§7-§cSlowness X',
                    ' §r§7-§cFatal Poison CCLVI',
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreLead) {
                item.setLore([
                    '§r§9Applies §uBrain Damage§9:',
                    ' §r§7-§cNausea II',
                    ' §r§7-§cWeakness II',
                    ' §r§7-§cSlowness II',
                    ' §r§7-§cPoison II',
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === loreSTStout) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Slowness V (0:20)',
                    '§r§9Resistance V (0:20)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorevliquor) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Removes all experience',
                    '§r§9Applies one level of Health Boost for each',
                    '§r§92 levels consumed',
                    '§r§mResults in an explosion if the user had',
                    '§r§malready drunk the Liquor.',
                    /*'',
                    'The Economist',
                    'In this world of Spies and Hats',
                    'Trades XP for better Stats'*/
                ])
                inventory.setItem(i, item)
            }
            /*if (item && item.typeId === loreCannate) {
                item.setLore([
                    '',
                    'The Australian',
                    'TF2 is the best game ever and',
                    'this Jarate is surprisingly tasty!'
                ])
                inventory.setItem(i, item)
            }*/
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
                    '§r§9Nausea (0:40)',
                    '§r§9Resistance (0:20)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorewwine) {
                item.setLore([
                    '§r§9Nausea (0:10)',
                    '§r§9Resistance (0:05)'
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lorevliquors) {
                item.setLore([
                    '§r§9Nausea (0:20)',
                    '§r§9Removes all active effects',
                    '§r§9Bestows one experience point for each',
                    '§r§9removed effect',
                    '§r§sPrevents Void Liquor combustion'

                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel1) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Speed (0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel2) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Haste (0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel3) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Hunger (0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel4) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Strength (0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel5) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Jump Boost (0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === randomwinel6) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Blindness (0:40)"
                ])
                inventory.setItem(i, item)
            }
            /*if (item && item.typeId === randomwinel7) {
                item.setLore([
                    
                ])
                inventory.setItem(i, item)
            }*/
            /*if (item && item.typeId === randomwinel8) {
                item.setLore([
                    'Semi-flammable Wine'
                ])
                inventory.setItem(i, item)
            }*/
            if (item && item.typeId === randomwinel9) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.redWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.redWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.redWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:40)",
                    "§r§9Charges §eDash Energy§9",
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === scrumpy[0]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.ciderDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.ciderDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.ciderDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:30)",
                    "§r§9Saturation V"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === scrumpy[1]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.ciderDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.ciderDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.ciderDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:30)",
                    "§r§9Converts §eDash Energy§9 into Speed"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === scrumpy[2]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.ciderDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.ciderDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.ciderDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:30)",
                    "§r§9Heals based on remaining time on fire"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[0]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.whiteWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.whiteWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.whiteWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:20)",
                    "§r§9Regeneration (0:20)"
                ])
                inventory.setItem(i, item)
            }
            /*if (item && item.typeId === whitew[1]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.whiteWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.whiteWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.whiteWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:20)",
                    "§r§9Hunger II (0:30)"
                ])
                inventory.setItem(i, item)
            }*/
            if (item && item.typeId === whitew[2]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.whiteWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.whiteWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.whiteWineDrunk.maxPower} maximum movement`,
                    "§r§9Heals based on the amplifier of your effects"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[3]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.whiteWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.whiteWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.whiteWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:20)",
                    "§r§9Jump Boost (0:20)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === whitew[4]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.whiteWineDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.whiteWineDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.whiteWineDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:20)",
                    "§r§9Briefly obfuscates camera"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === unfwinel) {
                item.setLore([
                    '',
                    "§r§9Hunger II (0:30)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === expwinel) {
                item.setLore([
                    "§mI ain't tasting this,"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[0]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.aleDrunk.ale_1_drunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.aleDrunk.ale_1_drunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.aleDrunk.ale_1_drunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:10 - 0:30)",
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[1]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.aleDrunk.ale_2_drunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.aleDrunk.ale_2_drunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.aleDrunk.ale_2_drunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:10 - 0:30)",
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[2]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.aleDrunk.ale_3_drunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.aleDrunk.ale_3_drunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.aleDrunk.ale_3_drunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:10 - 0:30)",
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[3]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.aleDrunk.ale_4_drunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.aleDrunk.ale_4_drunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.aleDrunk.ale_4_drunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:10 - 0:30)",
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[4]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.aleDrunk.ale_5_drunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.aleDrunk.ale_5_drunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.aleDrunk.ale_5_drunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:10 - 0:30)",
                    "§r§9Strength (0:10)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === ale[5]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.aleDrunk.ale_6_drunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.aleDrunk.ale_6_drunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.aleDrunk.ale_6_drunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:10 - 0:30)",
                    "§r§9Saturation (0:01 - 0:50)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lager[0]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.lagerDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.lagerDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.lagerDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:01 - 0:40)",
                    "§r§9Jump Boost III (0:05)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === lager[1]) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.lagerDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.lagerDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.lagerDrunk.maxPower} maximum movement`,
                    "§r§9Nausea (0:01 - 0:40)",
                    "§r§9Regeneration (0:01 - 0:20)"
                ])
                inventory.setItem(i, item)
            }/*
            if (item && item.typeId === lager[2]) {
                item.setLore([
                    'Bock'
                ])
                inventory.setItem(i, item)
            }*/
            if (item && item.typeId === vodka) {
                item.setLore([
                    '',
                    "§r§9Applies Drunk:",
                    `§r§7Frequency: ${Math.round(drunkConfig.vodkaDrunk.interval / 20)} seconds maximum`,
                    `§r§7Duration: ${drunkDuration(drunkConfig.vodkaDrunk)} seconds maximum`,
                    `§r§7Tipsy: ${drunkConfig.vodkaDrunk.maxPower} maximum movement`,
                    "§r§9Slowness (0:01 - 0:25)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === crude[0]) {
                item.setLore([
                    '',
                    "§r§9Hunger III (0:01 - 0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === crude[1]) {
                item.setLore([
                    '',
                    "§r§9Hunger III (0:01 - 0:40)"
                ])
                inventory.setItem(i, item)
            }
            if (item && item.typeId === crude[2]) {
                item.setLore([
                    '',
                    "§r§9Hunger III (0:01 - 0:40)"
                ])
                inventory.setItem(i, item)
            }

        }
    }
}


system.runInterval(checkPlayerInventory, 10)