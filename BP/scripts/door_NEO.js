import { world, system, BlockPermutation } from '@minecraft/server'

system.beforeEvents.startup.subscribe(doo => {
    doo.blockComponentRegistry.registerCustomComponent("spimton:doorOld", {
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
    });
    doo.blockComponentRegistry.registerCustomComponent("spimton:doorNeo", {
        // Find the other half of the multiblock door.
        /* getOtherPart(block) {
             const part = block.permutation.getState("minecraft:multi_block_part");
 
             if (part === 0) {
                 const other = block.above();
                 return other.typeId === block.typeId ? other : undefined;
             }
 
             if (part === 1) {
                 const other = block.below();
                 return other.typeId === block.typeId ? other : undefined;
             }
 
             return undefined;
         },
 
         // Synchronize a state across both door halves.
         setDoorState(block, state, value) {
             const other = getOtherPart(block);
 
             block.setPermutation(
                 block.permutation.withState(state, value)
             );
 
             if (other) {
                 other.setPermutation(
                     other.permutation.withState(state, value)
                 );
             }
         },*/

        onPlace({ block }) {
            const part = block.permutation.getState("minecraft:multi_block_part");

            // Only calculate the hinge on the lower part.
            if (part !== 0) return;

            const direction = block.permutation.getState("minecraft:cardinal_direction");

            let hingeBit = false;
            console.warn(block.south().permutation.getState("spimton:door_hinge_bit"))
            if (
                (direction === "south" && block.east().hasTag("spimton:door") && block.east().permutation.getState("spimton:door_hinge_bit") === false) ||
                (direction === "north" && block.west().hasTag("spimton:door") && block.west().permutation.getState("spimton:door_hinge_bit") === false) ||
                (direction === "east" && block.north().hasTag("spimton:door") && block.north().permutation.getState("spimton:door_hinge_bit") === false) ||
                (direction === "west" && block.south().hasTag("spimton:door") && block.south().permutation.getState("spimton:door_hinge_bit") === false)
            ) {

                hingeBit = true;
            }

            block.setPermutation(
                block.permutation.withState("spimton:door_hinge_bit", hingeBit)
            );

            const upper = getOtherPart(block);

            if (upper) {
                upper.setPermutation(
                    upper.permutation.withState("spimton:door_hinge_bit", hingeBit)
                );
            }
        },

        onPlayerInteract({ block, dimension }, { params }) {
            // Manual interaction is enabled by default.
            if (params.can_interact === false) return;

            const state = params.block_state;
            const current = block.permutation.getState(state);
            const next = !current;

            setDoorState(block, state, next);

            const sound = next ? params.enable_sound : params.disable_sound;
            dimension.playSound(sound, block.center());
        },

        onRedstoneUpdate(
            { block, dimension, powerLevel, previousPowerLevel },
            { params }
        ) {
            // Ignore placement, chunk-load, and other updates
            // that don't represent a change in redstone power.
            if (powerLevel === previousPowerLevel) return;

            const state = params.block_state;
            const next = powerLevel > 0;
            const current = block.permutation.getState(state);

            // Only update if this half needs to change.
            if (current === next) return;

            setDoorState(block, state, next);

            // Play the sound once, from the lower half.
            const part = block.permutation.getState(
                "minecraft:multi_block_part"
            );

            if (part === 0) {
                dimension.playSound(
                    next ? params.enable_sound : params.disable_sound,
                    block.center()
                );
            }
        },

        beforeOnPlayerPlace(arg) {
            // Preserve the original placement restriction.
            if (!arg.block.above().isAir) {
                arg.cancel = true;
            }
        }
    });
})

function getOtherPart(block) {
    const part = block.permutation.getState("minecraft:multi_block_part");

    if (part === 0) {
        const other = block.above();
        return other.typeId === block.typeId ? other : undefined;
    }

    if (part === 1) {
        const other = block.below();
        return other.typeId === block.typeId ? other : undefined;
    }

    return undefined;
}

function setDoorState(block, state, value) {
    const other = getOtherPart(block);

    block.setPermutation(block.permutation.withState(state, value));

    if (other) {
        other.setPermutation(other.permutation.withState(state, value));
    }
}