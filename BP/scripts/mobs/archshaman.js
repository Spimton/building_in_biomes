import { world, system, EntityComponentTypes, EntityProjectileComponent, CustomCommandParamType, CommandPermissionLevel, CustomCommandError, CustomCommandStatus, GameMode } from '@minecraft/server'
import { ConfigEntity } from "../CONFIG.js";
const ShamanConfig = ConfigEntity.archshamanConfig;


function distance(min, max) {
    const value = min + ((max - min) * Math.random());
    return Math.random() > 0.5 ? value : -value;
}

system.runInterval(() => {
    for (const dimension of [
        world.getDimension("overworld"),
        world.getDimension("nether"),
        world.getDimension("the_end")
    ]) {
        for (const entity of dimension.getEntities({
            type: "spimton:overgrown_archshaman"
        })) {

            const phase = entity.getProperty("spimton:phase")
            const randomChance = Math.random() * 3;
            if (phase >= randomChance) {
                const { x, y, z } = entity.location;
                const location = {
                    x: x + distance(ShamanConfig.minRandomBayRadius, ShamanConfig.maxRandomBayRadius),
                    y: y,
                    z: z + distance(ShamanConfig.minRandomBayRadius, ShamanConfig.maxRandomBayRadius)
                }
                entity.dimension.spawnEntity("spimton:fireball_spawner", location)


            }



        }



    }
}, ShamanConfig.randomBayInterval)