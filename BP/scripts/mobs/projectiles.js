import { world, system, EntityComponentTypes, EntityProjectileComponent, CustomCommandParamType, CommandPermissionLevel, CustomCommandError, CustomCommandStatus, GameMode } from '@minecraft/server'
import { updateItemDurability } from "../folder2/updateDurability.js";
import { shootAroundHead } from "./weeper.js";



function blastFungus(location, dimension, count = 30, entity, speed, maxangle = 50) {
    for (let i = 0; i < count; i++) {
        const yaw = Math.random() * Math.PI * 2;

        // 0–35° from straight up
        const angle = Math.random() * (maxangle * Math.PI / 180);

        const x = Math.sin(angle) * Math.cos(yaw);
        const y = Math.cos(angle);
        const z = Math.sin(angle) * Math.sin(yaw);

        const arrow = dimension.spawnEntity(
            entity,
            location
        );

        arrow.getComponent("minecraft:projectile").shoot({
            x: x * speed,
            y: y * speed * 1.997,
            z: z * speed,
        });
    }
}



export function spiral(
    entity,
    projectileId,
    shots,
    stepDegrees = 15,
    speed = 2,
    speedIncrease = 0,
    clockwise = true,
    startAngle = 0,
    yOffset = 1.6,
    interval = 2,
    yDirection = 0
) {
    let angle = startAngle;

    const direction = clockwise ? 1 : -1;

    let speedAdd = 0;

    const runId = system.runInterval(() => {
        try {
            if (shots-- <= 0) {
                system.clearRun(runId);
                return;
            }

            const yaw = angle * Math.PI / 180;

            const arrow = entity.dimension.spawnEntity(
                projectileId,
                {
                    x: entity.location.x,
                    y: entity.location.y + yOffset,
                    z: entity.location.z
                }
            );

            const currentSpeed = speed + speedAdd;
            arrow.getComponent("projectile").owner = entity;

            arrow.applyImpulse({
                x: -Math.sin(yaw) * currentSpeed,
                y: yDirection,
                z: Math.cos(yaw) * currentSpeed
            });
            speedAdd += speedIncrease;
            angle += stepDegrees * direction;
            console.warn(angle)
        } catch (e) {
            console.warn(e)
            system.clearRun(runId)
        }
    }, interval);
}

function crossfire(target, distance, entity, speed, offsetY) {
    const { dimension, location } = target;

    const offsets = [
        { x: 0, y: offsetY, z: -distance },
        { x: distance, y: offsetY, z: 0 },
        { x: 0, y: offsetY, z: distance },
        { x: -distance, y: offsetY, z: 0 },
    ];

    const projectiles = [];

    for (const offset of offsets) {
        const proj = dimension.spawnEntity(entity, {
            x: location.x + offset.x,
            y: location.y + offsetY,
            z: location.z + offset.z,
        });

        projectiles.push(proj);
    }

    projectiles.forEach((proj, index) => {
        system.runTimeout(() => {
            if (!proj?.isValid || !target?.isValid) return;

            const pos = proj.location;
            const targetPos = target.location;

            const projectileComp = proj.getComponent(EntityProjectileComponent.componentId);
            if (!projectileComp) return;

            let dx = targetPos.x - pos.x;
            let dy = (targetPos.y + 1) - pos.y;
            let dz = targetPos.z - pos.z;

            const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (length === 0) return;

            dx /= length;
            dy /= length;
            dz /= length;

            projectileComp.shoot({
                x: dx * speed,
                y: dy * speed,
                z: dz * speed
            });

        }, index + 1);
    });
}

/*function redirectProjectile(projectile, FamiliesExcluded, speed) {
    console.warn("Redirect");
    const comp = projectile.getComponent(EntityProjectileComponent.componentId);
    if (!comp) return;
    console.warn("Projectile");
    const targets = projectile.dimension.getEntities({
        location: projectile.location,
        closest: 1,
        //excludeGameModes: [GameMode.Creative],
        excludeFamilies: FamiliesExcluded
    });
    console.warn(targets);
    for (const target of targets) {

        console.warn("Targeted");
        const pos = projectile.location;
        const targetPos = target.location;

        let dx = targetPos.x - pos.x;
        let dy = (targetPos.y + 1) - pos.y;
        let dz = targetPos.z - pos.z;

        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (length === 0) return;

        dx /= length;
        dy /= length;
        dz /= length;

        comp.shoot({
            x: dx * speed,
            y: dy * speed,
            z: dz * speed
        });
        console.warn("Shot");
        break;
    }

}*/
function redirectProjectile(projectile, Tags, speed) {
    const comp = projectile.getComponent(EntityProjectileComponent.componentId);
    if (!comp) return;

    const targets = projectile.dimension.getEntities({
        location: projectile.location,
        closest: 1,
        tags: Tags
    });
    if (targets.length == 0) {
        projectile.triggerEvent("minecraft:explode")
    };
    console.warn(targets)
    for (const target of targets) {
        const pos = projectile.location;
        const targetPos = target.location;

        const dx = targetPos.x - pos.x;
        const dy = targetPos.y - pos.y;
        const dz = targetPos.z - pos.z;

        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (length < 0.0001) return;

        comp.shoot({
            x: (dx / length) * speed,
            y: (dy / length) * speed,
            z: (dz / length) * speed
        });

        break;
    }
}


system.beforeEvents.startup.subscribe((event) => {
    event.customCommandRegistry.registerCommand(
        {
            name: "spimton:blastfungus",
            description: "Launch a projectile burst",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            mandatoryParameters: [
                {
                    name: "count",
                    type: CustomCommandParamType.Integer,
                },
                {
                    name: "entity",
                    type: CustomCommandParamType.String,
                },
                {
                    name: "speed",
                    type: CustomCommandParamType.Float,
                }
            ],
            optionalParameters: [
                {
                    name: "yOffset",
                    type: CustomCommandParamType.Float,
                },
                {
                    name: "maxAngle",
                    type: CustomCommandParamType.Float,
                }
            ]
        },
        (origin, count, entityType, speed, yOffset, maxAngle) => {

            yOffset ??= 2.2;

            maxAngle ??= 50.0;

            const source = origin.sourceEntity;

            if (source) {
                // Player or entity executor
                system.run(() => {
                    blastFungus(
                        {
                            x: source.location.x,
                            y: source.location.y + yOffset,
                            z: source.location.z
                        },
                        source.dimension,
                        count,
                        entityType,
                        speed,
                        maxAngle
                    );

                })
                return;

            }

            // Handle command blocks separately
            const block = origin.sourceBlock;

            if (block) {
                system.run(() => {
                    blastFungus(
                        {
                            x: block.location.x,
                            y: block.location.y + yOffset,
                            z: block.location.z
                        },
                        block.dimension,
                        count,
                        entityType,
                        speed,
                        maxAngle
                    );

                })
                return;

            }

            throw new Error(
                "Could not determine execution location."
            );
        }
    );
});




system.runInterval(() => {
    const dimensions = [
        world.getDimension("overworld"),
        world.getDimension("nether"),
        world.getDimension("the_end"),
    ];
    for (const dimension of dimensions) {
        for (const e of dimension.getEntities({
            families: ["spimton:fungus"]
        })) {
            const v = e.getVelocity();
            const speedSquared = v.x * v.x + v.y * v.y + v.z * v.z;

            if (speedSquared < 0.01225 * 0.01225) {
                e.triggerEvent("spimton:3freeze");
            }
        }
    }
}, 2);

world.afterEvents.entityHitEntity.subscribe(data => {
    const { damagingEntity, hitEntity } = data
    if (damagingEntity.typeId === "spimton:bluestone_golem") {
        const headV = damagingEntity.getViewDirection()
        hitEntity.applyKnockback({ x: headV.x * 3, z: headV.y * 3 }, 0.6)
    }
    else if (damagingEntity.typeId === "spimton:hollering_chevalier" && damagingEntity.getComponent("mark_variant").value == 1) {
        const health = damagingEntity.getComponent("health")
        const current = health.currentValue
        const max = health.effectiveMax
        const newH = current + (hitEntity.getComponent("health").currentValue / 3)
        if (newH > max) health.setCurrentValue(max)
        else health.setCurrentValue(newH);
        damagingEntity.applyImpulse(damagingEntity.getViewDirection());
    }
    else if (damagingEntity.typeId === "spimton:hellglin") {
        const headV = damagingEntity.getViewDirection()
        hitEntity.applyKnockback({ x: headV.x * 0.5, z: headV.y * 0.5 }, 1.225)
        hitEntity.setOnFire(3, true)
    }
    else if (damagingEntity.typeId === "spimton:overgrown_steed") {
        const headV = damagingEntity.getViewDirection()
        hitEntity.applyKnockback({ x: headV.x * 1.997, z: headV.y * 1.997 }, 0.67)
    }
})

world.afterEvents.entityHurt.subscribe(data => {
    const { hurtEntity, damageSource } = data;
    if (!damageSource.damagingProjectile) return;
    if (damageSource.damagingProjectile.typeId === "spimton:jester_shot" && hurtEntity.typeId === "minecraft:player") {
        const inventory = hurtEntity.getComponent("inventory").container;
        const cooldownCategories = new Set();

        for (let slot = 0; slot < inventory.size; slot++) {
            const item = inventory.getItem(slot);
            if (!item) continue;

            const cooldown = item.getComponent("minecraft:cooldown");
            if (!cooldown) continue;

            // Prevent starting the same cooldown category multiple times
            if (cooldownCategories.has(cooldown.cooldownCategory)) continue;

            cooldownCategories.add(cooldown.cooldownCategory);
            console.warn("Cooldown  " + cooldown.cooldownCategory)
            hurtEntity.startItemCooldown(
                cooldown.cooldownCategory,
                1225
            );
        }
    }

})


system.afterEvents.scriptEventReceive.subscribe((data) => {
    const { id, sourceEntity, message } = data;

    if (id === "spimton:crossfire") {
        if (!sourceEntity?.isValid) return;

        const parts = message.split(",");

        const projectile = parts[0]?.trim();
        const radius = Number(parts[1] ?? 4);
        const speed = Number(parts[2] ?? 0.6);
        const offsetY = Number(parts[3] ?? 1);

        if (!projectile) return;

        crossfire(sourceEntity, radius, projectile, speed, offsetY);
    }
    if (id === "spimton:redirect") {
        if (!sourceEntity?.isValid) return;
        const params = message.split(";"); // scriptevent spimton:redirect spimton:juandice_target,0.5
        const projectile = sourceEntity;
        const excluded = params[0]
        const speed = Number(params[1] ?? 0.6);
        if (!projectile) return;

        redirectProjectile(projectile, [excluded], speed);



    }
    if (id === "spimton:spread") {
        if (!sourceEntity?.isValid) return;
        const params = message.split(","); // scriptevent spimton:spreadshot
        const player = sourceEntity;
        const projectile = params[0] ?? "minecraft:arrow";
        const angle = Number(params[1] ?? 120)
        const noproj = Number(params[2] ?? 5);
        const speed = Number(params[3] ?? 1.997);
        const tag = params[4] ?? false;
        shootSpread(player, angle, noproj, speed, projectile, tag)


    }
    if (id === "spimton:emergency_remove") {
        if (!sourceEntity?.isValid) return;
        const Entityid = message;
        const entities = sourceEntity.dimension.getEntities({ type: message });
        for (const entity of entities) {
            entity.remove()
        }
    }
    if (id === "spimton:health_set") {
        if (!sourceEntity?.isValid) return; // scriptevent spimton:champion_health_take 5
        const newValue = Number(message);
        const health = sourceEntity.getComponent("health");
        health.setCurrentValue(newValue);

    }
    if (id === "spimton:weeper_init") {
        let count = 0;
        const healthComp = sourceEntity.getComponent("health");
        const id = system.runInterval(() => {


            if (healthComp.currentValue < 285) healthComp.setCurrentValue(healthComp.currentValue + 15)
            else healthComp.resetToMaxValue();
            count++;

            if (count >= 20) {
                system.clearRun(id);
            }
        }, 10);
    }
    if (id === "spimton:fotns") {
        const heed = sourceEntity.getHeadLocation();
        const Fist = sourceEntity.dimension.spawnEntity("spimton:fist_of_the_north_star", {
            x: heed.x,
            y: heed.y + 2,
            z: heed.z
        });
        const targetA = sourceEntity.dimension.getEntities({ location: sourceEntity.location, tags: ["spimton:weeper_target"], maxDistance: 64 });
        for (const Target of targetA) {
            const projectile = Fist.getComponent("projectile");
            projectile.owner = sourceEntity;
            Fist.setProperty("spimton:powerup", sourceEntity.getDynamicProperty("spimton:weeper_powerup"));
            const pos = Fist.location;
            const targetPos = Target.getHeadLocation();
            const powerUP = Fist.getProperty("spimton:powerup");

            const dx = targetPos.x - pos.x;
            const dy = targetPos.y - pos.y;
            const dz = targetPos.z - pos.z;

            const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (length < 0.0001) return;

            projectile.shoot({
                x: (dx / length) / (powerUP * 0.33 + 1),
                y: (dy / length) / (powerUP * 0.33 + 1),
                z: (dz / length) / (powerUP * 0.33 + 1)
            });


        }





    }
    if (id === "spimton:skull_fungus") {
        const round = Number(message);
        const location = sourceEntity.location
        skullFungus(
            {
                x: location.x,
                y: location.y + 4,
                z: location.z,
            },
            sourceEntity.dimension,
            round,
            "spimton:weeperball_4_neo",
            0.1997 + round * 0.1,
            `spimton:round_${round}`

        )

    }
    if (id === "spimton:archshaman_spiral") {
        sourceEntity.dimension.spawnParticle("spimton:arch_sun", {
            x: sourceEntity.getHeadLocation().x,
            y: sourceEntity.getHeadLocation().y + 1,
            z: sourceEntity.getHeadLocation().z
        })
        const phase = sourceEntity.getProperty("spimton:phase");
        if (phase == 2) {
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 2, 1.225, 0, true, 0, 2.25, 2.5)
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 2, 1.225, 0, true, 90, 2.25, 2.5)
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 2, 1.225, 0, true, 180, 2.25, 2.5)
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 2, 1.225, 0, true, 270, 2.25, 2.5)
        }
        else if (phase == 3) {
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 4, 1.225, 0, true, 0, 2.25, 2.5)
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 4, 1.225, 0, true, 90, 2.25, 2.5)
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 4, 1.225, 0, true, 180, 2.25, 2.5)
            spiral(sourceEntity, "spimton:fireball_unfriendly", 70, 4, 1.225, 0, true, 270, 2.25, 2.5)
        }
        else { }
    }
    if (id === "spimton:player_dynamic_properties") {
        const props = sourceEntity.getDynamicPropertyIds();
        for (const prop of props) {
            const property = sourceEntity.getDynamicProperty(prop);
            sourceEntity.runCommand(`say ${prop} : ${property}`)
        }
    }
});



function skullFungus(
    location,
    dimension,
    count = 30,
    entity,
    speed,
    event = "minecraft:entity_spawned"
) {
    let fired = 0;

    const intervalId = system.runInterval(() => {
        if (fired >= count) {
            system.clearRun(intervalId);
            return;
        }

        const yaw = Math.random() * Math.PI * 2;
        const angle = Math.random() * (50 * Math.PI / 180);

        const x = Math.sin(angle) * Math.cos(yaw);
        const y = Math.cos(angle);
        const z = Math.sin(angle) * Math.sin(yaw);

        const projectile = dimension.spawnEntity(entity, location);

        projectile.triggerEvent(event);

        projectile.getComponent("minecraft:projectile").shoot({
            x: x * speed,
            y: y * speed * 1.997,
            z: z * speed,
        });

        fired++;
    }, 3); // Fire one projectile every 5 ticks
}




system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
    // Register an enum for teleport locations
    customCommandRegistry.registerEnum("spimton:operation", ["set", "go"]);

    // Register the custom command
    customCommandRegistry.registerCommand(
        {
            name: "spimton:homer",
            description: "Sets/Teleports to home positions",
            permissionLevel: CommandPermissionLevel.Any, // Allow all players to run the command
            cheatsRequired: true, // Allow the command to be ran without enabling cheats
            mandatoryParameters: [
                {
                    // Use the enum by setting the name to the enum name
                    name: "spimton:operation",
                    type: CustomCommandParamType.Enum,
                },
            ],
        },
        (origin, operation) => {
            // Only run if executed by an entity
            if (!origin.sourceEntity)
                return {
                    status: CustomCommandStatus.Failure,
                };



            const EntityLoc = origin.sourceEntity.location
            const Homer = origin.sourceEntity.getDynamicProperty("Homer")

            if (operation === "set") {
                origin.sourceEntity.setDynamicProperty("Homer", { z: EntityLoc.z, x: EntityLoc.x, y: EntityLoc.y });
                return {
                    status: CustomCommandStatus.Success,
                    message: `Set Homer to ${EntityLoc.x}, ${EntityLoc.y}, ${EntityLoc.z}`,
                };
            }
            else if (operation === "go") {
                if (Homer === undefined) {
                    return {
                        status: CustomCommandStatus.Failure,
                        message: "§cNo Homer set"
                    };
                }
                system.run(() => {
                    origin.sourceEntity.teleport(Homer);
                });
                return {
                    status: CustomCommandStatus.Success,
                    message: `Teleported to Homer`,
                };

            }
            else {
                return {
                    status: CustomCommandStatus.Failure,
                    message: "§cInvalid argument",
                };
            }



        }
    );
});



function rotateHorizontal(direction, angleDegrees) {
    const angle = angleDegrees * Math.PI / 180;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        x: direction.x * cos - direction.z * sin,
        y: direction.y,
        z: direction.x * sin + direction.z * cos,
    };
}

export function shootSpread(player, spreadDegrees, projectileCount, speed, projectileId, tag) { //Speed = 3
    let direction = player.getViewDirection();
    let head = player.getHeadLocation();
    const dimension = player.dimension;
    if (tag) {
        const entityL = dimension.getEntities({ location: player.location, closest: 1, tags: [tag] });
        const entity = entityL[0];
        if (entityL.length != 0) {


            console.log(entity)
            const to = entity.getHeadLocation();
            const fromE = player.getHeadLocation();
            direction = {
                x: to.x - fromE.x,
                y: to.y - fromE.y - 2.5,
                z: to.z - fromE.z,
            };
            const length = Math.sqrt(
                direction.x ** 2 +
                direction.y ** 2 +
                direction.z ** 2
            );

            direction.x /= length;
            direction.y /= length;
            direction.z /= length;
            head = {
                x: fromE.x,
                z: fromE.z,
                y: fromE.y + 3
            };
        };
    };


    if (projectileCount <= 0) return;

    // Special case for a single projectile
    if (projectileCount === 1) {
        const arrow = dimension.spawnEntity(projectileId, head);
        arrow.getComponent("minecraft:projectile").shoot({
            x: direction.x * speed,
            y: direction.y * speed,
            z: direction.z * speed,
        });
        return;
    }

    const step = spreadDegrees / (projectileCount - 1);

    for (let i = 0; i < projectileCount; i++) {
        const angle = -spreadDegrees / 2 + step * i;

        const dir = rotateHorizontal(direction, angle);

        const arrow = dimension.spawnEntity(projectileId, head);

        const projectile = arrow.getComponent("minecraft:projectile");
        projectile.owner = player;
        projectile.shoot({
            x: dir.x * speed,
            y: dir.y * speed,
            z: dir.z * speed,
        });
    }
}