
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
import { Entity, GameMode, Player, world, system, BlockPermutation } from "@minecraft/server";

const ignoredEntities = [
    "spimton:creepie",
    "minecraft:xp_orb",
    "spimton:creeper_spore",
    "evocation_fang",
    "spimton:cspore",
    "spimton:thefatrat"
]

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockWitherTreadersComponent = {


};


function spawnFang(event, component) {
    const { block, entity } = event;
    const { entity: fang, replace_block } = component.params;

    if (!entity) return;

    if (entity.typeId === "minecraft:item") return;

    if (ignoredEntities.includes(entity.typeId)) return;

    const location = {
        x: block.location.x + 0.5,
        y: block.location.y + 1,
        z: block.location.z + 0.5
    };

    block.dimension.runCommand(
        `summon ${fang} ${location.x} ${location.y} ${location.z}`
    );

    block.setType(replace_block);
}


system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:rune",
        {
            onStepOn(event, params) {
                spawnFang(event, params);
            },

            onEntityFallOn(event, params) {
                spawnFang(event, params);
            }
        }
    );
});

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:trampoline", {
        onEntityFallOn(event) {
            const fall = event.fallDistance
            console.warn("Trampoline Ticked")
            const entity = event.entity
            console.warn("Trampoline Found STH")
            if (entity.typeId === 'spimton:thefatrat' || entity.typeId === 'minecraft:xp_orb' || entity.typeId === 'spimton:creeper_spore' || entity.typeId === 'spimton:cspore' || entity.typeId === 'spimton:pspore' || entity.typeId === 'minecraft:item' || entity.typeId === 'evocation_fang') return 0;
            else {
                console.warn("Trampoline Ready")
                event.block.setPermutation(
                    BlockPermutation.resolve(
                        event.block.typeId, {
                        "spimton:active": false
                    }
                    )
                )
                console.warn("T Fill")
                entity.applyKnockback({ x: entity.getViewDirection().x * 4, z: entity.getViewDirection().z * 4 }, fall * 0.5)
                console.warn("T KD")
                event.block.dimension.spawnParticle("minecraft:wind_explosion_emitter", event.block.center())
                console.warn("T XP lode")
            }

        }
    }

    );
});

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:turn_radio", {
        onTick: arg => {

            const block = arg.block
            block.setType("spimton:radioactive_gloom_tiles_p")
        }
    }
    );
});
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:turn_trampoline", {
        onTick: arg => {

            const block = arg.block
            block.setPermutation(
                BlockPermutation.resolve(
                    arg.block.typeId, {
                    "spimton:active": true
                }
                )
            )
        }
    }
    );
});
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:turn", {
        onTick: arg => {

            const block = arg.block
            block.setType("spimton:runed_gloom_tiles_p")
        }
    }
    );
});

// Register a custom component before the world is loaded
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:cancer_treaders", {
        onPlayerBreak({ block, dimension, player }) {



            // Spawn the XP orbs

            dimension.spawnEntity("spimton:cancer_giver", block.location)
            dimension.spawnParticle("spimton:lungcancer", block.above(2));



        },
        onRandomTick({ block, dimension }) {
            const Random = Math.random()
            if (Random > 0.9) {
                const location = block.location
                const adjcent = [
                    block.north(),
                    block.south(),
                    block.west(),
                    block.east(),
                    block.above(),
                    block.below()
                ]

                if (!adjcent.every(blockL => blockL.typeId === "air" || blockL === undefined)) {
                    dimension.spawnEntity("spimton:cancer_giver", location)
                    dimension.spawnParticle("spimton:lungcancer", block.above())
                }
            }
        }
    });
});
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:blockdamage", {
        onPlayerBreak({ block, dimension, player }) {
            const adjacentBlocks = {
                north: block.north(),
                east: block.east(),
                south: block.south(),
                west: block.west(),
                above: block.above(),
                below: block.below()
            }

            if (Object.values(adjacentBlocks).some(adjacentBlock => adjacentBlock?.permutation.matches('minecraft:water'))) return;

            // Spawn the XP orbs
            // Number of XP orbs to spawn


            dimension.spawnEntity("spimton:pbd", block.location)
            dimension.spawnParticle("spimton:cloud", block.above(2));


        },
    });
});
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:insula", {
        onTick({ block }) {
            const adjacentBlocks = {
                north: block.north(),
                east: block.east(),
                south: block.south(),
                west: block.west(),
                above: block.above(),
                below: block.below()
            }
            const loc = block.center()
            if (Object.values(adjacentBlocks).some(adjacentBlock => adjacentBlock?.permutation.matches('minecraft:fire'))) {
                block.dimension.spawnEntity("spimton:insulater", loc);
            }
        },
    });
});
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:decay", {
        onTick({ block }) {

            block.setType("minecraft:air")

        }
    })
})
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:archaeology", {
        onTick({ block }) {

            const rc = Math.random()
            if (rc < 0.1) world.structureManager.place("mystructure:sus_gravel_spimton", block.dimension, block.center())
            else if (rc < 0.55) block.setType("gravel")
            else if (rc < 0.8) block.setType("dirt")
            else block.setType("coarse_dirt")

        }
    })
})

