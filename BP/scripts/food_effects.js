import { world, system, TicksPerSecond, EntityComponentTypes } from '@minecraft/server'

const ale = [
    'spimton:ale'
]

const wine = [
    'spimton:wine'
]

const mead = [
    'spimton:mead'
]

const cider = [
    'spimton:cider'
]

const grog = [
    'spimton:grog'
]

const vodka = [
    'spimton:vodka'
]

const beet_ale = [
    'spimton:beetroot_ale'
]

const red_rum = [
    'spimton:red_rum'
]

const dread_grog = [
    'spimton:dread_grog'
]

const egg_nog = [
    'spimton:egg_nog'
]

const poisoned_drink = [
    'spimton:poisoned_drink'
]

const gbeer = 'spimton:goblin_beer'
const spoison = 'spimton:spoison'
const vliquor = 'spimton:void_liquor'
const rwine = 'spimton:red_wine'
const wwine = 'spimton:white_wine'
const sss = 'spimton:snareling_drink'

const minuspotion = 'spimton:boosted_leaping_potion'
const ststout = 'spimton:steel_toe_stout'

const susFireres = 'spimton:canned_sus_stew_fireres'
const susNightvis = 'spimton:canned_sus_stew_nightvis'
const susBlind = 'spimton:canned_sus_stew_blindness'
const susJboost = 'spimton:canned_sus_stew_jboost'
const susNausea = 'spimton:canned_sus_stew_nausea'
const susPoison = 'spimton:canned_sus_stew_poison'
const susRegen = 'spimton:canned_sus_stew_regeneration'
const susSatur = 'spimton:canned_sus_stew_satur'
const susWeakn = 'spimton:canned_sus_stew_weakness'
const susWither = 'spimton:canned_sus_stew_wither'

const guano = 'spimton:guano'
const lead = 'spimton:lead_ingot'
const htlead = 'spimton:ht_lead_ingot'
const leadapple = 'spimton:lead_apple'
const htleadapple = 'spimton:ht_lead_apple'
const grapemust = 'spimton:grape_bottle'
const bottledtime = 'spimton:bottled_time'
const antiquecarrot = 'spimton:ancient_golden_carrot'
const radioactivebottle1 = 'spimton:radioactive_bottle'
const radioactivebottle2 = 'spimton:very_radioactive_bottle'

const randomwine = [
    "spimton:random_wine_1",
    "spimton:random_wine_2",
    "spimton:random_wine_3",
    "spimton:random_wine_4",
    "spimton:random_wine_5",
    "spimton:random_wine_6",
    "spimton:random_wine_9",
    "spimton:scrumpy_1",
    "spimton:scrumpy_2",
    "spimton:scrumpy_3",
    "spimton:random_wine_w1",
    "spimton:random_wine_w2",
    "spimton:random_wine_w3",
    "spimton:random_wine_w4",
    "spimton:random_wine_w5",
    "spimton:random_wine_f1",
    "spimton:exploded_beverage",
    "spimton:random_ale_1",
    "spimton:random_ale_2",
    "spimton:random_ale_3",
    "spimton:random_ale_4",
    "spimton:random_ale_5",
    "spimton:random_ale_6",
    "spimton:random_lager_1",
    "spimton:random_lager_2",
    "spimton:random_lager_3",
    "spimton:random_vodka",
    "spimton:crude_ale",
    "spimton:crude_vodka",
    "spimton:crude_lager"
]
///BEVERAGES///

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !ale.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 300, { amplifier: 0, showParticles: true })
    entity.addEffect('regeneration', 200, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !wine.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true })
    entity.addEffect('resistance', 200, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !mead.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true })
    entity.addEffect('strength', 200, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !cider.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true })
    entity.addEffect('saturation', 20, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !grog.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 200, { amplifier: 0, showParticles: true })
    entity.addEffect('saturation', 5, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !vodka.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 600, { amplifier: 4, showParticles: true })
    entity.addEffect('weakness', 300, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !beet_ale.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 100, { amplifier: 4, showParticles: true })
    entity.addEffect('slowness', 100, { amplifier: 0, showParticles: true })
    entity.addEffect('absorption', 200, { amplifier: 2, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !red_rum.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 200, { amplifier: 0, showParticles: true })
    entity.addEffect('blindness', 200, { amplifier: 0, showParticles: true })
    entity.addEffect('strength', 200, { amplifier: 2, showParticles: true })
    entity.setOnFire(10, true)

})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !dread_grog.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 50, { amplifier: 0, showParticles: true })
    entity.addEffect('bad_omen', 1200, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !egg_nog.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 200, { amplifier: 0, showParticles: true })
    entity.addEffect('jump_boost', 200, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !poisoned_drink.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 20000000, { amplifier: 0, showParticles: true })
    entity.addEffect('fatal_poison', 20000000, { amplifier: 2, showParticles: true })
    entity.addEffect('hunger', 20000000, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !gbeer.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true })
    entity.addEffect('speed', 400, { amplifier: 1, showParticles: true })
    entity.addEffect('hunger', 400, { amplifier: 1, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !ststout.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true })
    entity.addEffect('resistance', 400, { amplifier: 4, showParticles: true })
    entity.addEffect('slowness', 400, { amplifier: 4, showParticles: true })
})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !spoison.includes(itemStack.typeId)) return;
    entity.addEffect("instant_health", 1, { amplifier: 255, showParticles: false })
    entity.addEffect("fatal_poison", 9000000, { amplifier: 4, showParticles: false })
    entity.runCommand("scoreboard players set @s cancer 3")
})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !vliquor.includes(itemStack.typeId)) return;

    entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true })
    if (entity.hasTag("spimton:void_overdose")) {
        entity.getComponent("health").setCurrentValue(0.1)
        entity.dimension.createExplosion(entity.getHeadLocation(), 3, { breaksBlocks: false, causesFire: false })
        entity.removeTag("spimton:void_overdose")
    }
    else {

        const levels = entity.level
        let healthboost = 0
        let removelevels = 0
        for (let c = 0; c < levels; c++) {

            removelevels = removelevels + 1
            healthboost = healthboost + 1
        }

        entity.addLevels(-removelevels)
        entity.addTag("spimton:void_overdose")
        entity.runCommand(`effect @s health_boost infinite ${Math.trunc(healthboost / 2)} true`)


    };

})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !rwine.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 800, { amplifier: 0, showParticles: true })
    entity.addEffect('resistance', 400, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !sss.includes(itemStack.typeId)) return;

    let effectNumber = 0
    const effects = entity.getEffects()
    for (let co = 0; co < effects.length; co++) {
        effectNumber = effectNumber = effectNumber + 1


    }
    entity.removeTag("spimton:void_overdose")
    entity.runCommand("effect @s clear")
    entity.addLevels(effectNumber)
    entity.addEffect("nausea", effectNumber * 200, { showParticles: false })

})


world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !wwine.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 200, { amplifier: 0, showParticles: true })
    entity.addEffect('resistance', 100, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !randomwine.includes(itemStack.typeId)) return;
    const tag = itemStack.getTags()
    if (tag[0] === "spimton:red_wine") {
        Drunk(250, 0.15, 10, entity)
        entity.addEffect('nausea', 800, { amplifier: 0, showParticles: true });
    }
    if (tag[0] === "spimton:white_wine") {
        Drunk(200, 0.1, 12, entity)
        entity.addEffect('nausea', 400, { amplifier: 0, showParticles: true });
    }
    if (tag[0] === "spimton:cider") {
        Drunk(100, 0.075, 8, entity)
        entity.addEffect('nausea', 600, { amplifier: 0, showParticles: true });
    }
    if (tag[0] === "spimton:lager") {
        Drunk(100, 0.1, 15, entity)
        entity.addEffect('nausea', Math.ceil(Math.random() * 800), { amplifier: 0, showParticles: true });
    }
    if (tag[0] === "spimton:ale") {

        entity.addEffect('nausea', Math.ceil(Math.random() * 400) + 200, { amplifier: 0, showParticles: true });
    }
    if (tag[1] === "spimton:crude") {
        entity.addEffect('hunger', Math.ceil(Math.random() * 800), { amplifier: 2, showParticles: true });
    }
    switch (itemStack.typeId) {
        case "spimton:random_wine_1":
            entity.addEffect('speed', 800)
            break;
        case "spimton:random_wine_2":
            entity.addEffect('haste', 800)
            break;
        case "spimton:random_wine_3":
            entity.addEffect('hunger', 800)
            break;
        case "spimton:random_wine_4":
            entity.addEffect('strength', 800)
            break;
        case "spimton:random_wine_5":
            entity.addEffect('jump_boost', 800)
            break;
        case "spimton:random_wine_6":
            entity.addEffect('blindness', 800)
            break;
        case "spimton:random_wine_9":
            if (entity.getDynamicProperty("CanTarge") == undefined) entity.setDynamicProperty("CanTarge", 0);
            entity.setDynamicProperty("CanTarge", entity.getDynamicProperty("CanTarge") - 100)
            break;
        case "spimton:scrumpy_1":
            entity.addEffect('saturation', 400, { showParticles: false, amplifier: 4 })
            break;
        case "spimton:scrumpy_2":
            const targeE = entity.getDynamicProperty("CanTarge")
            entity.addEffect('speed', 400, { amplifier: Math.ceil(Math.abs(targeE) / 2) })
            entity.setDynamicProperty("CanTarge", 0)
            break;
        case "spimton:scrumpy_3":
            const OnFaiar = entity.getComponent("onfire").onFireTicksRemaining
            const Helto = entity.getComponent("health")
            entity.addEffect('slowness', OnFaiar, { amplifier: 1 })
            if (Helto.currentValue + (Math.floor((OnFaiar / 12.25))) > 20) Helto.resetToMaxValue()
            else Helto.setCurrentValue(Helto.currentValue + (Math.floor((OnFaiar / 12.25))));
            entity.extinguishFire(false)
            break;
        case "spimton:exploded_beverage":
            console.warn("EXPLODEEEE")
            entity.dimension.createExplosion(entity.getHeadLocation(), 4, { causesFire: true, breaksBlocks: true })
            break;
        case "spimton:random_wine_f1":
            entity.addEffect('hunger', 600, { amplifier: 1, showParticles: true });
            break;
        case "spimton:random_wine_w1":
            entity.addEffect('regeneration', 400)
            break;
        case "spimton:random_wine_w3":
            const HeltoW = entity.getComponent("health")
            const effects = entity.getEffects()
            for (const effect of effects) {
                HeltoW.setCurrentValue(HeltoW.currentValue + effect.amplifier)
            }
            break;
        case "spimton:random_wine_w4":
            entity.addEffect('jump_boost', 400)
            break;
        case "spimton:random_wine_w5":
            entity.camera.fade({ fadeColor: { red: 18 / 255, green: 52 / 255, blue: 5 / 255 }, fadeTime: { fadeInTime: 0.1, fadeOutTime: 5, holdTime: 0.1 } })
            break;
        case "spimton:random_ale_1":
            Drunk(200, 0.05, 5, entity)

            break;
        case "spimton:random_ale_2":
            Drunk(90, 0.05, Math.floor(Math.random() * 10), entity)

            break;
        case "spimton:random_ale_3":
            Drunk(105, 0.15, 8, entity)
            break;
        case "spimton:random_ale_4":
            Drunk(120, 0.1, 4, entity)
            break;
        case "spimton:random_ale_5":
            entity.addEffect("strength", 200)
            Drunk(105, 0.15, 4, entity)
            break;
        case "spimton:random_lager_1":
            entity.addEffect('jump_boost', 100, { amplifier: 2 })
            break;
        case "spimton:random_lager_2":
            entity.addEffect('regeneration', Math.floor(Math.random() * 400))
            break;
        case "spimton:random_ale_6":
            Drunk(180, 0.075, 5, entity)
            entity.addEffect("saturation", Math.floor(Math.random() * 1000))
            break;
        case "spimton:random_vodka":
            Drunk(180, 0.075, 5, entity)
            entity.addEffect("slowness", Math.floor(Math.random() * 500))
            break;

    }
})

//Drunk Manager

const DrunkPeople = new Map();

world.afterEvents.entityDie.subscribe(event => {
    const entity = event.deadEntity;

    if (entity.typeId === "minecraft:player") {
        const id = entity.id;

        if (DrunkPeople.has(id)) {
            system.clearRun(DrunkPeople.get(id));
            DrunkPeople.delete(id);
        }
    }
})






function Drunk(duration, maxPower, interval, entity) {
    let ticks = 0;

    if (DrunkPeople.has(entity.id)) {
        system.clearRun(DrunkPeople.get(entity.id));
    }


    const EffectDur = system.runInterval(() => {
        if (ticks >= duration) {
            system.clearRun(EffectDur);
            DrunkPeople.delete(entity.id)
            return;
        }
        try {
            entity.applyImpulse(RandomImpulse(maxPower, 0))
            ticks++;
        } catch (e) {
            system.clearRun(EffectDur);
            DrunkPeople.delete(entity.id);
        }
    }, Math.ceil(Math.random() * interval));

    DrunkPeople.set(entity.id, EffectDur)
}

function RandomImpulse(max, y) {
    const vector = {
        x: Math.random() > 0.5 ? Math.random() * max : Math.random() * -max,
        y: y,
        z: Math.random() > 0.5 ? Math.random() * max : Math.random() * -max
    }
    return vector;
}


/*import { world, system } from "@minecraft/server";

// Store active movement tasks per player
const activeMovements = new Map();

function movePlayerRandomly(player, durationTicks = 200) {
    let ticks = 0;

    // If already moving, stop previous one
    if (activeMovements.has(player.id)) {
        system.clearRun(activeMovements.get(player.id));
    }

    const interval = system.runInterval(() => {
        // Stop if duration reached
        if (ticks >= durationTicks) {
            system.clearRun(interval);
            activeMovements.delete(player.id);
            return;
        }

        try {
            const dx = (Math.random() - 0.5) * 2;
            const dz = (Math.random() - 0.5) * 2;

            const loc = player.location;

            player.teleport({
                x: loc.x + dx,
                y: loc.y,
                z: loc.z + dz
            }, {
                dimension: player.dimension,
                rotation: player.rotation
            });

            ticks++;
        } catch (e) {
            // Player likely invalid (dead/despawned)
            system.clearRun(interval);
            activeMovements.delete(player.id);
        }

    }, 1);

    activeMovements.set(player.id, interval);
}

// Chat trigger
world.beforeEvents.chatSend.subscribe((event) => {
    if (event.message === "!randommove") {
        movePlayerRandomly(event.sender, 200);
    }
});

// Stop movement when player dies
world.afterEvents.entityDie.subscribe((event) => {
    const entity = event.deadEntity;

    if (entity.typeId === "minecraft:player") {
        const id = entity.id;

        if (activeMovements.has(id)) {
            system.clearRun(activeMovements.get(id));
            activeMovements.delete(id);
        }
    }
});*/


///CANNED FOOD///

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susFireres.includes(itemStack.typeId)) return;
    entity.addEffect('fire_resistance', 60, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susNightvis.includes(itemStack.typeId)) return;
    entity.addEffect('night_vision', 100, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susBlind.includes(itemStack.typeId)) return;
    entity.addEffect('blindness', 140, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susJboost.includes(itemStack.typeId)) return;
    entity.addEffect('jump_boost', 100, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susNausea.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 140, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susPoison.includes(itemStack.typeId)) return;
    entity.addEffect('poison', 220, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susRegen.includes(itemStack.typeId)) return;
    entity.addEffect('regeneration', 140, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susSatur.includes(itemStack.typeId)) return;
    entity.addEffect('saturation', 6, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susWeakn.includes(itemStack.typeId)) return;
    entity.addEffect('weakness', 140, { amplifier: 0, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !susWither.includes(itemStack.typeId)) return;
    entity.addEffect('wither', 140, { amplifier: 0, showParticles: true })
})

///OTHER///

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !minuspotion.includes(itemStack.typeId)) return;
    entity.addEffect('jump_boost', 300, { amplifier: 255, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !guano.includes(itemStack.typeId)) return;
    entity.addEffect('nausea', 100, { amplifier: 9, showParticles: true })
    entity.addEffect('hunger', 100, { amplifier: 9, showParticles: true })
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !lead.includes(itemStack.typeId)) return;
    entity.applyDamage(20)
    entity.runCommand('effect @s nausea infinite 1 true')
    entity.runCommand('effect @s weakness infinite 1 true')
    entity.runCommand('effect @s slowness infinite 1 true')
    entity.runCommand('effect @s poison infinite 1 true')
})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !htlead.includes(itemStack.typeId)) return;
    entity.applyDamage(40)
    entity.runCommand('effect @s nausea infinite 9 true')
    entity.runCommand('effect @s weakness infinite 9 true')
    entity.runCommand('effect @s slowness infinite 9 true')
    entity.runCommand('effect @s fatal_poison infinite 255 true')

})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !leadapple.includes(itemStack.typeId)) return;
    entity.runCommand('effect @s nausea 60 1 true')
    entity.runCommand('effect @s weakness 60 2 true')
    entity.runCommand('effect @s slowness 60 2 true')
    entity.runCommand('effect @s poison 60 5 true')

})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !htleadapple.includes(itemStack.typeId)) return;
    entity.runCommand('effect @s nausea infinite 5 true')
    entity.runCommand('effect @s weakness infinite 3 true')
    entity.runCommand('effect @s slowness infinite 3 true')
    entity.runCommand('effect @s fatal_poison infinite 11 true')

})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !grapemust.includes(itemStack.typeId)) return;
    entity.addEffect("instant_health", 1)
    entity.removeEffect("weakness")
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !bottledtime.includes(itemStack.typeId)) return;
    entity.runCommand("scoreboard objectives add pharaohcursespimton dummy")
    entity.runCommand("execute if @s[scores={spimton:sandals=1}] runscoreboard players add @s pharaohcursespimton 400")
})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !antiquecarrot.includes(itemStack.typeId)) return;
    entity.addEffect("speed", 600, { amplifier: 1 })
    entity.addEffect("night_vision", 600, { amplifier: 1 })
    entity.addEffect("strength", 600, { amplifier: 1 })
    entity.addEffect("jump_boost", 600, { amplifier: 1 })

})

world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !radioactivebottle1.includes(itemStack.typeId)) return;
    entity.applyDamage(1225, { cause: "wither" })
})
world.afterEvents.itemCompleteUse.subscribe(event => {
    const { source: entity, itemStack } = event
    if (entity.typeId !== "minecraft:player" || !itemStack || !radioactivebottle2.includes(itemStack.typeId)) return;
    entity.applyDamage(1997, { cause: "wither" })
})



