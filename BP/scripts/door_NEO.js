import { world, system, BlockPermutation } from '@minecraft/server'

system.beforeEvents.startup.subscribe(doo => {
    doo.blockComponentRegistry.registerCustomComponent("spimton:doorNeo", {
        onPlace: arg => {

            const block = arg.block
            const blockstates = block.permutation.getAllStates()
            const direction = blockstates["minecraft:cardinal_direction"]
            let hingeBit = false
            if ((direction === 'south' && block.east().hasTag("spimton:door")) || (direction === 'north' && block.west().hasTag("spimton:door")) || (direction === 'east' && block.north().hasTag("spimton:door")) || (direction === 'west' && block.south().hasTag("spimton:door"))) {
                hingeBit = true
            }
            else hingeBit = false;
            if (block.permutation.getState("spimton:upper_block_bit") != false) return;
            block.setPermutation(block.permutation.withState('spimton:upper_block_bit', false))
            block.setPermutation(block.permutation.withState('spimton:door_hinge_bit', hingeBit));

            const Permutation = BlockPermutation.resolve(block.typeId, {
                'spimton:upper_block_bit': true,
                'spimton:door_hinge_bit': hingeBit,
                'spimton:open_bit': false,
                'minecraft:cardinal_direction': direction
            })
            block.above().setPermutation(Permutation)
        },
        onPlayerInteract({ block, dimension }, { params }) {
            const toggleableState = params.block_state;

            const currentValue = block.permutation.getState(toggleableState);
            const toggledValue = !currentValue;

            block.setPermutation(block.permutation.withState(toggleableState, toggledValue));
            if (block.permutation.getState("spimton:upper_block_bit") === true) {
                block.below().setPermutation(block.below().permutation.withState(toggleableState, toggledValue))
            }
            else {
                block.above().setPermutation(block.above().permutation.withState(toggleableState, toggledValue))
            }

            const toggleSound = toggledValue ? params.enable_sound : params.disable_sound;
            dimension.playSound(toggleSound, block.center());
        },
        onRedstoneUpdate({ block, dimension, powerLevel }, { params }) {
            const toggleableState = params.block_state;
            const doorPart = params.door_part;

            const currentValue = block.permutation.getState(toggleableState);
            const doorUpper = block.permutation.getState(doorPart);
            const toggledValue = !currentValue;

            if (powerLevel > 0) {
                block.setPermutation(block.permutation.withState(toggleableState, true));
                if (doorUpper === true) {
                    block.below().setPermutation(block.below().permutation.withState(toggleableState, true))
                }
                else {
                    block.above().setPermutation(block.above().permutation.withState(toggleableState, true))
                }
            }
            else {
                block.setPermutation(block.permutation.withState(toggleableState, false));
                if (block.permutation.getState("spimton:upper_block_bit") === true) {
                    block.below().setPermutation(block.below().permutation.withState(toggleableState, false))
                }
                else {
                    block.above().setPermutation(block.above().permutation.withState(toggleableState, false))
                }
            }

            const toggleSound = toggledValue ? params.enable_sound : params.disable_sound;
            dimension.playSound(toggleSound, block.center());
        },
        beforeOnPlayerPlace: arg1 => {
            const block = arg1.block
            if (block.above().isAir) return;
            arg1.cancel = true;
        },
        onBreak: arg2 => {
            const block = arg2.block
            const prp = arg2.brokenBlockPermutation
            if (prp.getState("spimton:upper_block_bit") === true) {
                block.below().setType("air")
            }
            else {
                block.above().setType("air")
            }
        }
    })
})

