import { world, system, WeatherType, ItemStack, EquipmentSlot, GameMode, GameRule, BlockPermutation, InputInfo, EntityHealthComponent, EntityComponentTypes, EntityDamageCause } from '@minecraft/server'
import { updateItemDurability } from "../folder2/updateDurability.js";


system.runInterval(celerity, 20);

system.runInterval(championship, 1);
system.runInterval(championshipb, 1);
system.runInterval(targe, 1);
system.runInterval(royalspear, 20);

function celerity() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Mainhand");
        const hasEquipment = Equipment?.typeId === "spimton:celerity_gauntlet";
        const EqAlt = Equipment?.typeId === "spimton:platinum_gauntlet";
        const EqAlt2 = Equipment?.typeId === "spimton:justice_hammer";
        if (hasEquipment || EqAlt || EqAlt2) {
            updateItemDurability(player, Equipment, -5, EquipmentSlot.Mainhand)
        }
    }
}
function royalspear() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const Equipment = equipment.getEquipment("Mainhand");
        const hasEquipment = Equipment?.typeId === "spimton:ancient_gold_spear";
        if (hasEquipment) {
            updateItemDurability(player, Equipment, -3, EquipmentSlot.Mainhand)
        }
    }
}
function championship() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const snek = player?.isSneaking
        const wiew = player.getViewDirection()
        const fallgays = player?.isFalling
        const Equipmentb = equipment.getEquipment("Feet");
        const Equipment = equipment.getEquipment("Legs");
        const hasEquipment = Equipment?.typeId === "spimton:champion_leggings";
        const hasEquipmentb = Equipmentb?.typeId === "spimton:champion_boots";
        if (hasEquipment && fallgays && !snek) {
            player.applyKnockback({ x: wiew.x * 2, z: wiew.z * 2 }, -0.5)
            player.addTag("champioon")
            player.runCommand("damage @e[r=2,tag=!champioon] 3 entity_attack entity @s")
            player.removeTag("champioon")
            player.addEffect("resistance", 2, { amplifier: 5, showParticles: false })
        }
    }
}


function targe() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const MainhandEq = equipment.getEquipment("Mainhand");
        const OffhandEq = equipment.getEquipment("Offhand");
        const OffhandTarge1 = OffhandEq?.typeId === "spimton:steel_shield";
        const MainhandTarge1 = MainhandEq?.typeId === "spimton:steel_shield";
        const OffhandTarge2 = OffhandEq?.typeId === "spimton:gold_shield";
        const MainhandTarge2 = MainhandEq?.typeId === "spimton:gold_shield";
        const OffhandTarge3 = OffhandEq?.typeId === "spimton:charge_shield";
        const MainhandTarge3 = MainhandEq?.typeId === "spimton:charge_shield";
        const MainhandTarge4 = MainhandEq?.typeId === "spimton:ancient_gold_shield";
        const OffhandTarge4 = OffhandEq?.typeId === "spimton:ancient_gold_shield";
        const OffhandTarge5 = OffhandEq?.typeId === "spimton:charge_shield_td";
        const MainhandTarge5 = MainhandEq?.typeId === "spimton:charge_shield_td";


        const wiw = player.getViewDirection()
        let Dash = player.getDynamicProperty("CanTarge");
        if (OffhandTarge1 || MainhandTarge1) {
            const velocity = player.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            const isMovingHorizontally = speed > 0.01;
            const isOnGround = player.isOnGround;
            const isSprinting = player.isSprinting;
            if (isMovingHorizontally && isOnGround && player?.isSneaking) {
                if (Dash == undefined) player.setDynamicProperty("CanTarge", 0);
                if (Dash > 0) {
                    console.warn("Nodash")
                    player.setDynamicProperty("CanTarge", Dash - 1)
                }
                else {
                    player.applyImpulse({ x: wiw.x * 1.225, z: wiw.z * 1.225, y: 0.001 })
                    player.setDynamicProperty("CanTarge", Dash + 10)
                    console.warn("Dash")
                };


            }
        }
        if (OffhandTarge2 || MainhandTarge2) {
            const velocity = player.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            const isMovingHorizontally = speed > 0.01;
            const isOnGround = player.isOnGround;
            const isSprinting = player.isSprinting;
            if (isMovingHorizontally && isOnGround && player?.isSneaking) {
                if (Dash == undefined) player.setDynamicProperty("CanTarge", 0);
                if (Dash > 0) {
                    console.warn("Nodash")
                    player.setDynamicProperty("CanTarge", Dash - 1)
                }
                else {
                    player.applyImpulse({ x: wiw.x * 0.67, z: wiw.z * 0.67, y: 0.001 })
                    player.setDynamicProperty("CanTarge", Dash + 5)
                    console.warn("Dash")
                };


            }
        }
        if (OffhandTarge3 || MainhandTarge3) {
            const velocity = player.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            const isMovingHorizontally = speed > 0.01;
            const isOnGround = player.isOnGround;
            const isSprinting = player.isSprinting;
            if (isMovingHorizontally && isOnGround && player?.isSneaking) {
                if (Dash == undefined) player.setDynamicProperty("CanTarge", 0);
                if (Dash > 0) {
                    console.warn("Nodash")
                    player.setDynamicProperty("CanTarge", Dash - 1)
                }
                else {
                    player.addTag("spimton:charget")
                    const ww = player.getViewDirection()
                    player.applyImpulse({ x: wiw.x * 0.15, z: wiw.z * 0.15, y: 0.01 })
                    const enities = player.dimension.getEntities({ location: player.getHeadLocation(), excludeFamilies: ["inanimate"], excludeTags: ["spimton:charget"], maxDistance: 2, minDistance: 0 });
                    for (const entity of enities) {
                        entity.applyKnockback({ x: ww.x * 2, z: ww.z * 2 }, 0.5)
                        entity.applyDamage(5, { cause: EntityDamageCause.entityAttack, damagingEntity: player })
                        player.setDynamicProperty("CanTarge", Dash - 2)

                    };
                    player.removeTag("spimton:charget")
                    console.warn("Dash")
                };


            }
        }
        if (OffhandTarge4 || MainhandTarge4) {
            const velocity = player.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            const isMovingHorizontally = speed > 0.01;
            const isOnGround = player.isOnGround;
            const isSprinting = player.isSprinting;
            if (isMovingHorizontally && isOnGround && player?.isSneaking) {
                if (Dash == undefined) player.setDynamicProperty("CanTarge", 0);
                if (player.getComponent("onfire").onFireTicksRemaining > 0) {
                    player.applyImpulse({ x: wiw.x * 0.2, z: wiw.z * 0.2, y: 0.001 })
                    player.setDynamicProperty("CanTarge", Dash + 1)
                    console.warn("Dash")
                }
                else {

                };


            }
        }
        if (OffhandTarge5 || MainhandTarge5) {
            const velocity = player.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
            const isMovingHorizontally = speed > 0.01;
            const isOnGround = player.isOnGround;
            const isSprinting = player.isSprinting;
            if (isMovingHorizontally && isOnGround && player?.isSneaking) {
                if (Dash == undefined) player.setDynamicProperty("CanTarge", 0);
                if (Dash > 0) {
                    console.warn("Nodash")
                    player.setDynamicProperty("CanTarge", Dash - 1)
                }
                else {
                    player.addTag("spimton:charget")
                    const ww = player.getViewDirection()
                    player.applyImpulse({ x: wiw.x * 0.25, z: wiw.z * 0.25, y: 0.01 })
                    const enities = player.dimension.getEntities({ location: player.getHeadLocation(), excludeFamilies: ["inanimate"], excludeTags: ["spimton:charget"], maxDistance: 2, minDistance: 0 });
                    for (const entity of enities) {
                        entity.applyKnockback({ x: ww.x * 2, z: ww.z * 2 }, 1)
                        entity.applyDamage(10, { cause: EntityDamageCause.entityAttack, damagingEntity: player })
                        player.clearVelocity()
                        player.setDynamicProperty("CanTarge", Dash + 30)

                    };
                    player.removeTag("spimton:charget")
                    console.warn("Dash")
                };


            }
        };


    };
}

world.afterEvents.entityHurt.subscribe(event => {
    const entity = event.hurtEntity
    const damage = event.damage
    const hiter = event.damageSource.damagingEntity
    if (!hiter) return;
    const equipment = entity.getComponent("equippable")
    const hasAbsorption = entity.getEffect("absorption");
    const MainhandEq = equipment.getEquipment("Mainhand");
    const OffhandEq = equipment.getEquipment("Offhand");
    const OffhandTarge1 = OffhandEq?.typeId === "spimton:steel_shield";
    const OffhandTarge2 = OffhandEq?.typeId === "spimton:gold_shield";
    const MainhandTarge1 = MainhandEq?.typeId === "spimton:steel_shield";
    const MainhandTarge2 = MainhandEq?.typeId === "spimton:gold_shield";
    const MainhandTarge3 = MainhandEq?.typeId === "spimton:charge_shield";
    const OffhandTarge3 = OffhandEq?.typeId === "spimton:charge_shield";
    const MainhandTarge4 = MainhandEq?.typeId === "spimton:ancient_gold_shield";
    const OffhandTarge4 = OffhandEq?.typeId === "spimton:ancient_gold_shield";
    const MainhandTarge5 = MainhandEq?.typeId === "spimton:charge_shield_td";
    const OffhandTarge5 = OffhandEq?.typeId === "spimton:charge_shield_td";

    if (OffhandTarge1 || MainhandTarge1) {
        if (entity?.isSneaking) {
            entity.dimension.playSound("item.shield.block", entity.getHeadLocation())
            const h = entity.getComponent("health")
            if (hasAbsorption === undefined) {
                h.setCurrentValue(h.currentValue + (damage * 0.8))
            };
            entity.clearVelocity();

            if (MainhandTarge1 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = MainhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, MainhandEq, Math.ceil(damage * 0.4), EquipmentSlot.Mainhand)
            }
            else if (OffhandTarge1 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = OffhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, OffhandEq, Math.ceil(damage * 0.4), EquipmentSlot.Offhand)
            };
        }

    }
    if (OffhandTarge2 || MainhandTarge2) {
        if (entity?.isSneaking) {
            entity.dimension.playSound("item.shield.block", entity.getHeadLocation())

            const h = entity.getComponent("health")
            if (hasAbsorption === undefined) {
                h.setCurrentValue(h.currentValue + (damage * 0.6))
            };
            entity.clearVelocity();

            if (MainhandTarge2 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = MainhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, MainhandEq, Math.ceil(damage * 0.3), EquipmentSlot.Mainhand)
            }
            else if (OffhandTarge2 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = OffhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, OffhandEq, Math.ceil(damage * 0.3), EquipmentSlot.Offhand)
            };
        }

    }
    if (OffhandTarge3 || MainhandTarge3) {
        if (entity?.isSneaking) {
            entity.dimension.playSound("item.shield.block", entity.getHeadLocation())
            if (entity.getDynamicProperty("CanTarge") == undefined) player.setDynamicProperty("CanTarge", 0);
            const h = entity.getComponent("health")
            if (hasAbsorption === undefined) {
                h.setCurrentValue(h.currentValue + (damage * 0.7))
            };
            entity.setDynamicProperty("CanTarge", entity.getDynamicProperty("CanTarge") + 20)

            if (MainhandTarge3 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = MainhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, MainhandEq, Math.ceil(damage * 0.35), EquipmentSlot.Mainhand)
            }
            else if (OffhandTarge3 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = OffhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, OffhandEq, Math.ceil(damage * 0.35), EquipmentSlot.Offhand)
            };
        }

    }
    if (OffhandTarge4 || MainhandTarge4) {
        if (entity?.isSneaking) {
            entity.dimension.playSound("item.shield.block", entity.getHeadLocation())
            if (entity.getDynamicProperty("CanTarge") == undefined) player.setDynamicProperty("CanTarge", 0);
            const h = entity.getComponent("health")
            if (hasAbsorption === undefined) {
                h.setCurrentValue(h.currentValue + (damage * 0.5))
            };
            if (entity.getDynamicProperty("CanTarge") <= 0) {
                entity.setOnFire(2.5, false)
                entity.setDynamicProperty("CanTarge", entity.getDynamicProperty("CanTarge") + 2)
            }
            else {
                hiter.setOnFire(5, false)
                entity.setDynamicProperty("CanTarge", entity.getDynamicProperty("CanTarge") - 10)
            };
            if (MainhandTarge4 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = MainhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, MainhandEq, Math.ceil(damage * 0.25), EquipmentSlot.Mainhand)
            }
            else if (OffhandTarge4 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = OffhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, OffhandEq, Math.ceil(damage * 0.25), EquipmentSlot.Offhand)
            };
        }

    }
    if (OffhandTarge5 || MainhandTarge5) {
        if (entity?.isSneaking) {
            entity.dimension.playSound("item.shield.block", entity.getHeadLocation())
            if (entity.getDynamicProperty("CanTarge") == undefined) player.setDynamicProperty("CanTarge", 0);
            const h = entity.getComponent("health")
            if (hasAbsorption === undefined) {
                h.setCurrentValue(h.currentValue + (damage * 0.3))
            };
            entity.setDynamicProperty("CanTarge", entity.getDynamicProperty("CanTarge") - 10)
            entity.applyKnockback({ x: entity.getViewDirection().x * 1.67, z: entity.getViewDirection().z * 1.67 }, 0.3)
            hiter.applyDamage(damage, { damagingEntity: entity, cause: EntityDamageCause.entityAttack })
            hiter.applyKnockback({ x: entity.getViewDirection().x * 1.77, z: entity.getViewDirection().z * 1.77 }, 0.3);

            if (MainhandTarge5 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = MainhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, MainhandEq, Math.ceil(damage * 0.35), EquipmentSlot.Mainhand)
            }
            if (OffhandTarge5 && !entity.matches({ gameMode: GameMode.Creative })) {
                const itemEnchantmentComp = OffhandEq.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                updateItemDurability(entity, OffhandEq, Math.ceil(damage * 0.35), EquipmentSlot.Offhand)
            };
        }

    };



})



function championshipb() {
    const players = world.getPlayers();
    for (const player of players) {
        const equipment = player.getComponent("equippable");

        if (equipment == null) {

            continue;
        }
        const { x, y, z } = player.getHeadLocation()
        const viktor = { x: x, y: y - 1, z: z }
        const wiew = player.getViewDirection()
        const block = player.dimension.getBlock(viktor)
        const aer = block.below(1).isAir
        const Equipmentb = equipment.getEquipment("Feet");
        const hasEquipmentb = Equipmentb?.typeId === "spimton:champion_boots";
        if (hasEquipmentb && player?.isJumping && player?.isSneaking) {
            if (aer == false) {
                player.applyKnockback({ x: wiew.x * 0.1, z: wiew.z * 0.1 }, 1)
                player.addEffect("resistance", 30, { amplifier: 5, showParticles: false })
            }
        }
    }
}
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:goodboy', {
        onUse: arg => {
            const sauce = arg.source
            const item = arg.itemStack
            if (sauce.matches({ gameMode: GameMode.Survival }) || sauce.matches({ gameMode: GameMode.Adventure })) updateItemDurability(sauce, item, 1, EquipmentSlot.Mainhand)
            const wolf = sauce.dimension.spawnEntity("minecraft:wolf", sauce.location);
            const wolf2 = sauce.dimension.spawnEntity("minecraft:wolf", sauce.location);
            const wolf3 = sauce.dimension.spawnEntity("minecraft:wolf", sauce.location);
            wolf.triggerEvent("minecraft:spawn_wild_rusty");
            wolf2.triggerEvent("minecraft:spawn_wild_rusty");
            wolf3.triggerEvent("minecraft:spawn_wild_rusty");
            // Tame the wolf to the player
            const tameable = wolf.getComponent("minecraft:tameable");
            const tameable2 = wolf2.getComponent("minecraft:tameable");
            const tameable3 = wolf3.getComponent("minecraft:tameable");
            tameable.tame(sauce);
            tameable2.tame(sauce);
            tameable3.tame(sauce);

        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:ham_dur', {
        onUseOn: arg => {
            let source = arg.source
            let item = arg.itemStack
            if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:impspear', {
        onHitEntity: arg => {
            let hited = arg.hitEntity
            hited.addEffect('poison', 75, { amplifier: 1 })
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:agospear', {
        onHitEntity: arg => {
            let hited = arg.hitEntity
            hited.setOnFire(5, true)
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:chronos_staff', {
        onUse: arg => {
            let source = arg.source
            let ticks = world.gameRules.randomTickSpeed


            if (source?.isSneaking) {
                source.runCommand(`execute if entity @e[type=spimton:jojoref_friendly] run gamerule randomtickspeed ${ticks / 20}`)
                source.runCommand('kill @e[type=spimton:jojoref_friendly]')
                let item = arg.itemStack

                updateItemDurability(source, item, 1, EquipmentSlot.Mainhand);
            }
            else {

                source.runCommand(`execute unless entity @e[type=spimton:jojoref_friendly] run gamerule randomtickspeed ${ticks * 20}`)
                source.runCommand('kill @e[type=spimton:jojoref_friendly]')
                source.playSound('ambient.weather.lightning.impact')
                source.runCommand('summon spimton:jojoref_friendly')
                source.extinguishFire(true)
                source.runCommand('tellraw @a {"rawtext": [{"translate": "§f<%%1> Made in Heaven!", "with":{"rawtext": [{"selector":"@p"}]}}]}')

            }
        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:michael_staff', {
        onUse: arg => {
            const mR = Math.random()
            let source = arg.source
            source.runCommand('particle minecraft:trial_spawner_detection ~ ~ ~')
            if (mR >= 0.5) {
                source.runCommand('execute if entity @p[hasitem={location=slot.weapon.offhand,item=spimton:big_splosion_ammo}] run tellraw @a {"rawtext": [{"translate": "§f<%%1> Succumb to the power of Michael Bay!", "with":{"rawtext": [{"selector":"@p"}]}}]}')
                source.runCommand('execute if entity @p[hasitem={location=slot.weapon.offhand,item=spimton:small_splosion_ammo}] run tellraw @a {"rawtext": [{"translate": "§f<%%1> Succumb to the power of Michael Bay!", "with":{"rawtext": [{"selector":"@p"}]}}]}')
                source.runCommand('execute if entity @p[hasitem={location=slot.weapon.offhand,item=spimton:antigravity_splosion_ammo}] run tellraw @a {"rawtext": [{"translate": "§f<%%1> Succumb to the power of Michael Bay!", "with":{"rawtext": [{"selector":"@p"}]}}]}')
            }
        }
    })
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:stormhornwin', {

        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            source.dimension.setWeather(WeatherType.Thunder)
            source.runCommand('summon lightning_bolt')
            source.playSound('horn.call.5')


        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:meat_mallet', {
        onHitEntity: arg => {
            let hited = arg.hitEntity
            let hitedtype = hited.typeId
            const chance = Math.random()
            if (hitedtype == "minecraft:pig") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            }
            else if (hitedtype == "minecraft:cow") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            }
            else if (hitedtype == "minecraft:chicken") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            }
            else if (hitedtype == "minecraft:rabbit") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            }
            else if (hitedtype == "minecraft:sheep") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            }
            else if (hitedtype == "minecraft:zombie") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            }
            else if (hitedtype == "minecraft:horse") {
                if (chance > 0.6)
                    hited.runCommand('loot spawn ~ ~ ~ kill @s mainhand')
            };
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:chillhornwin', {

        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            source.runCommand('summon spimton:chill_horn')


        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:kromiumhorn', {

        onUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            source.runCommand('summon spimton:drug_dealer')


        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:platinumgauntlet', {

        onUseOn: arg => {
            let players = world.getAllPlayers()
            let item = arg.itemStack
            let block = arg.block
            let source = arg.source
            const durability = item.getComponent("durability")
            if (source?.isSneaking) {
                if (durability <= 10) return;
                source.dimension.createExplosion(block, 4, { source: source, causesFire: false })
                if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 10, EquipmentSlot.Mainhand)
                if (Math.random() > 0.65) source.runCommand('tellraw @a[r=20] {"rawtext": [{"translate":"§f<%%1> ORA!", "with":{"rawtext": [{"selector":"@p"}]}}]}')

            } else {
                if (durability <= 5) return;
                source.dimension.createExplosion(block, 2, { source: source, causesFire: false })
                if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 5, EquipmentSlot.Mainhand)

            }



        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:pewtera', {

        onUseOn: arg => {
            let players = world.getAllPlayers()
            let item = arg.itemStack
            let block = arg.block
            let source = arg.source
            if (item.typeId == 'spimton:flint_and_pewter') {
                source.dimension.spawnEntity("spimton:pbd", block.above(1))
                source.dimension.spawnParticle("spimton:cloud", block.above(2))
                source.runCommand("playsound fire.ignite @a[r=3]")
                const itemEnchantmentComp = item.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                const itemUsedDurabilityComp = item.getComponent("durability");
                if (!itemUsedDurabilityComp) return;
                if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            }
            else if (item.typeId == 'spimton:flint_and_asbestos') {
                source.dimension.spawnEntity("spimton:cancer_giver", block.above(1))
                source.dimension.spawnParticle("spimton:lungcancer", block.above(2))
                source.runCommand("playsound fire.ignite @a[r=3]")
                const itemEnchantmentComp = item.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                const itemUsedDurabilityComp = item.getComponent("durability");
                if (!itemUsedDurabilityComp) return;
                if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            }
            else if (item.typeId == 'spimton:ht_flint_and_pewter') {
                source.dimension.spawnEntity("spimton:ht_pbd", block.above(1))
                source.dimension.spawnParticle("spimton:cloud", block.above(2))
                source.runCommand("playsound fire.ignite @a[r=3]")
                const itemEnchantmentComp = item.getComponent("minecraft:enchantable");
                const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;
                const breakChance = 100 / (unbreakingLevel + 1);
                const randomizeChance = Math.random() * 100;
                if (breakChance < randomizeChance) return;
                const itemUsedDurabilityComp = item.getComponent("durability");
                if (!itemUsedDurabilityComp) return;
                if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure })) updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            }




        }
    })
})

world.afterEvents.entityDie.subscribe(data => {
    const cadaver = data.deadEntity
    if (cadaver.typeId == "player") {
        cadaver.runCommand("scoreboard players set @s asbestos 0")
        cadaver.runCommand("scoreboard players set @s cancer 0")
        cadaver.removeTag("spimton:void_overdose")
    }



})
world.afterEvents.entityHurt.subscribe(data => {
    const damaged = data.hurtEntity
    const ww = damaged.getViewDirection()
    const eq = damaged.getComponent('equippable')
    const { x, y, z } = damaged.getHeadLocation()
    const viktorr = { x: x, y: y - 1, z: z }
    if (damaged?.hasComponent('equippable') && eq.getEquipment(EquipmentSlot.Chest)?.typeId == 'spimton:champion_chestplate'
    ) {
        if (!damaged?.isSneaking) {
            damaged.dimension.spawnParticle("spimton:seismic", viktorr)
            damaged.applyKnockback({ x: ww.x * 0, z: ww.z * 0 }, -3)
            damaged.addTag("smash")
            damaged.runCommand(`damage @e[r=3, tag=!smash] ${Math.ceil(Math.random() * 5)} entity_attack entity @s`)
            damaged.removeTag("smash")
        }
    }
    if (damaged?.hasComponent('equippable') && eq.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:champion_helmet'
    ) {
        if (damaged?.isSneaking) {
            damaged.dimension.spawnParticle("spimton:seismic", viktorr)
            damaged.applyKnockback({ x: ww.x * 0, z: ww.z * 0 }, 1)
            damaged.addTag("smash")
            damaged.runCommand(`damage @e[r=3, tag=!smash] ${Math.ceil(Math.random() * 5)} entity_attack entity @s`)
            damaged.removeTag("smash")
        }
    }
    if (damaged?.hasComponent('equippable') && eq.getEquipment(EquipmentSlot.Chest)?.typeId == 'spimton:antique_cloth_cape'
    ) {
        if (Math.random() > 0.6) {
            const tornado = damaged.dimension.spawnEntity("spimton:antique_tornado_ally", damaged.location);
            // Tame the wolf to the player
            const tameable = tornado.getComponent("minecraft:tameable");
            tameable.tame(damaged);
        }
    }
    if (damaged?.hasComponent('equippable') && eq.getEquipment(EquipmentSlot.Chest)?.typeId == 'spimton:nethengic_cloth_cape'
    ) {
        if (Math.random() > 0.6) {
            const reddo = damaged.dimension.spawnEntity("spimton:magicians_red_ally", damaged.location);
            // Tame the wolf to the player
            const tameable = reddo.getComponent("minecraft:tameable");
            tameable.tame(damaged);
        }
    }
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:weep', {
        onCompleteUse: arg => {
            let source = arg.source
            let players = world.getAllPlayers()
            let item = arg.itemStack
            updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)
            source.runCommand('summon spimton:weeper')
            source.runCommand('tellraw @a {"rawtext": [{"text":"The §cWeeper§r has been summoned!"}]}')
        },
        onBeforeDurabilityDamage: arg => {
            arg.durabilityDamage = 0
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:justice_hammer', {
        onUseOn: arg => {
            let source = arg.source
            let heed = source.getViewDirection()
            let block = arg.block
            let item = arg.itemStack
            source.addEffect("resistance", 20, { amplifier: 3, showParticles: false })
            source.dimension.createExplosion(block, 3, { causesFire: true, source: source })
            source.dimension.spawnEntity("lightning_bolt", block)

            source.applyKnockback({ x: heed.x * 2.5, z: heed.z * 2.5 }, 0.5)
            if (source.matches({ gameMode: GameMode.Survival }) || source.matches({ gameMode: GameMode.Adventure }))
                updateItemDurability(source, item, 15, EquipmentSlot.Mainhand)
            source.extinguishFire(false)
        }
    })
})
const Knockback = {
    Horizontal: 2.5,
    Vertical: 0.5
}
const KnockbackR = {
    HorizontalR: -2.5,
    VerticalR: 0.35
}

world.afterEvents.itemUse.subscribe((event) => {
    const item = event.itemStack
    const player = event.source
    const looking = player.getViewDirection()
    if (item.typeId == "spimton:celerity_gauntlet") {
        if (player?.isSneaking) {
            if (player.matches({ gameMode: GameMode.Survival }) || player.matches({ gameMode: GameMode.Adventure })) {
                const durability = item.getComponent("durability");
                if (durability <= 100) return;
                updateItemDurability(player, item, 50, EquipmentSlot.Mainhand)
                player.runCommand('particle minecraft:wind_explosion_emitter ~ ~ ~')
                player.runCommand('playsound wind_charge.burst @a[r=10] ~ ~ ~ 1 1')
                player.applyKnockback({ x: looking.x * KnockbackR.HorizontalR, z: looking.z * KnockbackR.HorizontalR }, KnockbackR.VerticalR)
            } else {
                player.runCommand('particle minecraft:wind_explosion_emitter ~ ~ ~')
                player.runCommand('playsound wind_charge.burst @a[r=10] ~ ~ ~ 1 1')
                player.applyKnockback({ x: looking.x * KnockbackR.HorizontalR, z: looking.z * KnockbackR.HorizontalR }, KnockbackR.VerticalR)
            }
        } else {
            if (player.matches({ gameMode: GameMode.Survival }) || player.matches({ gameMode: GameMode.Adventure })) {
                const durability = item.getComponent("durability");
                if (durability <= 20) return;
                updateItemDurability(player, item, 10, EquipmentSlot.Mainhand)
                player.runCommand('particle minecraft:wind_explosion_emitter ~ ~ ~')
                player.runCommand('playsound wind_charge.burst @a[r=10] ~ ~ ~ 1 1')
                player.applyKnockback({ x: looking.x * Knockback.Horizontal, z: looking.z * Knockback.Horizontal }, Knockback.Vertical)
            } else {
                player.runCommand('particle minecraft:wind_explosion_emitter ~ ~ ~')
                player.runCommand('playsound wind_charge.burst @a[r=10] ~ ~ ~ 1 1')
                player.applyKnockback({ x: looking.x * Knockback.Horizontal, z: looking.z * Knockback.Horizontal }, Knockback.Vertical)
            }
        }
    } else {
        console.warn(item.typeId)
    }
})


system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:SWORD', {
        onUse: arg => {
            const source = arg.source
            const item = arg.itemStack
            const ww = source.getViewDirection()
            const dura = item.getComponent("durability")
            if (source?.isSprinting && !source?.isJumping) {
                if ((dura.maxDurability - dura.damage) >= 9) {
                    source.applyKnockback({ x: ww.x * 5, z: ww.z * 5 }, 0.15)
                    source.startItemCooldown("knife", 47)
                    updateItemDurability(source, item, 9, EquipmentSlot.Mainhand)
                }
                else source.runCommand("title @s actionbar Not enough durability for you to use the skill!")
            }
            if (source?.isSprinting && source?.isJumping) {
                if ((dura.maxDurability - dura.damage) >= 33) {
                    source.addEffect("water_breathing", 200, { showParticles: false })
                    source.runCommand("tp @s ~ ~20 ~")

                    source.applyKnockback({ x: ww.x * 0, z: ww.z * 0 }, -10)
                    source.startItemCooldown("knife", 204)
                    updateItemDurability(source, item, 33, EquipmentSlot.Mainhand)
                }
                else source.runCommand("title @s actionbar Not enough durability for you to use the skill!")

            }
            if (source?.isSneaking && !source?.isJumping) {
                if ((dura.maxDurability - dura.damage) >= 6) {
                    source.addTag("immuneK")
                    source.runCommand("damage @e[r=6,tag=!immuneK] 12 void entity @s")
                    source.removeTag("immuneK")
                    source.startItemCooldown("knife", 102)
                    source.runCommand("particle spimton:starp ~ ~ ~")

                    updateItemDurability(source, item, 6, EquipmentSlot.Mainhand)
                }
                else source.runCommand("title @s actionbar Not enough durability for you to use the skill!")
            }
            if (source?.isSneaking && source?.isJumping) {
                if ((dura.maxDurability - dura.damage) >= 6) {
                    source.addTag("immuneK")
                    source.runCommand("damage @e[r=12,tag=!immuneK] 6 void entity @s")
                    source.removeTag("immuneK")
                    source.startItemCooldown("knife", 102)
                    source.runCommand("particle spimton:starp ~ ~ ~")

                    updateItemDurability(source, item, 6, EquipmentSlot.Mainhand)
                }
                else source.runCommand("title @s actionbar Not enough durability for you to use the skill!")
            }
            if (source?.isGliding || source?.isFalling) {
                if ((dura.maxDurability - dura.damage) >= 3) {
                    source.clearVelocity()
                    source.startItemCooldown("knife", 66)
                    updateItemDurability(source, item, 3, EquipmentSlot.Mainhand)
                }
                else source.runCommand("title @s actionbar Not enough durability for you to use the skill!")

            }
            if (!source?.isSprinting && source?.isJumping && !source?.isSneaking) {
                if ((dura.maxDurability - dura.damage) >= 66) {
                    source.runCommand("tp @s ^ ^ ^15")
                    source.startItemCooldown("knife", 660)
                    updateItemDurability(source, item, 66, EquipmentSlot.Mainhand)
                }
                else source.runCommand("title @s actionbar Not enough durability for you to use the skill!")

            }

        },
        onHitEntity: arg => {
            const hited = arg.hitEntity
            const hiter = arg.attackingEntity
            const health = hited.getComponent("health")
            const curh = health.currentValue
            const maxh = health.effectiveMax
            hited.applyDamage(Math.floor(maxh * 0.066))
            if (hiter?.isSneaking) {
                if (curh / maxh < 0.33) {
                    const itemDur = arg.itemStack.getComponent("durability")
                    if ((itemDur.maxDurability - itemDur.damage) >= 666) {
                        if (hited.typeId === 'player' || maxh >= 200 || hited.typeId === "spimton:very_cancerous_rodent" || hited.typeId === "spimton:overgrown_equestrian" || hited.typeId === "spimton:wilted_shaman") {
                            hited.applyDamage(66)
                        }
                        else hited.remove();
                        updateItemDurability(hiter, arg.itemStack, 666, EquipmentSlot.Mainhand)
                    }
                    else hiter.runCommand("title @s actionbar Not enough durability for you to use the skill!")

                }
            }

        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:kris_deltarune', {
        onHitEntity: arg => {
            const hiter = arg.attackingEntity
            const hited = arg.hitEntity
            const item = arg.itemStack.typeId
            const health = hiter.getComponent("minecraft:health")
            const curh = health.currentValue
            const maxh = health.effectiveMax
            const damage = (maxh - curh) / maxh * 30
            for (let c = 0; c < damage; c++) {
                hited.runCommand("particle minecraft:soul_particle ~ ~1 ~");

            }
            hited.applyDamage(damage)




        },
        onUseOn: data => {
            const interacter = data.source
            const item = data.itemStack
            const block = data.block
            const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const eq = interacter.getComponent("equippable").getEquipment("Head")
            const ec = interacter.getComponent("equippable").getEquipment("Chest")
            const OF = interacter.getComponent("equippable").getEquipment("Offhand")
            if (block.typeId === 'spimton:hoary_runestone') {

                if (eq?.typeId === "spimton:antique_cloth_hood" && ec?.typeId === "spimton:antique_cloth_cape" && OF?.typeId === "spimton:glowing_dye") {

                    block.setPermutation(block.permutation.withState("spimton:rune", randomInt(1, 9)))
                    block.dimension.playSound("block.grindstone.use", block.location, { volume: 0.5 })
                    if (!interacter.matches({ gameMode: GameMode.Creative })) {
                        updateItemDurability(interacter, item, 1, EquipmentSlot.Mainhand)
                        const of_amount = interacter.getComponent("equippable").getEquipmentSlot("Offhand")
                        if (of_amount.amount > 1) {
                            of_amount.amount--;
                        }
                        else of_amount.setItem(undefined);

                    };
                }
            }
            if (block.typeId === 'spimton:nethengic_runestone') {

                if (eq?.typeId === "spimton:nethengic_cloth_hood" && ec?.typeId === "spimton:nethengic_cloth_cape" && OF?.typeId === "spimton:glowing_dye") {

                    block.setPermutation(block.permutation.withState("spimton:rune", randomInt(1, 9)))
                    block.dimension.playSound("block.grindstone.use", block.location, { volume: 0.5 })
                    if (!interacter.matches({ gameMode: GameMode.Creative })) {
                        updateItemDurability(interacter, item, 1, EquipmentSlot.Mainhand)
                        const of_amount = interacter.getComponent("equippable").getEquipmentSlot("Offhand")
                        if (of_amount.amount > 1) {
                            of_amount.amount--;
                        }
                        else of_amount.setItem(undefined);

                    };
                }
            }
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:silver_sword', {
        onHitEntity: arg => {
            const hiter = arg.attackingEntity
            const hited = arg.hitEntity
            hited.runCommand("execute if entity @s[family=undead] run tag @s add spimton:undead_check")
            if (hited.hasTag("spimton:undead_check")) {
                if (hiter?.isFalling) {
                    hited.applyDamage(18, { cause: "magic" })
                    hited.dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", hited.getHeadLocation())
                }
                else {
                    hited.applyDamage(12, { cause: "magic" })
                    hited.dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", hited.getHeadLocation())
                }
            }
            hited.runCommand("execute if entity @s[family=undead] run tag @s remove spimton:undead_check")




        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:knife_undertale', {
        onHitEntity: arg => {
            const hiter = arg.attackingEntity
            const hited = arg.hitEntity
            const item = arg.itemStack.typeId
            const health = hiter.getComponent("minecraft:health")
            const curh = health.currentValue
            const maxh = health.effectiveMax
            const damage = (maxh * 0.9) - (maxh - curh) * 0.9
            for (let c = 0; c < damage; c++) {
                hited.runCommand("particle minecraft:soul_particle ~ ~1 ~");

            }
            hited.applyDamage(damage)
        }
    })
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:blackkris_deltarune', {
        onHitEntity: arg => {
            const hiter = arg.attackingEntity
            const hited = arg.hitEntity
            const item = arg.itemStack.typeId
            const health = hiter.getComponent("minecraft:health")
            const curh = health.currentValue;
            const maxh = health.effectiveMax;



            const pain = (maxh / curh) * 2.5
            hited.applyDamage(pain)
            for (let c = 0; c < pain; c++) {
                hited.runCommand("particle minecraft:soul_particle ~ ~1 ~");

            }


        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:elon_termonucle', {
        onUseOn: arg => {
            const source = arg.source
            const block = arg.block
            const loc = block.center()
            const item = arg.itemStack
            if (GameRule.MobGriefing === false) return;
            else {
                block.dimension.createExplosion(loc, 100, { source: source, causesFire: true })
                block.dimension.createExplosion(block.below(35), 100, { source: source, causesFire: true })
                block.dimension.createExplosion(block.east(35), 100, { source: source, causesFire: true })
                block.dimension.createExplosion(block.west(35), 100, { source: source, causesFire: true })
                block.dimension.createExplosion(block.north(35), 100, { source: source, causesFire: true })
                block.dimension.createExplosion(block.south(35), 100, { source: source, causesFire: true })
                block.dimension.createExplosion(block.above(35), 100, { source: source, causesFire: true })
            }
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:shadowhorn', {
        onUseOn: arg => {
            const source = arg.source
            const item = arg.itemStack
            const block = arg.block
            if (block.typeId === "spimton:overgrown_altar" || block.typeId === "spimton:overgrown_arena_altar" || block.typeId === "spimton:weeping_altar" || block.typeId === "spimton:juandice_altar" || block.typeId === "spimton:wilted_arena_altar") {
                source.runCommand("title @p actionbar The Altar's Soul is now ready...")

                block.setPermutation(block.permutation.withState("spimton:activated", true));
                if (source.matches({ gameMode: GameMode.Creative })) return;
                updateItemDurability(source, item, 1, EquipmentSlot.Mainhand)

            }
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:agohatchet', {
        onMineBlock: arg => {
            const hiter = arg.source
            const block = arg.block
            block.dimension.createExplosion(block.center(), 1, { causesFire: true, source: hiter, breaksBlocks: true })
        }
    })
})
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:imphatchet', {
        onMineBlock: arg => {
            const hiter = arg.source
            const block = arg.block
            block.dimension.createExplosion(block.center(), 2, { causesFire: false, source: hiter, breaksBlocks: true })
        }
    })
})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('spimton:firebrando', {
        onHitEntity: arg => {
            const { attackingEntity, hitEntity } = arg
            const fire = attackingEntity.getComponent("onfire")
            if (fire != undefined) {

                hitEntity.setOnFire(fire.onFireTicksRemaining, true)
                attackingEntity.extinguishFire()
            }
        }
    })
})

world.afterEvents.entityHitEntity.subscribe(data => {
    const hitler = data.damagingEntity
    const hitled = data.hitEntity
    const eq = hitler.getComponent('equippable')
    if (hitler?.hasComponent('equippable') && eq.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:antique_cloth_hood'
    ) {
        if (Math.random() > 0.75) {
            const tornado = hitled.dimension.spawnEntity("spimton:antique_tornado_ally", hitled.location);
            // Tame the wolf to the player
            const tameable = tornado.getComponent("minecraft:tameable");
            tameable.tame(hitler);
        }
    }
    if (hitler?.hasComponent('equippable') && eq.getEquipment(EquipmentSlot.Head)?.typeId == 'spimton:nethengic_cloth_hood'
    ) {
        if (Math.random() > 0.75) {
            const reddo = hitled.dimension.spawnEntity("spimton:magicians_red_ally", hitled.location);
            // Tame the wolf to the player
            const tameable = reddo.getComponent("minecraft:tameable");
            tameable.tame(hitler);
        }
    }

})

system.beforeEvents.startup.subscribe(comp => {
    comp.itemComponentRegistry.registerCustomComponent("spimton:heavy_metal_greatsword", {
        onHitEntity: arg => {
            const { itemStack, attackingEntity } = arg
            let fatigue = itemStack.getDynamicProperty("spimton:fatigue")
            if (fatigue == undefined) {
                itemStack.setDynamicProperty("spimton:fatigue", 0)
                fatigue = 0
            }
            const cooldown = attackingEntity.getItemCooldown("guretozawordo");
            if (cooldown == 0) {
                attackingEntity.addEffect("slowness", 300, { showParticles: false, amplifier: fatigue })
                attackingEntity.addEffect("mining_fatigue", 300, { showParticles: false, amplifier: fatigue });
                fatigue++;
                attackingEntity.startItemCooldown("guretozawordo", 13);
            }
            else {
                attackingEntity.addEffect("weakness", (cooldown * 20) - 3, { showParticles: false, amplifier: fatigue })
            };
            if (fatigue >= 10) {
                attackingEntity.runCommand("title @s actionbar You feel overwhelmed by the sword's weight...")
                attackingEntity.applyDamage(fatigue / 1.997, { cause: EntityDamageCause.none })
            };
            itemStack.setDynamicProperty("spimton:fatigue", fatigue)
            itemStack.setLore([
                `§r§7Fatigue: ${fatigue}`
            ])
            attackingEntity.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, itemStack)




        }
    })
})

system.beforeEvents.startup.subscribe(comp => {
    comp.itemComponentRegistry.registerCustomComponent("spimton:baleful_steel_greatsword", {
        onHitEntity: arg => {
            const { itemStack, attackingEntity } = arg
            let radiation = itemStack.getDynamicProperty("spimton:radiation")
            if (radiation == undefined) {
                itemStack.setDynamicProperty("spimton:radiation", 0)
                radiation = 0
            }
            const cooldown = attackingEntity.getItemCooldown("guretozawordo");
            if (cooldown == 0) {
                attackingEntity.addEffect("poison", 300, { showParticles: false, amplifier: radiation })
                attackingEntity.setOnFire(radiation * 5 + 5, false)
                for (let c = 0; c < radiation + 1; c++) {
                    attackingEntity.runCommand("scoreboard players add @s asbestos 1");

                }
                radiation++;
                attackingEntity.startItemCooldown("guretozawordo", 13);
            }
            else {
                attackingEntity.addEffect("weakness", (cooldown * 20) - 3, { showParticles: false, amplifier: fatigue })
            };
            if (radiation >= 10) {
                attackingEntity.runCommand("title @s actionbar You feel overwhelmed by the sword's radiation...")
                attackingEntity.applyDamage(radiation / 1.997, { cause: EntityDamageCause.none })
            };
            itemStack.setDynamicProperty("spimton:radiation", radiation)
            itemStack.setLore([
                `§r§7Radiation: ${radiation}`
            ])
            attackingEntity.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, itemStack)




        }
    })
})

world.afterEvents.entityDie.subscribe(event => {
    const deadEntity = event.deadEntity;
    const damageSource = event.damageSource;

    if (damageSource.damagingEntity?.typeId === "minecraft:player") {
        const player = damageSource.damagingEntity;
        const equ = player.getComponent("equippable")
        const eqqq = equ.getEquipment(EquipmentSlot.Mainhand)
        const OF = equ.getEquipment(EquipmentSlot.Offhand)
        if (eqqq) {
            if (eqqq.typeId === "spimton:heavy_metal_greatsword") {
                const slotm = player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand)
                let fatigueded = slotm.getDynamicProperty("spimton:fatigue")

                player.dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", player.getHeadLocation())
                player.addEffect("strength", 5 * deadEntity.getComponent("health").effectiveMax, { showParticles: false, amplifier: fatigueded - 1 })
                fatigueded = 0

                slotm.setDynamicProperty("spimton:fatigue", fatigueded)
                slotm.setLore([
                    `§r§7Fatigue: ${fatigueded}`
                ])

                player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, slotm)

            }
            if (eqqq.typeId === "spimton:baleful_steel_greatsword") {
                const slotm = player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand)
                let radiationfox = slotm.getDynamicProperty("spimton:radiation")
                player.runCommand(`scoreboard players remove @s asbestos ${deadEntity.getComponent("health").effectiveMax * 2}`)
                player.addTag("greto")
                player.runCommand(`damage @e[r=12.25,tag=!greto] ${Math.round(radiationfox * deadEntity.getComponent("health").effectiveMax / 20)} ${EntityDamageCause.wither}`)
                player.runCommand(`effect @e[r=12.25,tag=!greto] wither ${Math.round(deadEntity.getComponent("health").effectiveMax)} ${radiationfox}`)
                player.removeTag("greto")
                radiationfox = 0
                slotm.setDynamicProperty("spimton:radiation", radiationfox)
                slotm.setLore([
                    `§r§7Radiation: ${radiationfox}`
                ])
                player.dimension.spawnParticle("spimton:baleful_radiation", deadEntity.location)
                player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, slotm)

            }
            if (eqqq.typeId === "spimton:whispering_spear" && whispering_spear_targets.includes(deadEntity.typeId)) {
                console.warn("become grrr")
                let killcount = eqqq.getDynamicProperty("spimton:whispering_spear_killcount");
                const itemLore = eqqq.getLore()
                if (!killcount) {
                    killcount = 0
                };
                console.warn("Killcount:", String(killcount));
                if (killcount < 12) {
                    killcount++;
                    if (killcount > 6 && killcount < 12) {
                        player.runCommand(`title @s actionbar §4§o${12 - killcount} left`)
                    }
                    else if (killcount >= 12) {
                        eqqq.setLore([
                            "",
                            whispering_spear_powerup
                        ])
                        player.dimension.spawnParticle("spimton:soul_blast", player.getHeadLocation());
                    };
                    eqqq.setDynamicProperty("spimton:whispering_spear_killcount", killcount);
                    player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, eqqq);

                }
                else if (Math.random() >= 0.67) {
                    player.runCommand("title @s actionbar §4Become stronger...")
                }
            }
            if (eqqq.typeId === "spimton:luck_spear") {
                console.warn("become grrr")
                let killcount = eqqq.getDynamicProperty("spimton:whispering_spear_killcount");
                if (!killcount) {
                    killcount = 0
                };
                console.warn("Killcount:", String(killcount));
                if (killcount < 8 && deadEntity.getComponent("type_family").hasTypeFamily("undead") && player.getComponent("health").currentValue / player.getComponent("health").effectiveMax < 0.1997) {
                    killcount++;
                    if (killcount >= 8) {
                        eqqq.setLore([
                            "",
                            luck_spear_powerup.base,
                            luck_spear_powerup.desc,
                            luck_spear_powerup.desc2

                        ])
                        player.dimension.playSound("sfx.pluck_spear", player.getHeadLocation())
                    };
                    eqqq.setDynamicProperty("spimton:whispering_spear_killcount", killcount);
                    player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, eqqq);

                };
                if (Math.random() < deadEntity.getComponent("health").effectiveMax / 40 && killcount < 8) player.runCommand(`loot spawn ${deadEntity.location.x} ${deadEntity.location.y} ${deadEntity.location.z} loot "luck_spear"`)
            };
        };
        if (OF) {
            const SoulItem = OF.getComponent("spimton:soul_artifact")
            if (!SoulItem) return;
            let souls = OF.getDynamicProperty("spimton:souls")
            if (!souls) {
                souls = 0
            };
            const health = deadEntity.getComponent("health").effectiveMax
            souls += Math.ceil(health / 10);
            if (souls > 50) {
                souls = 50
            }
            OF.setDynamicProperty("spimton:souls", souls)
            OF.setLore(
                [
                    "",
                    `§r§7Souls: ${souls}/50`
                ]
            );
            player.getComponent("equippable").setEquipment(EquipmentSlot.Offhand, OF)

        }
    }
});

const whispering_spear_powerup = "§r§b[Awakened]"

const luck_spear_base = {
    base: "§r§g[Luck]§7:",
    desc: "§r§7Killing entities has a chance",
    desc2: "§r§7to drop loot."
}

const luck_spear_powerup = {
    base: "§r§4[Pluck]§7:",
    desc: "§r§7Having less than 20% of your health",
    desc2: "§r§7inflicts more damage."
}

const whispering_spear_targets = [
    "spimton:chillager",
    "spimton:chillager_assailant",
    "spimton:chillager_summoner",
    "spimton:coldager",
    "spimton:coldager_assailant",
    "spimton:coldager_summoner",
    "spimton:chillager_chieftain"
]


system.beforeEvents.startup.subscribe(dataaa => {

    dataaa.itemComponentRegistry.registerCustomComponent("spimton:whispering_spear", {
        onHitEntity: arg => {
            const { hitEntity, attackingEntity } = arg
            const item = attackingEntity.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
            if (item.getDynamicProperty("spimton:whispering_spear_killcount") == 12) {
                const health = hitEntity.getComponent("health")
                if (health.currentValue / health.effectiveMax < 0.1225) {
                    attackingEntity.runCommand("title @s actionbar §4Proceed")
                    hitEntity.applyDamage(19.97, { cause: "freezing", damagingEntity: attackingEntity })

                }
                else {
                    hitEntity.applyDamage(6, { cause: "freezing", damagingEntity: attackingEntity })
                }
            }

        }
    });
    dataaa.itemComponentRegistry.registerCustomComponent("spimton:luck_spear", {
        onHitEntity: arg => {
            const { hitEntity, attackingEntity } = arg
            const item = arg.itemStack;
            const lore = item.getLore();
            if (lore.length == 0) {
                item.setLore([
                    "",
                    luck_spear_base.base,
                    luck_spear_base.desc,
                    luck_spear_base.desc2
                ])
            }
            if (item.getDynamicProperty("spimton:whispering_spear_killcount") == 8) {
                const health = attackingEntity.getComponent("health")
                if (health.currentValue / health.effectiveMax < 0.1997) {
                    hitEntity.applyDamage(21, { cause: EntityDamageCause.entityAttack, damagingEntity: attackingEntity })

                }
            }
            attackingEntity.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, item)
        }
    });
    dataaa.itemComponentRegistry.registerCustomComponent("spimton:soul_artifact", {
        onUse(event) {
            const { itemStack, source } = event
            let souls = itemStack.getDynamicProperty("spimton:souls")
            if (!souls) {
                souls = 0
                itemStack.setDynamicProperty("spimton:souls", souls);
            };
            const AllyTag = source.name + "_ally";
            switch (itemStack.typeId) {
                case "spimton:harvester":

                    if (source?.isSneaking && souls > 0) {
                        source.addTag("spimton:harvest")
                        const Entities = source.dimension.getEntities({ location: source.getHeadLocation(), excludeFamilies: ["inanimate"], excludeTags: ["spimton:harvest", AllyTag], maxDistance: Math.ceil(souls * 0.3) + 3, minDistance: 0, excludeTypes: ["item"] });
                        for (const Enity of Entities) {
                            const DV = getVectorToEntity(source, Enity)
                            Enity.applyKnockback({ x: DV.x * souls / 20, z: DV.z * souls / 20 }, souls / 20)
                            Enity.applyDamage(souls / 1.225, { damagingEntity: source, cause: EntityDamageCause.magic })
                        };
                        source.removeTag("spimton:harvest")
                        console.warn("end harvest")
                        source.dimension.spawnParticle("spimton:soul_blast", source.getHeadLocation())
                        source.dimension.playSound("item.soul_harvester", source.getHeadLocation());
                        souls = 0;
                        itemStack.setDynamicProperty("spimton:souls", souls)
                    }
                    else if (souls >= 10) {
                        source.addTag("spimton:harvest")
                        const Entities = source.dimension.getEntities({ location: source.getHeadLocation(), excludeFamilies: ["inanimate"], excludeTags: ["spimton:harvest", AllyTag], maxDistance: 6, minDistance: 0, excludeTypes: ["item"] });
                        for (const Enity of Entities) {
                            const DV = getVectorToEntity(source, Enity)
                            Enity.applyKnockback({ x: DV.x * 10 / 20, z: DV.z * 10 / 20 }, 10 / 20)
                            Enity.applyDamage(10 / 1.225, { damagingEntity: source, cause: EntityDamageCause.magic })
                        };
                        source.removeTag("spimton:harvest")
                        console.warn("end harvest")
                        source.dimension.spawnParticle("spimton:soul_blast", source.getHeadLocation())
                        source.dimension.playSound("item.soul_harvester", source.getHeadLocation());
                        souls += -10;
                        itemStack.setDynamicProperty("spimton:souls", souls)


                    }
                    else {
                        source.runCommand("title @s actionbar §bNot Enough Souls!")
                    };;
                    break;
                case "spimton:materializer":
                    if (source?.isSneaking && souls > 0) {
                        const BRIDGE_LENGTH = Math.ceil(souls * 2);
                        const BRIDGE_BLOCK = "spimton:ecto_block_plat";
                        const location = source.location;
                        const dir = source.getViewDirection();

                        // Normalize horizontal direction
                        const horizontalLength = Math.sqrt(dir.x * dir.x + dir.z * dir.z);

                        if (horizontalLength < 0.01) return;

                        const dx = dir.x / horizontalLength;
                        const dz = dir.z / horizontalLength;

                        // Place blocks forward from the player
                        for (let i = 1; i <= BRIDGE_LENGTH; i++) {
                            const x = Math.floor(location.x + dx * i);
                            const y = Math.floor(location.y - 1); // beneath player
                            const z = Math.floor(location.z + dz * i);

                            const block = source.dimension.getBlock({ x, y, z });

                            if (block && (block.isAir || block.isLiquid)) {
                                block.setPermutation(
                                    BlockPermutation.resolve(BRIDGE_BLOCK, {
                                        "spimton:mater": true
                                    })
                                );
                                source.dimension.playSound("item.soul_materializer", source.getHeadLocation(), { volume: 0.55 })
                            }
                        };
                        souls = 0
                        itemStack.setDynamicProperty("spimton:souls", souls)
                    }
                    else if (souls >= 10) {
                        const BRIDGE_LENGTH = Math.ceil(20);
                        const BRIDGE_BLOCK = "spimton:ecto_block_plat";
                        const location = source.location;
                        const dir = source.getViewDirection();

                        // Normalize horizontal direction
                        const horizontalLength = Math.sqrt(dir.x * dir.x + dir.z * dir.z);

                        if (horizontalLength < 0.01) return;

                        const dx = dir.x / horizontalLength;
                        const dz = dir.z / horizontalLength;

                        // Place blocks forward from the player
                        for (let i = 1; i <= BRIDGE_LENGTH; i++) {
                            const x = Math.floor(location.x + dx * i);
                            const y = Math.floor(location.y - 1); // beneath player
                            const z = Math.floor(location.z + dz * i);

                            const block = source.dimension.getBlock({ x, y, z });

                            if (block && (block.isAir || block.isLiquid)) {
                                block.setPermutation(
                                    BlockPermutation.resolve(BRIDGE_BLOCK, {
                                        "spimton:mater": true
                                    })
                                );
                                source.dimension.playSound("item.soul_materializer", source.getHeadLocation(), { volume: 0.55 })
                            }
                        };
                        souls += -10;
                        itemStack.setDynamicProperty("spimton:souls", souls)


                    }
                    else {
                        source.runCommand("title @s actionbar §bNot Enough Souls!")
                    };
                    break;
                case "spimton:soul_healer":
                    if (source?.isSneaking && souls > 0) {
                        const Entities = source.dimension.getEntities({ location: source.getHeadLocation(), maxDistance: Math.floor(souls * 0.6), minDistance: 0, tags: [AllyTag], closest: Math.floor(souls / 3) });
                        for (const entity of Entities) {
                            const health = entity.getComponent("health")
                            const max = health.effectiveMax
                            let healthtoset = health.currentValue + Math.floor(souls / 1.997 + 1);
                            if (healthtoset > max) {
                                healthtoset = max
                            };
                            health.setCurrentValue(healthtoset)
                            entity.dimension.spawnParticle("minecraft:spawn_particle", entity.getHeadLocation())

                        };
                        const healthS = source.getComponent("health")
                        const maxS = healthS.effectiveMax
                        let healthtosetS = healthS.currentValue + Math.floor(souls / 1.225);
                        if (healthtosetS > maxS) {
                            healthtosetS = maxS
                        };
                        healthS.setCurrentValue(healthtosetS)
                        source.dimension.playSound("item.soul_healer", source.getHeadLocation())
                        souls = 0
                        itemStack.setDynamicProperty("spimton:souls", souls)
                    }
                    else if (souls >= 10) {
                        const Entities = source.dimension.getEntities({ location: source.getHeadLocation(), maxDistance: 6, minDistance: 0, tags: [AllyTag], closest: 3 });
                        for (const entity of Entities) {
                            const health = entity.getComponent("health")
                            const max = health.effectiveMax
                            let healthtoset = health.currentValue + Math.floor(10 / 1.997 + 1);
                            if (healthtoset > max) {
                                healthtoset = max
                            };
                            health.setCurrentValue(healthtoset)
                            entity.dimension.spawnParticle("minecraft:spawn_particle", entity.getHeadLocation())

                        };
                        const healthS = source.getComponent("health")
                        const maxS = healthS.effectiveMax
                        let healthtosetS = healthS.currentValue + Math.floor(10 / 1.225);
                        if (healthtosetS > maxS) {
                            healthtosetS = maxS
                        };
                        healthS.setCurrentValue(healthtosetS)
                        source.dimension.playSound("item.soul_healer", source.getHeadLocation())
                        souls += -10;
                        itemStack.setDynamicProperty("spimton:souls", souls)


                    }
                    else {
                        source.runCommand("title @s actionbar §bNot Enough Souls!")
                    };
                    break;
                case "spimton:shadow_shifter":
                    if (source?.isSneaking && souls > 0) {
                        const TargetEntity = source.getEntitiesFromViewDirection({ maxDistance: souls, ignoreBlockCollision: true, excludeFamilies: ["inanimate"], excludeTypes: ["item"] })
                        if (TargetEntity.length > 0) {
                            const playerPos = source.location
                            const targetPos = TargetEntity[0].entity.location;
                            source.addEffect("invisibility", souls * 30 / TargetEntity[0].distance, { showParticles: false })
                            source.addEffect("slow_falling", souls * 30 / TargetEntity[0].distance, { showParticles: false });
                            TargetEntity[0].entity.teleport(playerPos, { facingLocation: TargetEntity[0].entity.getViewDirection() })
                            source.teleport(targetPos, { checkForBlocks: false, facingLocation: source.getViewDirection() });
                            source.dimension.playSound("item.shadow_shifter", source.getHeadLocation())
                            souls = 0
                            itemStack.setDynamicProperty("spimton:souls", souls)

                        }
                        else {
                            source.runCommand("title @s actionbar §bNo valid targets!")
                        }
                    }
                    else if (souls >= 10) {
                        const TargetEntity = source.getEntitiesFromViewDirection({ maxDistance: 10, ignoreBlockCollision: true, excludeFamilies: ["inanimate"], excludeTypes: ["item"] })
                        if (TargetEntity.length > 0) {
                            const playerPos = source.location
                            const targetPos = TargetEntity[0].entity.location;
                            source.addEffect("invisibility", 10 * 30 / TargetEntity[0].distance, { showParticles: false })
                            source.addEffect("slow_falling", 10 * 30 / TargetEntity[0].distance, { showParticles: false });
                            TargetEntity[0].entity.teleport(playerPos, { facingLocation: TargetEntity[0].entity.getViewDirection() })
                            source.teleport(targetPos, { checkForBlocks: false, facingLocation: source.getViewDirection() });
                            source.dimension.playSound("item.shadow_shifter", source.getHeadLocation())
                            souls += -10;
                            itemStack.setDynamicProperty("spimton:souls", souls)

                        }
                        else {
                            source.runCommand("title @s actionbar §bNo valid targets!")
                        }


                    }
                    else {
                        source.runCommand("title @s actionbar §bNot Enough Souls!")
                    };
                    break;

            };
            itemStack.setLore([
                "",
                `§r§7Souls: ${souls}/50`
            ]);
            source.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, itemStack);
        },
        onHitEntity(event) {
            const { hitEntity, attackingEntity } = event;
            console.warn("HIT")
            if (attackingEntity.typeId === "minecraft:player") {
                console.warn("player")
                const AllyTag = attackingEntity.name + "_ally";
                console.warn("tag");
                if (!attackingEntity?.isSneaking) {
                    hitEntity.addTag(AllyTag)
                    console.warn("add")
                    attackingEntity.runCommand(`title @s actionbar §bAdded ${nameTag(hitEntity)} to Ally List`)
                }
                else {
                    hitEntity.removeTag(AllyTag);
                    console.warn("remove")
                    attackingEntity.runCommand(`title @s actionbar §bRemoved ${nameTag(hitEntity)} from Ally List`)
                }
            }

        }

    });
})

function nameTag(entity) {
    let nameTag = entity.nameTag;
    if (nameTag === "") {
        nameTag = entity.typeId
    }
    return nameTag;
}


function getVectorToEntity(origin, target) {
    const o = origin.location;
    const t = target.location;
    return {
        x: t.x - o.x,
        y: t.y - o.y,
        z: t.z - o.z,
    };
}