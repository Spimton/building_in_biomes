import { world, system, EquipmentSlot, ItemStack, Player, EntityComponentTypes, EffectTypes } from '@minecraft/server'


system.runInterval(applen_armor_set, 20);
system.runInterval(templar_armor_set, 1);
system.runInterval(ghostly_necklace, 1);
system.runInterval(bulwark, 20);
system.runInterval(poison, 200);
system.runInterval(luxxury, 100);
system.runInterval(mike, 80);
system.runInterval(sandals, 1);
system.runInterval(unbreakable_set, 20);

function applen_armor_set() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const headEquipment = equipment.getEquipment("Head");
        const chestEquipment = equipment.getEquipment("Chest");
        const legsEquipment = equipment.getEquipment("Legs");
        const feetEquipment = equipment.getEquipment("Feet");

        const hasHeadEquipment = headEquipment?.typeId === "spimton:applen_helmet";
        const hasChestEquipment = chestEquipment?.typeId === "spimton:applen_chestplate";
        const hasLegsEquipment = legsEquipment?.typeId === "spimton:applen_leggings";
        const hasFeetEquipment = feetEquipment?.typeId === "spimton:applen_boots";
        const chestImm = chestEquipment?.typeId === "spimton:champion_chestplate";

        if (hasFeetEquipment && hasLegsEquipment && hasChestEquipment && hasHeadEquipment) {
            player.runCommand(`effect @s saturation 10 0 true`);
        }
    }
}

function unbreakable_set() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const headEquipment = equipment.getEquipment("Head");
        const chestEquipment = equipment.getEquipment("Chest");
        const legsEquipment = equipment.getEquipment("Legs");

        const hasHeadEquipment = headEquipment?.typeId === "spimton:unbreakable_tiara";
        const hasChestEquipment = chestEquipment?.typeId === "spimton:unbreakable_necklace";
        const hasLegsEquipment = legsEquipment?.typeId === "spimton:unbreakable_leggings";
        const health = player.getComponent("minecraft:health");
        const curh = health.currentValue
        const maxh = health.effectiveMax
        if (maxh / curh > 2 && hasHeadEquipment) {
            player.addEffect("strength", 21, { showParticles: false, amplifier: 0 })
        };
        if (maxh / curh > 2 && hasChestEquipment) {
            player.addEffect("resistance", 21, { showParticles: false, amplifier: 0 })
        };
        if (maxh / curh > 2 && hasLegsEquipment) {
            player.addEffect("speed", 21, { showParticles: false, amplifier: 0 })
        };
        if (maxh / curh > 2 && hasHeadEquipment && hasChestEquipment && hasLegsEquipment) {
            player.addEffect("fire_resistance", 21, { showParticles: false, amplifier: 0 })
        };
    }
}





function templar_armor_set() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const headEquipment = equipment.getEquipment("Head");
        const chestEquipment = equipment.getEquipment("Chest");
        const legsEquipment = equipment.getEquipment("Legs");
        const feetEquipment = equipment.getEquipment("Feet");

        const hasHeadEquipment = headEquipment?.typeId === "spimton:jade_helmet";
        const hasChestEquipment = chestEquipment?.typeId === "spimton:jade_chestplate";
        const hasLegsEquipment = legsEquipment?.typeId === "spimton:jade_leggings";
        const hasFeetEquipment = feetEquipment?.typeId === "spimton:jade_boots";

        if (hasFeetEquipment && hasLegsEquipment && hasChestEquipment && hasHeadEquipment) {
            player.runCommand(`effect @s clear poison`);
            player.runCommand(`effect @s clear wither`);
            player.runCommand(`effect @s clear fatal_poison`);
        }
    }
}

function ghostly_necklace() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Chest");
        const hasEquipment = Equipment?.typeId === "spimton:ghostly_necklace";

        if (hasEquipment && player?.isSneaking) {
            player.runCommand(`execute at @p run fill ~1 ~-1 ~1 ~-1 ~-1 ~-1 spimton:ecto_block_plat replace air`);
        }
    }
}

function sandals() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Feet");
        const hasEquipment = Equipment?.typeId === "spimton:sandals";

        if (hasEquipment) {
            player.runCommand("scoreboard players set @s spimton:sandals 1");
        }
        else player.runCommand("scoreboard players set @s spimton:sandals 0");
    }
}
function bulwark() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Offhand");
        const hasEquipment = Equipment?.typeId === "spimton:totem_of_bulwark";
        const hasAbsorption = player.getEffect("absorption")

        if (hasEquipment && (hasAbsorption === undefined)) {
            player.addEffect("absorption", 19, { showParticles: false })
        }
    }
}
function poison() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Offhand");
        const hasEquipment = Equipment?.typeId === "spimton:totem_of_poison";

        if (hasEquipment) {
            player.runCommand("effect @e[r=15] poison 5 3")
            player.removeEffect("poison")
            player.runCommand("particle spimton:poisson ~ ~0.5 ~")
            player.playSound("mob.zombie.unfect")
        }
    }
}
function luxxury() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Offhand");
        const hasEquipment = Equipment?.typeId === "spimton:totem_of_luxury";

        if (hasEquipment) {
            const vaule = Math.random()
            if (vaule < 0.2) {
                player.runCommand('give @s gold_ingot')
            }
            else if (vaule < 0.35 && vaule >= 0.2) {
                player.runCommand('give @s spimton:jade')
            }
            else if (vaule < 0.5 && vaule >= 0.35) {
                player.runCommand('give @s lapis_lazuli')
            }
            else if (vaule < 0.55 && vaule >= 0.5) {
                player.runCommand('give @s spimton:imperial_jade')
            }
            else if (vaule < 0.65 && vaule >= 0.6) {
                player.runCommand('give @s diamond')
            }
            else if (vaule < 0.85 && vaule >= 0.65) {
                player.runCommand('give @s emerald')
            }
            else if (vaule < 0.9 && vaule >= 0.85) {
                player.runCommand('give @s spimton:silver_ingot')
            }
            else {
                player.runCommand('give @s spimton:guano')
                if (Math.random() > 0.35) player.runCommand('title @p actionbar Womp Womp lil bro, u got scammed')
            }
        }
    }
}
function mike() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Offhand");
        const hasEquipment = Equipment?.typeId === "spimton:totem_of_combustion";

        if (hasEquipment && player?.isSneaking) {
            player.runCommand('summon tnt ~3 ~ ~3')
            player.runCommand('summon tnt ~3 ~ ~')
            player.runCommand('summon tnt ~3 ~ ~-3')
            player.runCommand('summon tnt ~-3 ~ ~3')
            player.runCommand('summon tnt ~-3 ~ ~-3')
            player.runCommand('summon tnt ~-3 ~ ~')
            player.runCommand('summon tnt ~ ~ ~3')
            player.runCommand('summon tnt ~ ~ ~-3')
        }
    }
}



system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:applen', {
        onHitEntity({ attackingEntity, source, block, entity }) {

            attackingEntity.runCommand('effect @s saturation 1 0 true')

        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:applent', {
        onMineBlock({ source }) {
            source.runCommand('effect @p saturation 1 0 true')
        }
    })
})

world.afterEvents.projectileHitEntity.subscribe(aaaa => {
    const hited = aaaa.getEntityHit().entity
    if (aaaa.projectile.typeId === "spimton:lead_bolt") {
        if (hited.typeId == "minecraft:iron_golem") {
            hited.addEffect("instant_damage", 20, { amplifier: 2 })
        }
        hited.addEffect("slowness", 100, { showParticles: false, amplifier: 1 })
        hited.addEffect("poison", 100, { showParticles: false, amplifier: 1 })
    }
    else if (aaaa.projectile.typeId === "spimton:lead_bolt_ht") {
        if (hited.typeId == "minecrafy:iron_golem") {
            hited.addEffect("instant_damage", 20, { amplifier: 3 })
        }
        hited.addEffect("slowness", 500, { showParticles: false, amplifier: 3 })
        hited.addEffect("fatal_poison", 500, { showParticles: false, amplifier: 3 })
    }
})