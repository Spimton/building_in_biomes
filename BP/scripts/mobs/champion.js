import { world, system, EntityComponentTypes, EntityProjectileComponent, CustomCommandParamType, CommandPermissionLevel, CustomCommandError, CustomCommandStatus, GameMode } from '@minecraft/server'
import { ConfigEntity } from "../CONFIG.js";

export const ChampConfig = ConfigEntity.championConfig;

export function resolveRangedDamage(damage, distance, Config) {
    const { rangedReductionMinimumDistance,
        rangedReductionMinimumDamage,
        rangedReductionMinimumMultiplier,
        rangedReductionPerBlock,
        rangedDamageMinimumMultiplierAllow,
        proportionalReduction,
        rangedSubtractionPerBlock
    } = Config;
    let newDamage = damage;
    if (distance > rangedReductionMinimumDistance) {
        let MultiplierDist = distance - rangedReductionMinimumDistance;
        let Multiplier = MultiplierDist * rangedReductionPerBlock;
        if (Multiplier > 1 - rangedReductionMinimumMultiplier && rangedDamageMinimumMultiplierAllow) Multiplier = 1 - rangedReductionMinimumMultiplier;

        if (proportionalReduction) newDamage = damage * (1 - Multiplier)
        else newDamage = damage - (MultiplierDist * rangedSubtractionPerBlock);

        if (newDamage < rangedReductionMinimumDamage) {
            if (damage < rangedReductionMinimumDamage) newDamage = damage
            else newDamage = rangedReductionMinimumDamage;
        };


    };
    console.warn("§cOld Damage: ", damage, " §aNew Damage: ", newDamage, " §1Distance: ", distance, "§r")
    return newDamage;
}