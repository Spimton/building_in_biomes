import { world, system, EntityComponentTypes, EntityProjectileComponent, CustomCommandParamType, CommandPermissionLevel, CustomCommandError, CustomCommandStatus, GameMode } from '@minecraft/server'
import { ConfigEntity } from "../CONFIG.js";
import { spiral, shootSpread } from "./projectiles.js";



const WeeperConfig = ConfigEntity.weeperConfig;



const activeCharges = new Map();



//const weeperIntervals = new Map();

system.runInterval(() => {
    for (const dimension of [
        world.getDimension("overworld"),
        world.getDimension("nether"),
        world.getDimension("the_end")
    ]) {

        for (const entity of dimension.getEntities({
            type: "spimton:weeper"
        })) {

            const distance = distanceToSurface(entity);
            const phase = entity.getProperty("spimton:phase");

            if (distance === Infinity) {
                entity.applyImpulse({
                    x: 0,
                    y: 0.6,
                    z: 0,
                });
                continue;
            }

            if (
                phase < 3 &&
                distance <= WeeperConfig.phase1Height
            ) {
                entity.applyImpulse({
                    x: 0,
                    y: 1.225 - distance / WeeperConfig.phase1Height,
                    z: 0,
                });
            }
            else if (
                phase === 3 &&
                distance <= WeeperConfig.phase2Height
            ) {
                entity.applyImpulse({
                    x: 0,
                    y: 0.225,
                    z: 0,
                });
            }
        }
    }
}, 10);



system.runInterval(() => {
    for (const [id, charge] of activeCharges) {
        const { entity } = charge;

        try {



            entity.applyImpulse({
                x: charge.dirX * WeeperConfig.jaronaSpeed,
                y: charge.dirY * WeeperConfig.jaronaSpeed / 2,
                z: charge.dirZ * WeeperConfig.jaronaSpeed
            });
            const entities = entity.dimension.getEntities({ location: entity.location, excludeFamilies: ["creeper"], maxDistance: 1.997 });
            for (const damagee of entities) {
                damagee.applyDamage(charge.damage, { cause: "entityAttack", damagingEntity: entity })
                damagee.applyKnockback({ x: 0, z: 0 }, 1);
            }

            charge.ticks--;

            if (charge.ticks <= 0) {

                activeCharges.delete(id);
            }

        } catch (e) {
            console.warn(`Charge entity invalid: ${e}`);
            activeCharges.delete(id);
        }
    }
}, 1);


world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {

    const { eventId, entity } = data;



    if (entity.typeId === "spimton:weeper") {

        const { x, y, z } = entity.getViewDirection();


        switch (eventId) {
            case "spimton:tnt_rain_1":
                shootAroundHead(entity.dimension, entity.getHeadLocation(), Math.ceil(Math.random() * 9), "spimton:tnt_weeper_proj", Math.random() * 1.225, Math.random())
                break;
            case "spimton:tnt_rain_2":
                shootAroundHead(entity.dimension, entity.getHeadLocation(), Math.ceil(Math.random() * 14), "spimton:tnt_weeper_proj", Math.random() * 2.25, Math.random())
                break;
            case "spimton:commence_phase_1":
                entity.dimension.createExplosion(entity.location, WeeperConfig.initialExplosionRadius, { breaksBlocks: world.gameRules.mobGriefing, causesFire: false, source: entity })
                /* const id = system.runInterval(() => {
                     try {
                         const distance = distanceToSurface(entity);
 
                         if (distance <= WeeperConfig.phase1Height && entity.getProperty("spimton:phase") < 3) {
                             entity.applyImpulse({
                                 x: 0,
                                 y: 1.225 - distance / WeeperConfig.phase1Height,
                                 z: 0,
                             });
                         }
                         /* else if (distance <= WeeperConfig.phase2Height && entity.getProperty("spimton:phase") == 3) {
                              entity.applyImpulse({
                                  x: 0,
                                  y: 1 - distance / WeeperConfig.phase2Height,
                                  z: 0,
                              });
                          }
                     } catch {
                         system.clearRun(id);
                         weeperIntervals.delete(entity.id);
                     }
                 }, 10);
 
                 weeperIntervals.set(entity.id, id);  */
                break;
            case "spimton:charge_check":
                const creepersC = entity.dimension.getEntities({ location: entity.location, type: "minecraft:creeper", maxDistance: 32 });
                const length = creepersC.length;
                if (length > 0) {
                    for (const creeper of creepersC) {

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
            case "spimton:spawn_powerup":

                const MaxSpawns = WeeperConfig.powerupRate * 2
                const intervalTicks = Math.max(1, Math.floor(40 / MaxSpawns));

                const dimension = entity.dimension
                const center = entity.getHeadLocation();
                const radius = WeeperConfig.phase1Height * 0.9;


                let spawned = 0;

                const runId = system.runInterval(() => {
                    if (spawned >= MaxSpawns) {
                        system.clearRun(runId);
                        return;
                    }
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);

                    const dx = Math.sin(phi) * Math.cos(theta);
                    const dy = Math.cos(phi);
                    const dz = Math.sin(phi) * Math.sin(theta);

                    const spawnPos = {
                        x: center.x + dx * radius,
                        y: center.y + dy * radius,
                        z: center.z + dz * radius,
                    };

                    const arrow = dimension.spawnEntity("spimton:weeper_heal", spawnPos);

                    // Shoot toward the center
                    const speed = 2;

                    arrow.getComponent("projectile").shoot({
                        x: -dx * speed,
                        y: -dy * speed,
                        z: -dz * speed,
                    });

                    spawned++;
                }, intervalTicks);
                break;
            case "spimton:roar_end":

                entity.applyImpulse({
                    x: -x,
                    y: 0.1997,
                    z: -z
                })
                break;
            case "spimton:arrivederci":


                let arric = 0;

                const arri = system.runInterval(() => {
                    try {
                        if (arric >= WeeperConfig.arrivederciCount) {
                            system.clearRun(arri);
                            return;
                        }




                        entity.applyImpulse({
                            x: -x * WeeperConfig.arrivederciDist,
                            y: 0.06,
                            z: -z * WeeperConfig.arrivederciDist
                        });
                        const location = entity.location
                        entity.dimension.spawnEntity("spimton:cspore", location);

                        arric++;
                    }
                    catch (e) {
                        console.warn(e)
                        system.clearRun(arri);
                    }

                }, 5);

                break;
            case "spimton:jarona":
                let Jamultiplier = entity.getDynamicProperty("spimton:weeper_creeper_absorption");
                if (Jamultiplier === undefined) Jamultiplier = 0;

                const wargets = entity.dimension.getEntities({ location: entity.location, maxRange: 32, closest: 1, tags: ["spimton:weeper_target"] });

                for (const target of wargets) {

                    entity.teleport(entity.location, {
                        facingLocation: target.location
                    });
                    if (activeCharges.has(entity.id))
                        activeCharges.delete(entity.id);
                    const dx = target.location.x - entity.location.x;
                    const dz = target.location.z - entity.location.z;
                    const dy = target.location.y - entity.location.y;

                    const length = Math.hypot(dx, dz, dy);

                    if (length === 0) return;

                    activeCharges.set(entity.id, {
                        entity,
                        dirX: dx / length,
                        dirZ: dz / length,
                        dirY: dy / length,
                        ticks: WeeperConfig.jaronaDuration,
                        damage: WeeperConfig.jaronaDamage * (1 + (Jamultiplier / 15))
                    });
                }
                break;
            case "spimton:tnt_spiral":
                if (Math.random() > 0.1997) {
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, true, 0, 4, 2, 1)
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, true, 180, 4, 2, 1)
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, true, 90, 4, 2, 1)
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, true, 270, 4, 2, 1)
                }
                else {
                    const random = Math.random() > 0.5 ? true : false;
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, random, 0, 4, 2, 1)
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, random, 180, 4, 2, 1)
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, random, 90, 4, 2, 1)
                    spiral(entity, "spimton:tnt_weeper_proj", 30, 22.5, 0.5, 0.1225, random, 270, 4, 2, 1)
                }
                break;
            case "spimton:shoot_tele":
                shootSpread(entity, 120, 5, 0.5, "spimton:weeperball_2_neo", "spimton:weeper_target")
                break;
            case "spimton:melee_shockwave":
                const absorbed = entity.getDynamicProperty("spimton:weeper_impulse_absorption") ?? 0;
                const damagees = entity.dimension.getEntities({ location: entity.location, maxDistance: WeeperConfig.shockwaveBaseRadius + absorbed * WeeperConfig.shockwaveRadiusMultiplier, excludeFamilies: ["spimton:weeper", "spimton:creeper"] });
                for (const damagee of damagees) {
                    const dx = damagee.location.x - entity.location.x;
                    const dz = damagee.location.z - entity.location.z;
                    const dy = damagee.location.y - entity.location.y;
                    const distance = Math.hypot(dz, dx, dy);
                    const damage = ((WeeperConfig.shockwaveBaseDamage + WeeperConfig.shockwaveDamageMultiplier * absorbed) / (1 + distance * WeeperConfig.shochwaveDistanceDamageModifier));
                    if (damage > 0) damagee.applyDamage(damage, { damagingEntity: entity, cause: "entityAttack" });
                    damagee.applyKnockback({
                        x: dx / distance * 1.997,
                        z: dx / distance * 1.997
                    }, dy / distance + 1)

                };
                entity.setDynamicProperty("spimton:weeper_impulse_absorption", 0)
                break;
            case "spimton:absorb_creepies":
                let increment = 0;

                const creepers = entity.dimension.getEntities({ location: entity.location, maxDistance: 32, type: "minecraft:creeper" });
                for (const creeper of creepers) {
                    increment += WeeperConfig.creeperDamageMultiplier;
                    creeper.triggerEvent("minecraft:start_exploding_forced");
                }

                const creepies = entity.dimension.getEntities({ location: entity.location, maxDistance: 32, type: "spimton:creepie_hostile" });
                for (const creepie of creepies) {
                    increment += WeeperConfig.creepieDamageMultiplier;
                    creepie.triggerEvent("minecraft:start_exploding_forced");
                };
                entity.setDynamicProperty("spimton:weeper_creeper_absorption", increment)

                break;
            case "spimton:last_jarona":
                entity.setDynamicProperty("spimton:weeper_creeper_absorption", 0);
                break;









        }
    }
    if (entity.typeId === "spimton:weeperball_4_neo") {
        switch (eventId) {
            case "spimton:desp":
                entity.dimension.createExplosion(entity.getHeadLocation(), entity.getProperty("spimton:size"), { breaksBlocks: false, source: entity });
                entity.remove()
                break;
        }
    }
    if (entity.typeId === "spimton:weeperball_5_neo") {
        if (eventId === "spimton:splode") {
            let directions = entity.getProperty("spimton:armor_color") == 2 ? [
                {
                    x: 1.225,
                    y: 0,
                    z: 0
                },
                {
                    x: -1.225,
                    y: 0,
                    z: 0
                },
                {
                    x: 0,
                    y: 0,
                    z: 1.225
                },
                {
                    x: 0,
                    y: 0,
                    z: -1.225
                }
            ] : [
                {
                    x: 0.866,
                    y: 0,
                    z: 0.866
                },
                {
                    x: -0.866,
                    y: 0,
                    z: 0.866
                },
                {
                    x: -0.866,
                    y: 0,
                    z: -0.866
                },
                {
                    x: 0.866,
                    y: 0,
                    z: -0.866
                }
            ];
            const { x, y, z } = entity.location;
            for (const direction of directions) {
                const projectile = entity.dimension.spawnEntity("spimton:weeperball_6_neo", { x: x, y: y + 0.66, z: z })
                projectile.getComponent("projectile").shoot(direction)
            }
        }
        else if (eventId === "spimton:desp") {
            const rot = entity.getRotation();

            entity.setRotation({
                x: rot.x,
                y: rot.y + 45
            });
        }




    }
    if (entity.typeId === "spimton:weeperball_7_neo") {
        if (eventId === "spimton:splode") {
            let directions = [{
                x: 1.225,
                y: 0,
                z: 0
            },
            {
                x: -1.225,
                y: 0,
                z: 0
            },
            {
                x: 0,
                y: 0,
                z: 1.225
            },
            {
                x: 0,
                y: 0,
                z: -1.225
            }]
            const { x, y, z } = entity.location;
            for (const direction of directions) {
                const projectile = entity.dimension.spawnEntity("spimton:weeperball_8_neo", { x: x, y: y + 1.5, z: z })
                projectile.getComponent("projectile").shoot(direction)
            }
        }




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
            return loc.y - (y + 1);
        }
    }

    return Infinity;
}




export function shootAroundHead(
    dimension,
    headPos,
    count,
    projectileId,
    velocity,
    toY
) {
    const step = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
        const angle = i * step;

        const direction = {
            x: Math.cos(angle),
            y: toY,
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

const DamageCapBypassSource = WeeperConfig.damageCapBypassSource;

world.beforeEvents.entityHurt.subscribe((event) => {
    if (event.hurtEntity.typeId === "spimton:weeper" && !DamageCapBypassSource.includes(event.damageSource.cause)) {
        if (event.damage > WeeperConfig.damageCap) event.damage = WeeperConfig.damageCap;
        if (event.hurtEntity.getProperty("spimton:armor_color") == 1 && event.hurtEntity.getProperty("spimton:armor")) {
            event.damage /= WeeperConfig.electricArmorReduction;
        }
        if (event.hurtEntity.getProperty("spimton:armor_color") == 2 && event.hurtEntity.getProperty("spimton:armor")) {
            event.cancel = true;
        }


    }
    if (event.damageSource.damagingProjectile && event.damageSource.cause === "projectile") {
        if (event.damageSource.damagingProjectile.typeId === "spimton:fist_of_the_north_star") {

            const power = event.damageSource.damagingProjectile.getProperty("spimton:powerup")
            event.damage = event.damage * (1 + WeeperConfig.fotnsDamageMult * power) + event.hurtEntity.getComponent("health").effectiveMax * WeeperConfig.fotnsPercDamage;
            console.warn(event.damage);

        }
    }
});


world.afterEvents.entityHurt.subscribe((event) => {
    const { hurtEntity, damage, damageSource } = event;
    if (hurtEntity.typeId === "spimton:weeper" && hurtEntity.getProperty("spimton:phase") == 2) {
        const RecievedDamage = damage;
        const damageAbsorbed = hurtEntity.getDynamicProperty("spimton:weeper_transition_absorption") ?? 0;
        hurtEntity.setDynamicProperty("spimton:weeper_transition_absorption", damageAbsorbed + RecievedDamage);

        if (damageAbsorbed + RecievedDamage > WeeperConfig.forceTransitionDamage) {
            hurtEntity.setProperty("spimton:forced_phase_2", true)
        }
    }
    if (hurtEntity.typeId === "spimton:weeper" && hurtEntity.getProperty("spimton:phase") == 3 && hurtEntity.getProperty("spimton:armor_color") == 1) {
        const RecievedDamage = damage;
        const damageAbsorbed = hurtEntity.getDynamicProperty("spimton:weeper_impulse_absorption") ?? 0;
        hurtEntity.setDynamicProperty("spimton:weeper_impulse_absorption", damageAbsorbed + RecievedDamage);

    }
    if (damageSource.cause === "lightning") {
        const Champions = hurtEntity.dimension.getEntities({ location: hurtEntity.location, maxRange: 32, type: "spimton:justice_champion" });
        for (const champion of Champions) {
            champion.addEffect("instant_health", 1, { amplifier: 0 })
        };
    }


})


world.afterEvents.projectileHitEntity.subscribe((event) => {
    const projectile = event.projectile;
    const target = event.getEntityHit().entity;
    switch (projectile.typeId) {
        case "spimton:weeper_heal":
            const weeperPowerup = target.getDynamicProperty("spimton:weeper_powerup") ?? 0;
            target.setDynamicProperty("spimton:weeper_powerup", weeperPowerup + 1);

            break;
        case "spimton:fist_of_the_north_star":
            projectile.dimension.createExplosion(projectile.location, WeeperConfig.fotnsBaseRadius + projectile.getProperty("spimton:powerup") * WeeperConfig.fotnsRadiusMult, { breaksBlocks: world.gameRules.mobGriefing, source: projectile })
            projectile.runCommand('function mob/weeper/nuclear_blast')
            projectile.remove()

    }

})

world.afterEvents.projectileHitBlock.subscribe((event) => {
    const projectile = event.projectile;
    switch (projectile.typeId) {
        case "spimton:fist_of_the_north_star":
            projectile.dimension.createExplosion({ x: projectile.location.x, y: projectile.location.y + 1, z: projectile.location.z }, WeeperConfig.fotnsBaseRadius + projectile.getProperty("spimton:powerup") * WeeperConfig.fotnsRadiusMult, { breaksBlocks: world.gameRules.mobGriefing, source: projectile })
            projectile.runCommand('function mob/weeper/nuclear_blast')
            projectile.remove()

    }

})



