import { EquipmentSlot, GameMode, BlockPermutation, MolangVariableMap, world, ItemStack, system, CustomComponentParameters } from "@minecraft/server";

/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const blockStates = new Map()

const maxPower = 15;

/** @type {import("@minecraft/server").BlockCustomComponent} */
const Leadbulbpower = {
    onRandomTick({ block }) {
        const powerChance = 1 / 100;
        if (Math.random() > powerChance) return;

        const power = block.permutation.getState("spimton:power");
        if (power == 15) return;
        block.setPermutation(block.permutation.withState("spimton:power", power + 1));
    }
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:leadbulb",
        Leadbulbpower
    );
});
world.afterEvents.itemStartUseOn.subscribe(data => {
    const player = data.source
    const block = data.block
    if (block.typeId == "spimton:alloy_forge") {
        if (!player) return;

        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (mainhand.typeId === "minecraft:coal_block") {
            block.setPermutation(block.permutation.withState("spimton:temp", 1));
            if (player.getGameMode() != GameMode.Creative) {
                // Decrement stack
                if (mainhand.amount > 1) {
                    mainhand.amount--;
                }
                else mainhand.setItem(undefined);
            }
            player.runCommand("title @s actionbar The Forge has reached the temperature of 750 degrees")


        }
        else if (mainhand.typeId === "minecraft:lava_bucket") {
            block.setPermutation(block.permutation.withState("spimton:temp", 2));
            if (player.getGameMode() != GameMode.Creative) {
                // Decrement stack
                mainhand.setItem(undefined);
                player.runCommand("give @s bucket")
            }
            player.runCommand("title @s actionbar The Forge has reached the temperature of 1500 degrees")


        }
        else if (mainhand.typeId === "minecraft:blaze_rod") {
            block.setPermutation(block.permutation.withState("spimton:temp", 3));
            if (player.getGameMode() != GameMode.Creative) {
                // Decrement stack
                if (mainhand.amount > 1) {
                    mainhand.amount--;
                }
                else mainhand.setItem(undefined);
            }
            player.runCommand("title @s actionbar The Forge has reached the temperature of 2250 degrees")


        }
        else if (mainhand.typeId === "minecraft:breeze_rod") {
            block.setPermutation(block.permutation.withState("spimton:temp", 0));
            if (player.getGameMode() != GameMode.Creative) {
                // Decrement stack
                if (mainhand.amount > 1) {
                    mainhand.amount--;
                }
                else mainhand.setItem(undefined);
            }
            player.runCommand("title @s actionbar The Forge has cooled down")


        }
        else if (mainhand.typeId === "hf_mzs:bluff_rod") {
            const tempr = randomInt(0, 3)
            block.setPermutation(block.permutation.withState("spimton:temp", tempr));
            if (player.getGameMode() != GameMode.Creative) {
                // Decrement stack
                if (mainhand.amount > 1) {
                    mainhand.amount--;
                }
                else mainhand.setItem(undefined);
            }
            player.runCommand(`title @s actionbar The Forge has reached the temperature of ${750 * tempr} degrees`)


        }
    } else console.warn("not alloy forge")
})
system.beforeEvents.startup.subscribe(initEv => {
    initEv.blockComponentRegistry.registerCustomComponent('spimton:forge_expire', {
        onTick(Eve) {
            const block = Eve.block
            block.setType("spimton:alloy_forge")
        },
        onPlayerBreak(ev) {
            const player = ev.player
            const block = ev.block
            const state = block.permutation.getState("spimton:temp")
            if (state != 0) {
                player.setOnFire(5, true)
                block.dimension.createExplosion(block.center(), 3, { breaksBlocks: false, causesFire: true })
            }
        }
    })
})





system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('spimton:bronze_lamp', {
        onRedstoneUpdate: arg => {
            const block = arg.block
            const power = arg.powerLevel
            const shouldOpen = power > 0
            const shouldClose = power === 0;
            if (shouldOpen || shouldClose) {
                const newState = shouldOpen;
                block.setPermutation(block.permutation.withState('spimton:lit', newState))
            }

        }
    })
})

system.beforeEvents.startup.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('spimton:bronze_trapdoor', {
        onPlayerInteract(e) {
            const { block, player } = e;
            const equipment = player.getComponent('equippable')
            const selectedItem = equipment.getEquipment('Mainhand')
            const currentState = block.permutation.getState('spimton:open')
            const newOpenState = !currentState
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'spimton:open': newOpenState
            })
            block.setPermutation(newPermutation)
            const sound = currentState ? 'open_trapdoor.copper' : 'open_trapdoor.copper'
            player.playSound(sound)
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                player.playSound('bucket.empty_water')
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }
        },
        onTick(e) {
            const { block } = e
            const { x, y, z } = block.location
            const blockKey = `${x},${y},${z}`
            const currentState = block.permutation.getState('spimton:open')
            const sound = currentState ? 'open_trapdoor.copper' : 'open_trapdoor.copper'
            const adjacentBlocks = {
                north: block.north(),
                east: block.east(),
                south: block.south(),
                west: block.west(),
                above: block.above(),
                below: block.below()
            }
            const excludedBlocks = [
                block.typeId.includes('door'), block.typeId.includes('trapdoor'), 'minecraft:observer', 'minecraft:unpowered_repeater',
                'minecraft:powered_repeater', 'minecraft:unpowered_comparator', 'minecraft:powered_comparator'
            ]

            // Check if any adjacent blocks have redstone power, excluding certain block types
            const hasRedstonePower = Object.values(adjacentBlocks).some(adjacentBlock =>
                !excludedBlocks.includes(adjacentBlock?.typeId) && (adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 1 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 2 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 3 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 4 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 5 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 6 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 7 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 8 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 9 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 10 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 11 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 12 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 13 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 14 }) || adjacentBlock?.permutation.matches('minecraft:redstone_wire', { 'redstone_signal': 15 }) || adjacentBlock?.typeId === 'minecraft:redstone_block' || adjacentBlock?.typeId === 'minecraft:redstone_torch') || adjacentBlock?.permutation.matches('lever', { 'open_bit': true }) || adjacentBlock?.permutation.matches('tripwire_hook', { 'powered_bit': true }) || adjacentBlock?.permutation.matches('detector_rail', { 'rail_data_bit': true })
            )

            // Check if there's a redstone torch directly above the block
            const isRedstoneTorchTop = adjacentBlocks.above?.typeId === 'minecraft:redstone_torch' &&
                adjacentBlocks.above.permutation.getState('torch_facing_direction') === 'top';

            // Define blocks that should be destroyed when receiving redstone power and in a specific position
            const destroyableBlocksArray = [
                block.typeId.includes('button'), block.typeId.includes('pressure_plate')
            ];

            // Check if the block above is a destroyable block and is powered
            const destroyableBlocks = destroyableBlocksArray.includes(adjacentBlocks.above?.typeId)

            // Check if an adjacent observer is facing the block and is powered
            const observerFacingBlock = [
                { block: adjacentBlocks.north, direction: 'north' },
                { block: adjacentBlocks.east, direction: 'east' },
                { block: adjacentBlocks.south, direction: 'south' },
                { block: adjacentBlocks.west, direction: 'west' },
                { block: adjacentBlocks.above, direction: 'up' },
                { block: adjacentBlocks.below, direction: 'down' }
            ].some(({ block, direction }) => block?.typeId === 'minecraft:observer' &&
                block?.permutation.getState('minecraft:facing_direction') === direction && block?.permutation.matches('observer', { 'powered_bit': true }));

            // Check if an adjacent powered repeater is facing the block
            const poweredRepeater = [
                { block: adjacentBlocks.north, direction: 'north' },
                { block: adjacentBlocks.east, direction: 'east' },
                { block: adjacentBlocks.south, direction: 'south' },
                { block: adjacentBlocks.west, direction: 'west' }
            ].some(({ block, direction }) => block?.typeId === 'minecraft:powered_repeater' &&
                block?.permutation.getState('minecraft:cardinal_direction') === direction);

            // Check if an adjacent powered comparator is facing the block
            const poweredComparator = [
                { block: adjacentBlocks.north, direction: 'north' },
                { block: adjacentBlocks.east, direction: 'east' },
                { block: adjacentBlocks.south, direction: 'south' },
                { block: adjacentBlocks.west, direction: 'west' }
            ].some(({ block, direction }) => block?.typeId === 'minecraft:powered_comparator' &&
                block?.permutation.getState('minecraft:cardinal_direction') === direction);

            // Retrieve the previous state of the block from the Map
            const previousState = blockStates.get(blockKey) || false;

            const shouldOpen = (hasRedstonePower || observerFacingBlock || poweredRepeater || poweredComparator) && !previousState && !isRedstoneTorchTop;
            const shouldClose = (!hasRedstonePower && !observerFacingBlock && !poweredRepeater && !poweredComparator) && previousState && !isRedstoneTorchTop
            if (shouldOpen || shouldClose) {
                const newState = shouldOpen;
                block.setPermutation(block.permutation.withState('spimton:open', newState))
                block.dimension.playSound(sound, block.location)
                blockStates.set(blockKey, newState)
                if (destroyableBlocks) {
                    block.dimension.runCommand(`setblock ${x} ${y + 1} ${z} air destroy`)
                }
            }
        }
    })
})

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:temple_altar", {
        onPlayerInteract: data => {
            const player = data.player
            const block = data.block
            if (block.typeId == "spimton:temple_altar") {
                if (!player) return;

                const equippable = player.getComponent("minecraft:equippable");
                if (!equippable) return;

                const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
                if (mainhand.typeId === "spimton:transmutation_amulet") {
                    if (block.above(1).typeId != "minecraft:gold_block") return;
                    block.above().setType("spimton:silver_block")
                    block.dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", block.above())
                    if (player.getGameMode() != GameMode.Creative) {
                        // Decrement stack
                        if (mainhand.amount > 1) {
                            mainhand.amount--;
                        }
                        else mainhand.setItem(undefined);
                    }


                }
                else if (mainhand.typeId === "spimton:overgrown_amulet") {
                    if (block.above(1).typeId != "minecraft:gold_block") return;
                    block.above().setType("spimton:ancient_gold_block")
                    block.dimension.spawnParticle("minecraft:trial_spawner_detection", block.above())
                    if (player.getGameMode() != GameMode.Creative) {
                        // Decrement stack
                        if (mainhand.amount > 1) {
                            mainhand.amount--;
                        }
                        else mainhand.setItem(undefined);
                    }


                }
            }
        }
    }
    );
});

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:rodent_spawner", {
        onPlayerInteract: data => {
            const player = data.player
            const block = data.block
            const aa = player.getViewDirection()
            if (block.typeId == "spimton:cancerous_hole") {
                if (!player) return;

                const equippable = player.getComponent("minecraft:equippable");
                if (!equippable) return;

                const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
                if (mainhand.typeId === "spimton:radioactive_embers") {
                    if (mainhand.amount > 1) mainhand.amount--;
                    else mainhand.setItem(undefined);
                    player.applyKnockback({ x: aa.x * 2, z: aa.z * 2 }, 2)
                    block.setType("air")
                    world.structureManager.place("rodent_spawner", block.dimension, block.location)


                }
            }
        }
    }
    );
});

/*system.beforeEvents.startup.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('v360:unlit_lantern', {
        onPlayerInteract(e) {
            const { block, player } = e
            const equipment = player.getComponent('equippable')
            const selectedItem = equipment.getEquipment('Mainhand')
            const lanternUp = BlockPermutation.resolve('minecraft:lantern', { 'hanging': true })
            const lanternDown = BlockPermutation.resolve('minecraft:lantern', { 'hanging': false })
            const soulLanternUp = BlockPermutation.resolve('minecraft:soul_lantern', { 'hanging': true })
            const soulLanternDown = BlockPermutation.resolve('minecraft:soul_lantern', { 'hanging': false })
            const copperLanternUp = BlockPermutation.resolve('v360:copper_lantern', { 'minecraft:block_face': 'down' })
            const copperLanternDown = BlockPermutation.resolve('v360:copper_lantern', { 'minecraft:block_face': 'up' })
            const lushLanternUp = BlockPermutation.resolve('v360:lush_lantern', { 'minecraft:block_face': 'down' })
            const lushLanternDown = BlockPermutation.resolve('v360:lush_lantern', { 'minecraft:block_face': 'up' })
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                player.playSound('bucket.empty_water')
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }
            if (block.typeId === 'v360:unlit_lantern' && selectedItem?.typeId === 'minecraft:water_bucket') {
                const blockFace = block.permutation.getState('minecraft:block_face')
                let structureName = '';
                if (blockFace === 'down') {
                    structureName = 'mystructure:hanging_unlit_lantern'
                } else if (blockFace === 'up') {
                    structureName = 'mystructure:floor_unlit_lantern'
                }
                if (structureName) {
                    const { x, y, z } = block
                    world.structureManager.place(structureName, e.dimension, { x, y, z })
                }
            }
            else if (selectedItem?.typeId === 'minecraft:torch') {
                if (player.getGameMode() !== 'creative') {
                    player.runCommand(`clear @s torch 0 1`)
                }
                if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'down' })) {
                    block.setPermutation(lanternUp)
                    block.dimension.playSound('dig.candle', block.location)
                }
                else if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'up' })) {
                    block.setPermutation(lanternDown)
                    block.dimension.playSound('dig.candle', block.location)
                }
            }
            else if (selectedItem?.typeId === 'minecraft:soul_torch') {
                if (player.getGameMode() !== 'creative') {
                    player.runCommand(`clear @s soul_torch 0 1`)
                }
                if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'down' })) {
                    block.setPermutation(soulLanternUp)
                    block.dimension.playSound('dig.candle', block.location)
                }
                else if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'up' })) {
                    block.setPermutation(soulLanternDown)
                    block.dimension.playSound('dig.candle', block.location)
                }
            }
            else if (selectedItem?.typeId === 'v360:copper_torch') {
                if (player.getGameMode() !== 'creative') {
                    player.runCommand(`clear @s v360:copper_torch 0 1`)
                }
                if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'down' })) {
                    block.setPermutation(copperLanternUp)
                    block.dimension.playSound('dig.candle', block.location)
                }
                else if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'up' })) {
                    block.setPermutation(copperLanternDown)
                    block.dimension.playSound('dig.candle', block.location)
                }
            }
            else if (selectedItem?.typeId === 'minecraft:glow_berries') {
                if (player.getGameMode() !== 'creative') {
                    player.runCommand(`clear @s glow_berries 0 1`)
                }
                if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'down' })) {
                    block.setPermutation(lushLanternUp)
                    block.dimension.playSound('dig.cave_vines', block.location)
                }
                else if (block.permutation.matches('v360:unlit_lantern', { 'minecraft:block_face': 'up' })) {
                    block.setPermutation(lushLanternDown)
                    block.dimension.playSound('dig.cave_vines', block.location)
                }
            }
        }
    })
})*/




system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent("spimton:void_liquid", {

        onPlayerInteract: arg => {
            const dimension = arg.dimension
            const block = arg.block
            const player = arg.player
            if (!player) return;
            const equippable = player.getComponent("minecraft:equippable");
            if (!equippable) return;

            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
            if (!mainhand.hasItem()) return;
            if (mainhand.typeId === "minecraft:water_bucket") {

                if (player.getGameMode() === GameMode.Creative) {

                    player.runCommand("give @s spimton:void_bucket")
                    block.setType("air")
                } else {

                    if (mainhand.amount > 1) mainhand.amount--;
                    else mainhand.setItem(undefined);
                    player.runCommand("give @s spimton:void_bucket")
                    block.setType("air")
                }
            }
            if (mainhand.typeId === "minecraft:glass_bottle") {
                if (player.getGameMode() === GameMode.Creative) {

                    player.runCommand("give @s spimton:void_bottle")
                } else {

                    if (mainhand.amount > 1) mainhand.amount--;
                    else mainhand.setItem(undefined);
                    player.runCommand("give @s spimton:void_bottle")
                }
            }

        }
    })
})


system.beforeEvents.startup.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent("spimton:void_barrel", {

        onPlayerInteract: arg => {
            const block = arg.block
            const player = arg.player
            if (!player) return;
            const equippable = player.getComponent("minecraft:equippable");
            if (!equippable) return;
            function xplode(block, player) {
                block.setPermutation(block.permutation.withState("spimton:prime", false));
                block.dimension.spawnParticle("spimton:void_barrel", block.center())

            }
            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
            if (!mainhand.hasItem()) return;
            if (mainhand.typeId === "spimton:void_block") {

                const primed = block.permutation.getState("spimton:prime");
                if (primed == true) {
                    if (player.getGameMode() === GameMode.Creative) {
                        xplode(block, player)
                    } else {
                        if (mainhand.amount > 1) mainhand.amount--;
                        else mainhand.setItem(undefined);
                        xplode(block, player)
                        // Decrement sta
                    }
                }
            }

        },
        onPlace: arg3 => {
            const block = arg3.block
            block.setPermutation(block.permutation.withState("spimton:prime", true));
        },
        onTick: arg2 => {
            const block = arg2.block
            block.setPermutation(block.permutation.withState("spimton:prime", true));
            block.dimension.createExplosion(block.below(), 6, { causesFire: false })
            block.dimension.createExplosion(block.above(2), 6, { causesFire: false })

        }
    })
})


system.beforeEvents.startup.subscribe(data => {
    data.itemComponentRegistry.registerCustomComponent("spimton:void_bucket", {
        onUseOn: arg => {

            const item = arg.itemStack
            const player = arg.source
            const block = arg.block
            const equippable = player.getComponent("minecraft:equippable");
            if (!equippable) return;
            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
            if (player.getGameMode() != GameMode.Creative) {
                player.runCommand("give @s bucket")
            }


        }
    })
})


system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:trapdoor_NEO", {
        onPlayerInteract({ block, dimension }, { params }) {
            const toggleableState = params.block_state;

            const currentValue = block.permutation.getState(toggleableState);
            const toggledValue = !currentValue;

            block.setPermutation(block.permutation.withState(toggleableState, toggledValue));

            const toggleSound = toggledValue ? params.enable_sound : params.disable_sound;
            dimension.playSound(toggleSound, block.center());
        },
        onRedstoneUpdate({ block, dimension, powerLevel }, { params }) {
            const toggleableState = params.block_state;
            const currentValue = block.permutation.getState(toggleableState);
            const toggledValue = !currentValue;
            if (powerLevel > 0) {
                block.setPermutation(block.permutation.withState(toggleableState, true));
            }
            else {
                block.setPermutation(block.permutation.withState(toggleableState, false));
            }

            const toggleSound = toggledValue ? params.enable_sound : params.disable_sound;
            dimension.playSound(toggleSound, block.center());
        }
    });
});

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:toggle", {
        onPlayerInteract({ block, dimension }, { params }) {
            const toggleableState = params.block_state;

            const currentValue = block.permutation.getState(toggleableState);
            const toggledValue = !currentValue;

            block.setPermutation(block.permutation.withState(toggleableState, toggledValue));

            const toggleSound = toggledValue ? params.enable_sound : params.disable_sound;
            dimension.playSound(toggleSound, block.center());
        }
    });
});

system.beforeEvents.startup.subscribe(eventData => {

    eventData.blockComponentRegistry.registerCustomComponent('spimton:dungeon_torch', {
        onTick(e, { params }) {

            const { block } = e;
            const toggle = params.toggle_state
            let istoggled = block.permutation.getState(toggle);

            const blockFace = block.permutation.getState('minecraft:block_face');
            if (istoggled === undefined) istoggled = true;
            // Define positions for the particles based on the block face state
            const particlePositions = {
                north: [0.5, 1.225, 0.4],
                south: [0.5, 1.225, 0.6],
                east: [0.6, 1.225, 0.5],
                west: [0.4, 1.225, 0.5],
                up: [0.5, 1.225, 0.5]
            };

            // Get the particle position based on the block face
            const position = particlePositions[blockFace];

            // Check if the position is defined
            if (position && istoggled) {

                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = position;

                // Get the block's current location
                const { x, y, z } = block.location;

                // Calculate the particle spawn position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;

                // Create an empty MolangVariableMap
                const molangVariables = new MolangVariableMap();

                const particles = params.particles

                particles.forEach((particle, index) => {
                    console.warn(particle);
                    block.dimension.spawnParticle(particle, { x: particleX, y: particleY, z: particleZ }, molangVariables);
                });
            }

        }
    });
});