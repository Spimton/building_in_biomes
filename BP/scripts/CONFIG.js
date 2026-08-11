//Configuration variables

export const ConfigItems = {
    repairGauntlet: -5, //Default -5
    repairRoyalSpear: -3, //Default -3
    championLeggingsKBX: 2,
    championLeggingsKBY: -0.5,
    championBootsKBX: 0.1,
    championBootsKBY: 1,
    steelTargeSpeed: 1.225,
    steelTargeDash: 10,
    goldTargeSpeed: 0.67,
    goldTargeDash: 5,
    chargeTargeSpeed: 0.15,
    chargeTargeDashHit: 2,
    chargeTargeKnockbackXZ: 2,
    chargeTargeKnockbackY: 0.5,
    chargeTargeDamage: 5,
    sunTargeSpeed: 0.2,
    sunTargeDash: 1,
    chargeTarge2Speed: 0.25,
    chargeTarge2DashHit: 30,
    chargeTarge2KnockbackXZ: 2,
    chargeTarge2KnockbackY: 1,
    chargeTarge2Damage: 10,
    steelTargeReduction: 0.8,
    goldTargeReduction: 0.6,
    chargeTargeReduction: 0.7,
    chargeTargeDashHurt: 20,
    sunTargeReduction: 0.5,
    sunTargeSetonFire: 5,
    sunTargeFireDash: 10,
    chargeTarge2Reduction: 0.3,
    chargeTarge2DashHurt: 10,
    chargeTarge2KnockbackHurtXZ: 1.65,
    chargeTarge2KnockbackHurtY: 0.3,
    tastyBoneDamage: 1,
    tastyBoneWolves: 3,
    imperialSpearDur: 75,
    imperialSpearAmp: 1,
    agoSpearDur: 5,
    chronosStaffMod: 20,
    splosionStaffChance: 0.5,
    meatMalletChance: 0.6,
    platinumGauntletStrongBlast: 4,
    platinumGauntletBlast: 2,
    platinumGauntletDurabilityLoss: 10,
    championChestplateKnockback: -3,
    championChestplateDamage: 5,
    championHelmetKnockback: 1,
    championHelmetDamage: 5,
    antiqueAllyChance: 0.6,
    nethengeicAllyChance: 0.6,
    celerityGauntletDamageB: 50,
    celerityGauntletKHoriz: 2.5,
    celerityGauntletKVert: 0.5,
    celerityGauntletDamage: 10,
    celerityGauntletKHorizB: -2.5,
    celerityGauntletKVertB: 0.35,
    blackKnife: {
        attack1: {
            duarbility: 9,
            cooldown: 47,
            knockbackXZ: 5,
            knockbackY: 0.15
        },
        attack2: {
            teleport: 20,
            cooldown: 201,
            durability: 33
        },
        attack3: {
            range: 6,
            damage: 12,
            cooldown: 102,
            durability: 6
        },
        attack4: {
            range: 12,
            damage: 6,
            cooldown: 102,
            durability: 6
        },
        attack5: {
            cooldown: 66,
            durability: 3
        },
        attack6: {
            cooldown: 660,
            durability: 66,
            teleport: 15
        },
        hpDamage: 0.066,
        erasePrc: 0.33,
        eraseDur: 666,
        eraseHealth: 167,
        eraseDamage: 66
    },
    krisMult: 30,
    silverSwordDamage: 12,
    darkenedSlicerMult: 0.9,
    blackKrisMult: 2.5,
    antiqueAllyHit: 0.35,
    nethengeicAllyHit: 0.35,
    guretozawordo: {
        metallicore: {
            effectDuration: 300,
            cooldown: 13,
            damageApplied: 1.997,
            treshold: 10,
            killAmp: 5
        },
        baleful: {
            effectDuration: 300,
            fireDuration: 5,
            cooldown: 13,
            damageApplied: 1.997,
            treshold: 10,
            killRange: 12.25,
            killRed: 20

        }
    },
    spear: {
        whispering: {
            killcount: 12,
            freezingDamage: 6,
            proceedTreshold: 0.1225,
            proceedDamage: 19.97
        },
        luck: {
            killcount: 8,
            pluckTreshold: 0.1997,
            pluckDamage: 21,
            luckChance: 40
        }
    },
    soulArtifacts: {
        solSwordMult: 0.66,
        maxSouls: 50,
        healtMod: 10,
        harvester: {
            defaultSouls: 10,
            damageScale: 20,
            rangeScale: 0.3,
            rangeAdd: 3,
            defaultRange: 6,
            defaultDamage: 10,
            defaultScale: 1.225
        },
        materializer: {
            defaultSouls: 10,
            bridgeScale: 2,
            defaultLength: 20
        },
        soulHealer: {
            defaultSouls: 10,
            rangeScale: 0.6,
            healScale: 1.997,
            healLScale: 1.225,
            defaultDistance: 6,
            defaultHeal: 10,
            defaultHealL: 10
        },
        shadowShifter: {
            defaultSouls: 10,
            defaultDistance: 10,
            defaultDur: 10,
            durMod: 30
        }
    },
    justiceHammer: {
        blastMultiplier: 1 / 20,
        cooldownMult: 0.75,
        cooldownBase: 1.225,
        blastGrief: true,
        speedBase: 0,
        speedMod: 1.997,
        blastRadius: 1.225,
        minimumUseTicks: 5
    },
    meatMalletAccept: []


}


export const ConfigEntity = {
    weeperConfig: {
        damageCap: 30,
        phase1Height: 12,
        phase2Height: 4,
        fotnsPercDamage: 0.1997,
        electricArmorReduction: 1.997,
        damageCapBypassSource: [
            "none",
            "override",
            "void",
            "selfDestruct"
        ],
        initialExplosionRadius: 12.25,
        powerupRate: 4,
        forceTransitionDamage: 45,
        fotnsBaseRadius: 6,
        fotnsRadiusMult: 0.33,
        fotnsDamageMult: 0.5,
        arrivederciCount: 4,
        arrivederciDist: 0.8,
        jaronaSpeed: 0.1997,
        jaronaDuration: 20,
        jaronaDamage: 18,
        shockwaveBaseRadius: 6.6,
        shockwaveRadiusMultiplier: 0.1997,
        shockwaveBaseDamage: 19.97,
        shockwaveDamageMultiplier: 6.6,
        shochwaveDistanceDamageModifier: 0.01225,
        shockwaveDistanceKnockbackModifier: 2,
        creeperDamageMultiplier: 5,
        creepieDamageMultiplier: 1



    },
    archshamanConfig: {
        maxRandomBayRadius: 32,
        randomBayInterval: 20,
        minRandomBayRadius: 8,
        archieFogRange: 64
    }
}