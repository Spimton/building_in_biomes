
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
import { Entity, GameMode, Player, world, system, BlockPermutation } from "@minecraft/server";

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockWitherTreadersComponent = {
    onTick(event) {
        const entities = event.dimension.getEntitiesAtBlockLocation(event.block.above().location);
        entities.forEach((entity) => {
            if (entity.typeId === 'spimton:creepie' || entity.typeId === 'minecraft:xp_orb' || entity.typeId === 'spimton:creeper_spore' || entity.typeId === 'spimton:cspore' || entity.typeId === 'spimton:pspore' || entity.typeId === 'minecraft:item' || entity.typeId === 'evocation_fang') return 0;
            else {

                entity.runCommand('fill ~ ~ ~ ~ ~-2 ~ spimton:gloom_tiles replace spimton:runed_gloom_tiles')
                entity.runCommand('fill ~ ~ ~ ~ ~-2 ~ spimton:runed_gloom_tiles_cooldown replace spimton:runed_gloom_tiles_p')
                entity.runCommand('execute if block ~ ~-1 ~ air run fill ~1 ~ ~1 ~-1 ~-2 ~-1 spimton:runed_gloom_tiles_cooldown replace spimton:runed_gloom_tiles_p')
                entity.addEffect('slowness', 20, { amplifier: 4, showParticles: false })
                entity.runCommand('execute unless entity @e[type=evocation_fang,r=1] run summon evocation_fang')
            }
        });
    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:rune",
        BlockWitherTreadersComponent
    );
});

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("spimton:rune_radio", {
        onTick(event) {
            const entities = event.dimension.getEntitiesAtBlockLocation(event.block.above().location);
            entities.forEach((entity) => {
                if (entity.typeId === 'spimton:thefatrat' || entity.typeId === 'minecraft:xp_orb' || entity.typeId === 'spimton:creeper_spore' || entity.typeId === 'spimton:cspore' || entity.typeId === 'spimton:pspore' || entity.typeId === 'minecraft:item' || entity.typeId === 'evocation_fang') return 0;
                else {

                    entity.runCommand('fill ~ ~ ~ ~ ~-2 ~ spimton:gloom_tiles replace spimton:radioactive_gloom_tiles')
                    entity.runCommand('fill ~ ~ ~ ~ ~-2 ~ spimton:radioactive_gloom_tiles_cooldown replace spimton:radioactive_gloom_tiles_p')
                    entity.runCommand('execute if block ~ ~-1 ~ air run fill ~1 ~ ~1 ~-1 ~-2 ~-1 spimton:radioactive_gloom_tiles_cooldown replace spimton:radioactive_gloom_tiles_p')
                    entity.addEffect('slowness', 20, { amplifier: 4, showParticles: false })
                    entity.runCommand('execute unless entity @e[type=spimton:thefatrat,r=1] run summon spimton:thefatrat')
                }
            });
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
            const xpAmount = randomInt(0, 3); // Number of XP orbs to spawn

            for (let c = 0; c < xpAmount; c++) {
                dimension.spawnEntity("spimton:cancer_giver", block.location)
                dimension.spawnParticle("spimton:lungcancer", block.above(2));
            }


        },
        onRandomTick({ block, dimension }) {
            const Random = Math.random()
            if (Random > 0.9) {
                const location = block.location
                const north = block.north()
                const south = block.south()
                const west = block.west()
                const east = block.east()
                const above = block.above()
                const below = block.below()
                if (north?.permutation.matches('minecraft:air') || south?.permutation.matches('minecraft:air') || west?.permutation.matches('minecraft:air') || east?.permutation.matches('minecraft:air') || above?.permutation.matches('minecraft:air') || below?.permutation.matches('minecraft:air')) {
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
            const xpAmount = randomInt(0, 3); // Number of XP orbs to spawn

            for (let c = 0; c < xpAmount; c++) {
                dimension.spawnEntity("spimton:pbd", block.location)
                dimension.spawnParticle("spimton:cloud", block.above(2));
            }


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

