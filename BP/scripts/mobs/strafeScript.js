import { world, system } from '@minecraft/server';

export function dodgeProjectiles(entity, DODGE_CONFIG) {

    /*
     * Prevent repeated dodges.
     */



    const projectiles = entity.dimension.getEntities({
        location: entity.location,
        maxDistance: DODGE_CONFIG.detectionRange
    });


    for (const projectile of projectiles) {
        // Get projectile component.
        const projectileComponent =
            projectile.getComponent("minecraft:projectile");
        if (!projectileComponent) continue;
        //Get projectile owner.
        const owner = projectileComponent.owner;
        if (!owner) continue;
        //Only dodge projectiles fired by entities
        //with the required tag.
        if (!owner.hasTag(DODGE_CONFIG.ownerTag)) {
            continue;
        }
        // Projectile velocity.
        const velocity = projectile.getVelocity();
        const horizontalSpeed = Math.sqrt(
            velocity.x * velocity.x +
            velocity.z * velocity.z
        );

        if (horizontalSpeed <= 0.01) continue;
        //Vector from projectile -> target.
        const dx =
            entity.location.x -
            projectile.location.x;

        const dz =
            entity.location.z -
            projectile.location.z;

        //Normalize projectile horizontal velocity.
        const velocityX =
            velocity.x / horizontalSpeed;

        const velocityZ =
            velocity.z / horizontalSpeed;

        //Determine whether the projectile is
        //actually traveling toward the entity.

        const directionLength =
            Math.sqrt(dx * dx + dz * dz);

        if (directionLength <= 0.01) continue;


        const directionX = dx / directionLength;
        const directionZ = dz / directionLength;


        const approaching =
            velocityX * directionX +
            velocityZ * directionZ;



        //Projectile isn't traveling toward entity.

        if (approaching <= 0) continue;


        /*
         * -----------------------------------------------------
         * Closest approach calculation
         * -----------------------------------------------------
         *
         * Find the point on the projectile's trajectory
         * that will come closest to the entity.
         */
        /*
         * Projectile position.
         */
        const px = projectile.location.x;
        const pz = projectile.location.z;
        /*
         * Entity position.
         */
        const ex = entity.location.x;
        const ez = entity.location.z;
        /*
         * Vector from projectile -> entity.
         */
        const toEntityX = ex - px;
        const toEntityZ = ez - pz;
        /*
         * How far along the projectile's trajectory
         * the closest point occurs.
         */
        let t =
            toEntityX * velocityX +
            toEntityZ * velocityZ;
        /*
         * Don't predict infinitely far into the future.
         */
        const maxPredictionDistance =
            horizontalSpeed *
            DODGE_CONFIG.predictionTime;

        t = Math.max(
            0,
            Math.min(t, maxPredictionDistance)
        );
        /*
         * Closest point on the projectile's trajectory.
         */
        const closestX =
            px + velocityX * t;

        const closestZ =
            pz + velocityZ * t;


        /*
         * Distance between the entity and
         * the projectile's predicted closest point.
         */
        const closestDX =
            ex - closestX;

        const closestDZ =
            ez - closestZ;


        const closestDistance =
            Math.sqrt(
                closestDX * closestDX +
                closestDZ * closestDZ
            );
        /*
         * Projectile isn't going close enough
         * to actually threaten the entity.
         */
        if (
            closestDistance >
            DODGE_CONFIG.dodgeRadius
        ) {
            continue;
        }


        /*
         * -----------------------------------------------------
         * Calculate strafe direction
         * -----------------------------------------------------
         *
         * Rotate projectile direction 90 degrees.
         *
         * This gives us a direction perpendicular
         * to the projectile's trajectory.
         */

        let strafeX = -velocityZ;
        let strafeZ = velocityX;


        /*
         * Randomly choose left or right.
         */
        const side =
            Math.random() < 0.5
                ? -1
                : 1;


        strafeX *= side;
        strafeZ *= side;


        /*
         * Apply horizontal dodge.
         */
        entity.applyImpulse({
            x: strafeX * DODGE_CONFIG.dodgeStrength,
            y: 0,
            z: strafeZ * DODGE_CONFIG.dodgeStrength
        });


        /*
         * Start dodge cooldown.
         */
        entity.setDynamicProperty(
            "ProjectileDodgeCooldown",
            DODGE_CONFIG.cooldown
        );


        /*
         * Only dodge one projectile per check.
         */
        break;
    }
}

