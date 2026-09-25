import { world, system, DimensionTypes, EntityProjectileComponent, CustomCommandParamType, CommandPermissionLevel, CustomCommandError, CustomCommandStatus, GameMode } from '@minecraft/server'
import { ConfigEntity } from "../CONFIG.js";
const ShamanConfig = ConfigEntity.archshamanConfig;


function distance(min, max) {
    const value = min + ((max - min) * Math.random());
    return Math.random() > 0.5 ? value : -value;
}

system.runInterval(() => {
    const dimensionIds = DimensionTypes.getAll().map(
        dimensionType => world.getDimension(dimensionType.typeId)
    );
    for (const dimension of dimensionIds) {
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