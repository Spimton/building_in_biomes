import { world, system } from '@minecraft/server'
import 'loreMisc'
import "./folder2/durability.js"
import 'food_effects'
import 'loreBeverage'
import 'loreTotem'
import 'grapegrowth'
import 'music_disc'
import 'leadbulb'
import 'hamer'
import 'b_hamer'
import 'treader_detection'
import 'cancer_treaders'
import 'necklace'
import 'tiara'
import "./folder/chronos_staff.js"
import 'boss'
import 'loreApplen'
import 'applen_eq'
import 'overgrown_power'
import 'book'
import "./folder/ability_other.js"
import 'weeper_power'
import "./folder/beaconw.js"
import 'juandice'
import 'coaster'
import 'door_NEO'


import { wall_Manager } from 'wall_Manager'

world.afterEvents.playerBreakBlock.subscribe(
    (data) => wall_Manager.updateWallsAround(data.block)
);

world.afterEvents.playerPlaceBlock.subscribe(
    (data) => wall_Manager.updateWallsAround(data.block)
);



import { bars } from 'barsr'
world.afterEvents.playerBreakBlock.subscribe((data) => {
    bars.updateBarsAround(data.block)
})
world.afterEvents.playerPlaceBlock.subscribe((data) => {
    bars.updateBarsAround(data.block)
})


system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('spimton:multi_destroy_lantern', {
        beforeOnPlayerPlace: (event) => {
            const { player, block, face, permutationToPlace, dimension } =
                event
            const offset = faceOffset.get(face)
            const newLocation = { x: block.location.x - offset.x, y: block.location.y - offset.y, z: block.location.z - offset.z }
            const newBlock = dimension.getBlock(newLocation)
            if (newBlock.hasTag('plant') || newBlock.typeId === 'minecraft:ladder' || newBlock.typeId === 'minecraft:cobweb' || newBlock.typeId === 'minecraft:tripwire_hook' || newBlock.typeId === 'minecraft:sea_pickle' || newBlock.typeId === 'minecraft:dead_bush' || newBlock.typeId === 'minecraft:yellow_flower' || newBlock.typeId === 'minecraft:poppy' || newBlock.typeId === 'minecraft:blue_orchid' || newBlock.typeId === 'minecraft:allium' || newBlock.typeId === 'minecraft:azure_bluet' || newBlock.typeId === 'minecraft:oxeye_daisy' || newBlock.typeId === 'minecraft:sunflower' || newBlock.typeId === 'minecraft:lilac' || newBlock.typeId === 'minecraft:rose_bush' || newBlock.typeId === 'minecraft:peony' || newBlock.typeId === 'minecraft:brown_mushroom' || newBlock.typeId === 'minecraft:red_mushroom' || newBlock.typeId === 'minecraft:hanging_roots' || newBlock.typeId === 'minecraft:glow_lichen' || newBlock.typeId === 'minecraft:azalia' || newBlock.typeId === 'minecraft:flowering_azalea' || newBlock.typeId === 'minecraft:big_dripleaf' || newBlock.typeId === 'minecraft:small_dripleaf_block' || newBlock.typeId === 'minecraft:pointed_dripstone' || newBlock.typeId === 'minecraft:reeds' || newBlock.typeId === 'minecraft:coral' || newBlock.typeId === 'minecraft:coral_fan' || newBlock.typeId === 'minecraft:spore_blossom' || newBlock.typeId === 'minecraft:vines' || newBlock.typeId === 'minecraft:weeping_vines' || newBlock.typeId === 'minecraft:twisting_vines' || newBlock.typeId === 'minecraft:sweet_berry_bush' || newBlock.typeId === 'minecraft:carrots' || newBlock.typeId === 'minecraft:potatoes' || newBlock.typeId === 'minecraft:beetroot' || newBlock.typeId === 'minecraft:wheat' || newBlock.typeId === 'minecraft:pumpkin_stem' || newBlock.typeId === 'minecraft:melon_stem' || newBlock.typeId === 'minecraft:bamboo' || newBlock.typeId === 'minecraft:bamboo_sapling' || newBlock.typeId === 'minecraft:moss_carpet' || newBlock.typeId === 'v360:infected_moss_carpet' || newBlock.typeId === 'minecraft:nether_wart' || newBlock.typeId === 'minecraft:waterlily' || newBlock.typeId === 'minecraft:cocoa' || newBlock.typeId === 'minecraft:redstone_wire' || newBlock.typeId === 'minecraft:frog_spawn' || newBlock.typeId === 'minecraft:chorus_flower' || newBlock.typeId === 'minecraft:chorus_plant' || newBlock.typeId === 'minecraft:scaffolding' || newBlock.typeId === 'minecraft:torchflower' || newBlock.typeId === 'minecraft:torflower_crop' || newBlock.typeId === 'minecraft:unlit_redstone_torch' || newBlock.typeId === 'minecraft:pitcher_plant' || newBlock.typeId === 'minecraft:pitcher_crop' || newBlock.typeId === 'minecraft:farmland' || newBlock.typeId === 'minecraft:grass_path' || newBlock.typeId === 'minecraft:nether_sprouts' || newBlock.typeId === 'minecraft:crimson_roots' || newBlock.typeId.includes('leaves') || newBlock.typeId.includes('carpet') || newBlock.typeId.includes('bud') || newBlock.typeId.includes('cluster') || newBlock.typeId.includes('fence_gate') || newBlock.typeId.includes('door') || newBlock.typeId.includes('torch') || newBlock.typeId.includes('lantern') || newBlock.typeId.includes('sign') || newBlock.typeId.includes('pane') || newBlock.typeId.includes('bar') || newBlock.typeId.includes('bars') || newBlock.typeId.includes('chest') || newBlock.typeId.includes('egg') || newBlock.typeId.includes('banner') || newBlock.typeId.includes('trapdoor') || newBlock.typeId.includes('bed') || newBlock.typeId.includes('candle') || newBlock.typeId.includes('campfire') || newBlock.typeId.includes('anvil') || newBlock.typeId.includes('coral_fan') || newBlock.typeId.includes('sapling') || newBlock.typeId.includes('rod') || newBlock.typeId.includes('tulip') || (newBlock.typeId.includes('slab') && !newBlock.typeId.includes('double')) || newBlock.typeId.includes('pot') || newBlock.typeId.includes('frame') || newBlock.typeId.includes('button') || newBlock.typeId.includes('pressure_plate') || newBlock.typeId.includes('rail')
            ) {
                event.cancel = true
            }
        }
    })
})

world.beforeEvents.playerBreakBlock.subscribe(data => {
    const block = data.block
    const { x, y, z } = block.location
    if (block.above().permutation.matches('spimton:bronze_lantern', { 'minecraft:block_face': 'up' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y + 1} ${z} air [] destroy`)
        })
    }
    if (block.below().permutation.matches('spimton:bronze_lantern', { 'minecraft:block_face': 'down' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y - 1} ${z} air [] destroy`)
        })
    }
})

world.beforeEvents.playerBreakBlock.subscribe(data => {
    const block = data.block
    const { x, y, z } = block.location
    if (block.below().permutation.matches('spimton:overgrown_dungeon_torch', { 'minecraft:block_face': 'down' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y - 1} ${z} air [] destroy`)
        })
    }
    if (block.west().permutation.matches('spimton:overgrown_dungeon_torch', { 'minecraft:block_face': 'west' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x - 1} ${y} ${z} air [] destroy`)
        })
    }
    if (block.east().permutation.matches('spimton:overgrown_dungeon_torch', { 'minecraft:block_face': 'east' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x + 1} ${y} ${z} air [] destroy`)
        })
    }
    if (block.north().permutation.matches('spimton:overgrown_dungeon_torch', { 'minecraft:block_face': 'north' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y} ${z - 1} air [] destroy`)
        })
    }
    if (block.south().permutation.matches('spimton:overgrown_dungeon_torch', { 'minecraft:block_face': 'south' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y} ${z + 1} air [] destroy`)
        })
    }
    if (block.below().permutation.matches('spimton:ominous_dungeon_torch', { 'minecraft:block_face': 'down' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y - 1} ${z} air [] destroy`)
        })
    }
    if (block.west().permutation.matches('spimton:ominous_dungeon_torch', { 'minecraft:block_face': 'west' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x - 1} ${y} ${z} air [] destroy`)
        })
    }
    if (block.east().permutation.matches('spimton:ominous_dungeon_torch', { 'minecraft:block_face': 'east' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x + 1} ${y} ${z} air [] destroy`)
        })
    }
    if (block.north().permutation.matches('spimton:ominous_dungeon_torch', { 'minecraft:block_face': 'north' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y} ${z - 1} air [] destroy`)
        })
    }
    if (block.south().permutation.matches('spimton:ominous_dungeon_torch', { 'minecraft:block_face': 'south' })) {
        system.run(() => {
            block.dimension.runCommand(`setblock ${x} ${y} ${z + 1} air [] destroy`)
        })
    }
})

world.afterEvents.playerPlaceBlock.subscribe((data) => {
    if ((data.block.typeId == "minecraft:carved_pumpkin") || (data.block.typeId == "minecraft:lit_pumpkin")) {
        if (data.block.below(1).typeId == "spimton:bronze_block") {
            const block = data.block
            if (!world.gameRules.doTileDrops) {
                block.dimension.runCommand(`fill ${block.x} ${block.y} ${block.z} ${block.x} ${block.y - 1} ${block.z} air destroy`);
            }
            else {
                world.gameRules.doTileDrops = false;
                block.dimension.runCommand(`fill ${block.x} ${block.y} ${block.z} ${block.x} ${block.y - 1} ${block.z} air destroy`);
                world.gameRules.doTileDrops = true;
            }
            const golem = block.dimension.spawnEntity("spimton:bronze_golem", block.below().bottomCenter())
            golem.getComponent("tameable").tame(data.player)
        }
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
    const { block, itemStack, player } = data;
    if (itemStack != undefined && itemStack.typeId == "minecraft:shears" && block.typeId == "minecraft:pumpkin") {
        if (data.block.below(1).typeId == "spimton:bronze_block") {
            const block = data.block
            if (!world.gameRules.doTileDrops) {
                block.dimension.runCommand(`fill ${block.x} ${block.y} ${block.z} ${block.x} ${block.y - 1} ${block.z} air destroy`);
            }
            else {
                world.gameRules.doTileDrops = false;
                block.dimension.runCommand(`fill ${block.x} ${block.y} ${block.z} ${block.x} ${block.y - 1} ${block.z} air destroy`);
                world.gameRules.doTileDrops = true;
            }
            const golem = block.dimension.spawnEntity("spimton:bronze_golem", block.below().bottomCenter())
            golem.getComponent("tameable").tame(data.player)
        }
    }
});