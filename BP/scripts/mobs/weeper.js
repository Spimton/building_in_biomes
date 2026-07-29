import { world, system, EntityComponentTypes, EntityProjectileComponent, CustomCommandParamType, CommandPermissionLevel, CustomCommandError, CustomCommandStatus, GameMode } from '@minecraft/server'


world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {

    const { eventId, entity } = data;

    switch (eventId) {
        case "spimton:tnt_rain_1":
            shootAroundHead(entity.dimension, entity.getHeadLocation(), Math.ceil(Math.random() * 6.67), "spimton:tnt_weeper_proj", Math.random() * 1.225)
            break;
        case "spimton:tnt_rain_2":
            shootAroundHead(entity.dimension, entity.getHeadLocation(), Math.ceil(Math.random() * 12.25), "spimton:tnt_weeper_proj", Math.random() * 2.25)
            break;
        case "spimton:commence_phase_1":
            entity.dimension.createExplosion(entity.location, 12.25, { breaksBlocks: world.gameRules.mobGriefing, causesFire: false, source: entity })
            break;
        case "spimton:charge_check":
            const creepers = entity.dimension.getEntities({ location: entity.location, type: "minecraft:creeper", maxDistance: 32 });
            const length = creepers.length;
            if (length > 0) {
                for (const creeper of creepers) {

                    creeper.addEffect("instant_health", 40);
                    creeper.dimension.spawnEntity("lightning_bolt", creeper.getHeadLocation());
                    creeper.addEffect("speed", 200, { amplifier: 1, showParticles: false })
                    creeper.addTag("spimton:charged_weeper")
                };
            }
            else {
                entity.dimension.spawnEntity("lightning_bolt", entity.getHeadLocation());
                entity.triggerEvent("spimton:charge_self")
            };
            break;
        case "spimton:backoff":

            if (distanceToSurface(entity) <= 10) {

                console.warn("Impulse:", 1.997 - distanceToSurface(entity) / 8)
                entity.applyImpulse({
                    x: 0,
                    y: 1.225 - distanceToSurface(entity) / 8,
                    z: 0,
                });
                system.runTimeout(() => {
                    entity.setProperty("spimton:backoff_cooldown", false)
                }, 1);
            };
            break;
        case "spimton:roar_end":
            if (distanceToSurface(entity) <= 10) {

                console.warn("Impulse:", 1.997 - distanceToSurface(entity) / 8)
                entity.applyImpulse({
                    x: 0,
                    y: 1.225 - distanceToSurface(entity) / 8,
                    z: 0,
                });
                system.runTimeout(() => {
                    entity.setProperty("spimton:backoff_cooldown", false)
                }, 1);
            };
            break;



    }
})


function distanceToSurface(entity) {
    const dimension = entity.dimension;
    const loc = entity.location;

    const x = Math.floor(loc.x);
    const z = Math.floor(loc.z);

    for (let y = Math.floor(loc.y); y >= -64; y--) {
        const block = dimension.getBlock({ x, y, z });

        if (block && !block.isAir) {
            // Distance to the top face of the block
            return loc.y - (y + 1);
        }
    }

    return Infinity;
}



function shootAroundHead(
    dimension,
    headPos,
    count,
    projectileId,
    velocity
) {
    const step = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
        const angle = i * step;

        const direction = {
            x: Math.cos(angle),
            y: 0,
            z: Math.sin(angle)
        };

        const projectile = dimension.spawnEntity(projectileId, headPos);

        projectile.applyImpulse({
            x: direction.x * velocity,
            y: direction.y * velocity,
            z: direction.z * velocity
        });
    }
}

const DamageCapBypassSource = [
    "none",
    "override",
    "void",
    "selfDestruct"
]


world.beforeEvents.entityHurt.subscribe((event) => {
    if (event.hurtEntity.typeId === "spimton:weeper" && !DamageCapBypassSource.includes(event.damageSource.cause)) {
        if (event.damage > 30) event.damage = 30;
        if (event.hurtEntity.getProperty("spimton:phase") == 1 && event.hurtEntity.getProperty("spimton:armor")) {
            event.damage /= 2;
        }


    }
});