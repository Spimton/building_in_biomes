import { system, world, BlockComponentTypes } from '@minecraft/server';

const MoogRecord = [
    'spimton:record_moogcity'
];

const CreativeRecord = [
    'spimton:record_creative'
];

const OvergrownRecord = [
    'spimton:record_overgrown'
];

const WeeperRecord = [
    'spimton:record_weeper'
];
const JuandiceRecord = [
    'spimton:record_juandice'
]

const EquestrianRecord = [
    'spimton:record_equestrian'
]

const RodentRecord = [
    'spimton:record_ratt'
]


world.beforeEvents.playerInteractWithBlock.subscribe(evd => {
    const { player, itemStack, block } = evd;

    // This returns if the interacted block is not a Jukebox
    if (!block.permutation.matches('minecraft:jukebox')) return;
    const record = block.getComponent('record_player')

    if (itemStack && !player?.isSneaking) {
        if (MoogRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("moogcity", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:record_one.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
        if (CreativeRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("music.ptn", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:record_sruins.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
        if (OvergrownRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("music.overgrown_boss", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:overgrown_boss.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
        if (WeeperRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("music.weeper_boss", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:weeper_boss.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
        if (JuandiceRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("music.juandice_boss", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:juandice_boss.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
        if (EquestrianRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("music.horseman_boss", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:horseman_boss.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
        if (RodentRecord.includes(itemStack.typeId)) {

            if (!record?.isPlaying()) {
                system.run(function () {
                    block.dimension.playSound("music.ratt_boss", block.location)
                    player.runCommand('titleraw @p actionbar {"rawtext": [{"text": "§dNow Playing: "},{"translate": "item.spimton:ratt_boss.name"}]}')
                })
            }
            else {
                system.run(function () {
                    player.runCommand(`stopsound @a moogcity`);
                    player.runCommand(`stopsound @a music.ptn`);
                    player.runCommand(`stopsound @a music.weeper_boss`)
                    player.runCommand(`stopsound @a music.juandice_boss`)
                    player.runCommand(`stopsound @a music.ratt_boss`)
                    player.runCommand(`stopsound @a music.overgrown_boss`)
                    player.runCommand(`stopsound @a music.horseman_boss`);
                })
            }
            return;
        }
    }
    system.run(function () {
        player.runCommand(`stopsound @a moogcity`)
        player.runCommand(`stopsound @a music.game.creative`)
        player.runCommand(`stopsound @a music.weeper_boss`)
        player.runCommand(`stopsound @a music.juandice_boss`)
        player.runCommand("stopsound @a music.ptn")
        player.runCommand(`stopsound @a music.horseman_boss`)
        player.runCommand(`stopsound @a music.ratt_boss`)
        player.runCommand(`stopsound @a music.overgrown_boss`);
    })
})

world.afterEvents.playerBreakBlock.subscribe(evd => {
    const { player, brokenBlockPermutation } = evd;

    // This returns if the broken block is not a Jukebox
    if (!brokenBlockPermutation.matches('minecraft:jukebox')) return;
    player.runCommand(`stopsound @a moogcity`);
    player.runCommand(`stopsound @a music.ptn`);
    player.runCommand(`stopsound @a music.weeper_boss`)
    player.runCommand(`stopsound @a music.juandice_boss`)
    player.runCommand(`stopsound @a music.ratt_boss`)
    player.runCommand(`stopsound @a music.overgrown_boss`)
    player.runCommand(`stopsound @a music.horseman_boss`);
})