import { world, system, WeatherType, ItemStack, EquipmentSlot, GameMode, GameRule, BlockPermutation, InputInfo, EntityHealthComponent, EntityComponentTypes, EntityDamageCause, CustomCommand, CustomCommandParamType, CommandPermissionLevel } from '@minecraft/server'
import { updateItemDurability } from "../folder2/updateDurability.js";



function blastFungus(location, dimension, count = 30, entity, speed) {

    for (let i = 0; i < count; i++) {
        const yaw = Math.random() * Math.PI * 2;

        // 0–35° from straight up
        const angle = Math.random() * (50 * Math.PI / 180);

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
                },
            ],
        },
        (origin, count, entityType, speed) => {

            const source = origin.sourceEntity;

            if (source) {
                // Player or entity executor
                system.run(() => {
                    blastFungus(
                        {
                            x: source.location.x,
                            y: source.location.y + 2.2,
                            z: source.location.z
                        },
                        source.dimension,
                        count,
                        entityType,
                        speed
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
                            y: block.location.y + 2.2,
                            z: block.location.z
                        },
                        block.dimension,
                        count,
                        entityType,
                        speed
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
    for (const e of world.getDimension("overworld").getEntities({
        families: [
            "spimton:fungus"
        ]
    })) {

        const v = e.getVelocity();

        const speed =
            Math.abs(v.x) +
            Math.abs(v.y) +
            Math.abs(v.z);

        if (speed < 0.01225) {
            e.triggerEvent("spimton:3freeze");
        }
    }
}, 1);

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
})

world.afterEvents.entityHurt.subscribe(data => {
    const { hurtEntity, damageSource } = data;
    if (!damageSource.damagingProjectile) return;
    console.warn("Jester Shot")
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
