import { system, world, ItemStack, GameMode, EquipmentSlot, BlockComponentTypes, MolangVariableMap, BlockPermutation, Block } from '@minecraft/server';


const Beverage1Types = [
    "spimton:mug",
    "spimton:ale",
    "spimton:beetroot_ale",
    "spimton:cider",
    "spimton:dread_grog",
    "spimton:egg_nog",
    "spimton:grog",
    "spimton:goblin_beer",
    "spimton:mead",
    "spimton:poisoned_drink",
    "spimton:red_rum",
    "spimton:spoison",
    "spimton:steel_toe_stout"

]

const Beverage2Types = [
    "spimton:vodka",
    "spimton:void_liquor",
    "spimton:snareling_drink",
    "spimton:wine",
    "spimton:white_wine",
    "spimton:red_wine"
]

function DefaultState(block) {
    block.setPermutation(block.permutation.withState("spimton:array_beverage_1", "false"))
    block.setPermutation(block.permutation.withState("spimton:array_beverage_2", "false"))
    block.setPermutation(block.permutation.withState("spimton:has_beverage", false))
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(min, max) {
    if (Math.random > 0.5) return Math.random() * (max - min + 1) + min
    else return -(Math.random() * (max - min + 1) + min);
}

function tryExplode(block, ingredients) {
    if (ingredients > 2) {
        console.warn("EXPLODE!")
        block.setPermutation(block.permutation.withState("spimton:ingredients", 0))
        block.setPermutation(block.permutation.withState("spimton:cooking", "no"))
        block.setPermutation(block.permutation.withState("spimton:beverage", "wine"))
        block.dimension.spawnParticle("spimton:deltarune_explosion_multiple", block.center())
        block.dimension.playSound("sfx.deltarune_boom", block.center(), { volume: 1, pitch: 1.225 })
        const explodedbe = block.dimension.spawnItem(new ItemStack("spimton:exploded_beverage", 1), block.above())
        explodedbe.applyImpulse({ x: getRandom(-0.15, 0.15), y: 0.6, z: getRandom(-0.15, 0.15) });
    };
}

system.beforeEvents.startup.subscribe(ec1 => {
    ec1.blockComponentRegistry.registerCustomComponent("spimton:cellar", {
        onPlayerInteract: arg0 => {

            const player = arg0.player
            const equippable = player.getComponent("equippable")
            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand)
            const item = equippable.getEquipment(EquipmentSlot.Mainhand)
            const block = arg0.block
            const Cooking = block.permutation.getState("spimton:cooking")
            const ingredients = block.permutation.getState("spimton:ingredients")
            if (ingredients === undefined) block.setPermutation(block.permutation.withState("spimton:ingredients", 0));
            if (!mainhand.hasItem()) {
                if (Cooking != "done") return;
                block.setPermutation(block.permutation.withState("spimton:cooking", "no"))

                if (block.permutation.getState("spimton:beverage") === "wine") {
                    mainhand.setItem(new ItemStack("spimton:random_wine_" + String(getRandomInt(1, 9)), 1))
                }
                else if (block.permutation.getState("spimton:beverage") === "scrumpy") {
                    mainhand.setItem(new ItemStack("spimton:scrumpy_" + String(getRandomInt(1, 3)), 1))
                }
                else if (block.permutation.getState("spimton:beverage") === "wwine") {
                    mainhand.setItem(new ItemStack("spimton:random_wine_w" + String(getRandomInt(1, 5)), 1))
                }
                else if (block.permutation.getState("spimton:beverage") === "seye") {
                    mainhand.setItem(new ItemStack("spimton:random_wine_f" + String(getRandomInt(1, 1)), 1))
                }
            }
            else if (mainhand.typeId == "spimton:grape_bottle") {
                if (Cooking != "no") return;
                block.setPermutation(block.permutation.withState("spimton:cooking", "yes"))
                block.setPermutation(block.permutation.withState("spimton:beverage", "wine"))
                block.dimension.playSound("entity.generic.splash", block.center(), { volume: 1 })
                block.dimension.spawnParticle("wind_explosion_emitter", block.above().bottomCenter())
                if (player.getGameMode() == GameMode.Creative) return;
                if (mainhand.amount > 1) {
                    mainhand.amount--
                }
                else mainhand.setItem(undefined);
            }
            else if (mainhand.typeId == "minecraft:apple") {
                if (Cooking === "no") return;
                block.setPermutation(block.permutation.withState("spimton:ingredients", ingredients + 1))
                console.warn(String(ingredients));
                block.dimension.spawnParticle("minecraft:dust_plume", block.above().bottomCenter())
                block.setPermutation(block.permutation.withState("spimton:beverage", "scrumpy"))
                block.dimension.playSound("item.bottle.fill", block.center(), { volume: 1 })
                tryExplode(block, ingredients)
                if (player.getGameMode() == GameMode.Creative) return;
                if (mainhand.amount > 1) {
                    mainhand.amount--
                }
                else mainhand.setItem(undefined);

            }
            else if (mainhand.typeId == "minecraft:fermented_spider_eye") {
                if (Cooking === "no") return;
                block.setPermutation(block.permutation.withState("spimton:ingredients", ingredients + 1))
                console.warn(String(ingredients));
                block.dimension.spawnParticle("minecraftdust_plume", block.above().bottomCenter())
                block.setPermutation(block.permutation.withState("spimton:beverage", "seye"))
                block.dimension.playSound("item.bottle.fill", block.center(), { volume: 1 })
                tryExplode(block, ingredients)
                if (player.getGameMode() == GameMode.Creative) return;
                if (mainhand.amount > 1) {
                    mainhand.amount--
                }
                else mainhand.setItem(undefined);

            }
            else if (mainhand.typeId == "minecraft:bone_meal") {
                if (Cooking === "no") return;
                if (block.permutation.getState("spimton:beverage") === "seye") {
                    block.setPermutation(block.permutation.withState("spimton:ingredients", ingredients + 1))
                    console.warn(String(ingredients));
                    block.dimension.spawnParticle("minecraft:dust_plume", block.above().bottomCenter())
                    block.setPermutation(block.permutation.withState("spimton:beverage", "wwine"))
                    block.dimension.playSound("item.bottle.fill", block.center(), { volume: 1 })
                    tryExplode(block, ingredients)
                    if (player.getGameMode() == GameMode.Creative) return;
                    if (mainhand.amount > 1) {
                        mainhand.amount--
                    }
                    else mainhand.setItem(undefined);

                }

            };


        },
        onTick: arg1 => {
            const block = arg1.block
            block.setPermutation(block.permutation.withState("spimton:cooking", "done"))
            block.dimension.playSound("random.potion.brewed", block.center());
            const molang = new MolangVariableMap()
            molang.setColorRGBA("color", {
                red: 81 / 255,
                green: 29 / 255,
                blue: 74 / 255,
                alpha: 0.5
            })
            block.dimension.spawnParticle("minecraft:mobspell_emitter", block.above().bottomCenter(), molang)
        }
    })
})



system.beforeEvents.startup.subscribe(ec => {
    ec.blockComponentRegistry.registerCustomComponent("spimton:coaster", {
        onPlayerInteract: arg => {
            const player = arg.player
            const equippable = player.getComponent("equippable")
            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand)
            const item = equippable.getEquipment(EquipmentSlot.Mainhand)
            const block = arg.block
            const HasBeverage = block.permutation.getState("spimton:has_beverage")
            const BeverageArr1 = block.permutation.getState("spimton:array_beverage_1")
            const BeverageArr2 = block.permutation.getState("spimton:array_beverage_2")
            if (mainhand.hasItem() == false) {
                if (HasBeverage == false) return;
                else {
                    if (BeverageArr1 == "false" && BeverageArr2 != "false") {
                        const beverage = new ItemStack(BeverageArr2)
                        mainhand.setItem(beverage)
                        DefaultState(block)
                    }
                    if (BeverageArr1 != "false" && BeverageArr2 == "false") {
                        const beverage = new ItemStack(BeverageArr1)
                        mainhand.setItem(beverage)
                        DefaultState(block)
                    };
                };
            }
            else {
                if (HasBeverage == true) return;
                if (Beverage1Types.includes(item.typeId)) {

                    block.setPermutation(block.permutation.withState("spimton:has_beverage", true))
                    block.setPermutation(block.permutation.withState("spimton:array_beverage_2", "false"))
                    block.setPermutation(block.permutation.withState("spimton:array_beverage_1", item.typeId))
                    if (player.getGameMode() == GameMode.Creative) return;
                    if (mainhand.amount > 1) {
                        mainhand.amount--
                    }
                    else mainhand.setItem(undefined);
                }
                else if (Beverage2Types.includes(item.typeId)) {

                    block.setPermutation(block.permutation.withState("spimton:has_beverage", true))
                    block.setPermutation(block.permutation.withState("spimton:array_beverage_1", "false"))
                    block.setPermutation(block.permutation.withState("spimton:array_beverage_2", item.typeId))
                    if (player.getGameMode() == GameMode.Creative) return;
                    mainhand.setItem(undefined);
                }
            }
        },
        onPlace(arg2) {
            const block = arg2.block
            console.warn("ZA WARUDO")
            DefaultState(block);

        }

    })
});

function spawnItem(block, id, quantity) {
    const item = new ItemStack(id, quantity)
    block.dimension.spawnItem(item, block.center())
}

world.beforeEvents.playerBreakBlock.subscribe(c => {
    const block = c.block
    if (block.typeId == "spimton:coaster") {
        const HasBeverage = block.permutation.getState("spimton:has_beverage")
        const BeverageArr1b = block.permutation.getState("spimton:array_beverage_1")
        const BeverageArr2b = block.permutation.getState("spimton:array_beverage_2")
        if (HasBeverage == false) {
            console.warn("No Beve")
        }
        else {
            console.warn(String(HasBeverage));
            console.warn(String(BeverageArr1b));
            console.warn(String(BeverageArr2b));
            if (Beverage1Types.includes(String(BeverageArr1b))) {
                console.warn("Itemo Sutakko Wan")
                system.run(() => {
                    spawnItem(block, BeverageArr1b, 1)
                })


            }
            else if (Beverage2Types.includes(String(BeverageArr2b))) {
                console.warn("Itemo Sutakko Tsu")
                system.run(() => {
                    spawnItem(block, BeverageArr2b, 1)
                })
            }
        }
    }
    else if (block.typeId == "spimton:cellar") {
        const permu = block.permutation.getState("spimton:cooking")
        const beve = block.permutation.getState("spimton:beverage")
        if (permu == "yes") {
            system.run(() => {
                if (beve === "scrumpy") spawnItem(block, "minecraft:apple", 1);
                if (beve === "seye") spawnItem(block, "minecraft:fermented_spider_eye", 1);
                if (beve === "wwine") { spawnItem(block, "minecraft:fermented_spider_eye", 1); spawnItem(block, "minecraft:bone_meal", 1) };
                spawnItem(block, "spimton:grape_bottle", 1)
            })
        }
        else if (permu == "done") {
            system.run(() => {
                if (beve === "wine") {
                    spawnItem(block, "spimton:random_wine_" + String(getRandomInt(1, 9)), 1)
                }
                else if (beve === "scrumpy") {
                    spawnItem(block, "spimton:scrumpy_" + String(getRandomInt(1, 3)), 1)
                }
                else if (beve === "wwine") {
                    spawnItem(block, "spimton:random_wine_w" + String(getRandomInt(1, 5)), 1)
                }
                else if (beve === "seye") {
                    spawnItem(block, "spimton:random_wine_f" + String(getRandomInt(1, 1)), 1)
                };
            })
        }
    }
    else if (block.typeId == "spimton:big_keg") {
        const wheat = block.permutation.getState("spimton:wheat")
        const sugar = block.permutation.getState("spimton:sugar");
        system.run(() => {
            spawnItem(block, "spimton:keg_v1", 1);
            if (wheat > 0) {
                console.warn(wheat)
                spawnItem(block, "minecraft:wheat", wheat)
            };
            if (sugar > 0) {
                spawnItem(block, "minecraft:sugar", sugar)
            };
        });
        const player = c.player
        const mainhand = player.getComponent("equippable").getEquipmentSlot("mainhand");
        if (!mainhand.hasItem()) return;
        const item = c.itemStack
        const encha = item.getComponent("enchantable")
        if (!encha) return;
        const ench = encha.getEnchantment("silk_touch").level
        if (ench == 1) {
            system.run(() => {
                block.setType("air")
            })
            c.cancel = true;
        }
    }
})


system.beforeEvents.startup.subscribe(diec => {
    diec.blockComponentRegistry.registerCustomComponent("spimton:dice", {
        onPlayerInteract: arg => {
            const block = arg.block
            let result = getRandomInt(1, 6)
            block.setPermutation(block.permutation.withState("spimton:die", result))
            const entity = arg.player
            entity.sendMessage(`You rolled the §eD6§f and got a §e${result}§f!`)
        }
    })
})

system.beforeEvents.startup.subscribe(blues => {
    blues.blockComponentRegistry.registerCustomComponent("spimton:bluestone_block", {
        onRedstoneUpdate: arg => {
            const block = arg.block
            const power = arg.powerLevel
            block.setPermutation(block.permutation.withState("spimton:powaa", power))
        }
    })
})

const kegCold = [
    "minecraft:packed_ice",
    "minecraft:ice",
    "minecraft:blue_ice",
    "spimton:chillgem_block",
]
const kegHot = [
    "minecraft:magma",
    "minecraft:fire",
    "minecraft:lava",
    "spimton:lava_lamp",
    "minecraft:soul_fire",
    "spimton:baleful_steel_block"
]

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent("spimton:kegg", {
        onTick(e) {
            const blockbelow = e.block.below()
            const keg = e.block
            const effectloc = keg.center()
            if (kegCold.includes(blockbelow?.permutation.type.id)) { keg.setPermutation(keg.permutation.withState("spimton:erature", 0)); keg.dimension.spawnParticle("minecraft:snowflake_particle", effectloc); }
            else if (kegHot.includes(blockbelow?.permutation.type.id)) { keg.setPermutation(keg.permutation.withState("spimton:erature", 2)); keg.dimension.spawnParticle("minecraft:lava_particle", effectloc); }
            else { keg.setPermutation(keg.permutation.withState("spimton:erature", 1)) };
        },
        onPlace: e2 => {
            const block = e2.block
            const permutations = block.permutation.getAllStates()
            const cardinalDire = permutations["minecraft:cardinal_direction"]
            CheckForBigKeg(block, cardinalDire)
        }
    })
})

function CheckForBigKeg(block, cardinal) {
    let BigKeg = []
    let IsAvailable = true;
    if (cardinal === "north") {

        BigKeg = [
            block,
            block.west(),
            block.west().north(),
            block.north(),
            block.above(),
            block.above().west(),
            block.above().west().north(),
            block.above().north()
        ]
    }
    else if (cardinal === "south") {

        BigKeg = [
            block,
            block.east(),
            block.east().south(),
            block.south(),
            block.above(),
            block.above().east(),
            block.above().east().south(),
            block.above().south()
        ]
    }
    else if (cardinal === "west") {

        BigKeg = [
            block,
            block.south(),
            block.south().west(),
            block.west(),
            block.above(),
            block.above().south(),
            block.above().south().west(),
            block.above().west()
        ]
    }
    else if (cardinal === "east") {

        BigKeg = [
            block,
            block.north(),
            block.north().east(),
            block.east(),
            block.above(),
            block.above().north(),
            block.above().north().east(),
            block.above().east()
        ]
    };
    BigKeg.every(Part => {
        const ID = Part.typeId
        console.warn(ID + "PART")
        if (ID != "spimton:keg_v1") {
            IsAvailable = false
            return false;

        };

        return true;
        //Check
    });

    if (IsAvailable === false) return;
    BigKeg.forEach((Part, index) => {
        const permutation = BlockPermutation.resolve("spimton:big_keg", {
            "spimton:part": index,
            "minecraft:cardinal_direction": cardinal

        })
        Part.setPermutation(permutation);
        block.dimension.playSound("sfx.deltarune_boom", Part.center())
        block.dimension.spawnParticle("spimton:deltarune_explosion_multiple", Part.center())
    });
    return BigKeg;



}//block.north().typeId === "spimton:keg_v1" && block.west().typeId === "spimton:keg_v1" && block.north().west().typeId === "spimton:keg_v1" && block.above().typeId === "spimton:keg_v1" && block.above().north().typeId === "spimton:keg_v1" && block.above().west().typeId === "spimton:keg_v1" && block.above().west().north().typeId === "spimton:keg_v1"


system.beforeEvents.startup.subscribe(aaa => {
    aaa.blockComponentRegistry.registerCustomComponent("spimton:biggu_keggu", {
        onBreak: ar => {
            const { block, brokenBlockPermutation } = ar
            const cardinal = brokenBlockPermutation.getState("minecraft:cardinal_direction")
            const part = brokenBlockPermutation.getState("spimton:part")
            const Keg = GetBigKeg(block, cardinal, part);
            const dire = BlockPermutation.resolve("spimton:keg_v1", {
                "minecraft:cardinal_direction": cardinal
            })
            Keg.forEach((Part) => {
                if (Part != block) Part.setPermutation(dire);
            })
        },
        onTick: arr => {
            const { block } = arr
            const part = block.permutation.getState("spimton:part")
            const Keg = GetBigKeg(block, block.permutation.getState("minecraft:cardinal_direction"), part)
            if (Keg.every(BelowKegColdState)) {
                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState("spimton:erature_big", "cold"))
                    Part.dimension.spawnParticle("minecraft:snowflake_particle", Part.center())
                })
            }
            else if (Keg.every(BelowKegHotState)) {
                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState("spimton:erature_big", "hot"))
                    Part.dimension.spawnParticle("minecraft:lava_particle", Part.center())
                })
            }
            else {
                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState("spimton:erature_big", "temperate"))
                })
            };

        },
        onPlayerInteract: arrr => {
            console.warn("INTER")
            const { player, block } = arrr
            const equippable = player.getComponent("equippable")
            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand)
            const Erature = block.permutation.getState("spimton:erature_big")
            const Ferment0 = block.permutation.getState("spimton:wheat")
            const Ferment2 = block.permutation.getState("spimton:sugar")
            const IsFermented = block.permutation.getState("spimton:fermented")
            const Keg = GetBigKeg(block, block.permutation.getState("minecraft:cardinal_direction"), block.permutation.getState("spimton:part"))
            if (!mainhand.hasItem()) {
                console.warn("should show")
                player.runCommand(`title @s actionbar §lKeg Storage:§r\nWheat: ${Ferment0}/14\nSugar: ${Ferment2}/7\nContent: ${IsFermented ? "§aFermented" : "§cNot fermented"}§r\nTemperature: ${Erature}`)
            }
            else if (mainhand.typeId === "minecraft:wheat") {
                console.warn("wheat");
                if (block.permutation.getState(`spimton:wheat`) >= 14) {
                    block.setPermutation(block.permutation.withState(`spimton:wheat`, 14))
                    return;
                }

                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 + 1))
                    Part.dimension.spawnParticle("minecraft:dust_plume", Part.center())
                    Part.setPermutation(Part.permutation.withState("spimton:fermented", false))
                });

                block.dimension.playSound("entity.generic.splash", block.center(), { volume: 1 })
                if (player.getGameMode() == GameMode.Creative) return;
                if (mainhand.amount > 1) {
                    mainhand.amount--
                }
                else mainhand.setItem(undefined);
            }
            else if (mainhand.typeId === "minecraft:sugar") {
                console.warn("sugar");
                if (block.permutation.getState(`spimton:sugar`) >= 7) {
                    block.setPermutation(block.permutation.withState(`spimton:sugar`, 7))
                    return;
                }

                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 + 1))
                    Part.dimension.spawnParticle("minecraft:dust_plume", Part.center())
                    Part.setPermutation(Part.permutation.withState("spimton:fermented", false))
                });

                block.dimension.playSound("entity.generic.splash", block.center(), { volume: 1 })
                if (player.getGameMode() == GameMode.Creative) return;
                if (mainhand.amount > 1) {
                    mainhand.amount--
                }
                else mainhand.setItem(undefined);
            }
            else if (mainhand.typeId === "spimton:mug") {
                console.warn("MUGG")
                if (Ferment0 < 2 || Ferment2 < 1 || !IsFermented) return;
                switch (Erature) {
                    case "cold":
                        spawnItem(block, "spimton:vodka", 1)
                        break;
                    case "temperate":
                        spawnItem(block, "spimton:goblin_beer", 1)
                        break;
                    case "hot":
                        spawnItem(block, "spimton:ale", 1)
                        break;
                };
                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState(`spimton:wheat`, Part.permutation.getState(`spimton:wheat`) - 2))
                    Part.setPermutation(Part.permutation.withState(`spimton:sugar`, Part.permutation.getState(`spimton:sugar`) - 1))
                    //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))
                });
                if (player.getGameMode() == GameMode.Creative) return;
                if (mainhand.amount > 1) {
                    mainhand.amount--
                }

                else mainhand.setItem(undefined);
            }
            else if (mainhand.typeId === "spimton:random_bottle") {
                if (Ferment0 < 1 || Ferment2 < 1) return;
                if (IsFermented) {
                    console.warn("Bottlo")
                    switch (Erature) {
                        case "cold":
                            Keg.forEach((Part) => {
                                Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 - 1))
                                Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 - 1))
                                //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))

                            })
                            spawnItem(block, "spimton:random_vodka", 1);
                            break;
                        case "temperate":
                            Keg.forEach((Part) => {
                                Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 - 1))
                                Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 - 1))
                                //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))

                            })
                            spawnItem(block, `spimton:random_lager_${getRandomInt(1, 3)}`, 1);
                            break;
                        case "hot":
                            Keg.forEach((Part) => {
                                Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 - 1))
                                Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 - 1))
                                //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))

                            })
                            spawnItem(block, `spimton:random_ale_${getRandomInt(1, 6)}`, 1);
                            break;
                    };
                    if (player.getGameMode() == GameMode.Creative) return;
                    if (mainhand.amount > 1) {
                        mainhand.amount--
                    }
                }
                else {
                    switch (Erature) {
                        case "cold":
                            Keg.forEach((Part) => {
                                Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 - 1))
                                Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 - 1))
                                //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))

                            })
                            spawnItem(block, `spimton:crude_vodka`, 1);
                            break;
                        case "temperate":
                            Keg.forEach((Part) => {
                                Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 - 1))
                                Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 - 1))
                                //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))

                            })
                            spawnItem(block, `spimton:crude_lager`, 1);
                            break;
                        case "hot":
                            Keg.forEach((Part) => {
                                Part.setPermutation(Part.permutation.withState("spimton:wheat", Ferment0 - 1))
                                Part.setPermutation(Part.permutation.withState("spimton:sugar", Ferment2 - 1))
                                //Part.setPermutation(Part.permutation.withState("spimton:fermented", false))

                            })
                            spawnItem(block, `spimton:crude_ale`, 1);
                            break;
                    };
                    if (player.getGameMode() == GameMode.Creative) return;
                    if (mainhand.amount > 1) {
                        mainhand.amount--
                    }
                }
            } else console.warn("NOOO")

        },
        onRandomTick: arrrr => {
            const block = arrrr.block
            console.warn("Random Tick")
            const permutations = block.permutation.getAllStates()
            const Keg = GetBigKeg(block, permutations["minecraft:cardinal_direction"], permutations["spimton:part"]);
            if (!permutations["spimton:fermented"] && Math.random() > 0.67 + (permutations["spimton:wheat"] / 50) && permutations["spimton:sugar"] > 0) {
                console.warn("AAAA");
                Keg.forEach((Part) => {
                    Part.setPermutation(Part.permutation.withState("spimton:fermented", true))
                    //Part.dimension.playSound("random.potion_brewed", Part.center())
                })
            }
        }
    })
})

function BelowKegColdState(block) {
    if (block.permutation.getState("spimton:part") < 4) return kegCold.includes(block.below().typeId);
    return true;
}
function BelowKegHotState(block) {
    if (block.permutation.getState("spimton:part") < 4) return kegHot.includes(block.below().typeId);
    return true;
}



function GetBigKeg(block, cardinal, part) {
    let BigKeg = []
    if (cardinal === "north") {
        switch (part) {
            case 0:
                BigKeg = [
                    block,
                    block.west(),
                    block.west().north(),
                    block.north(),
                    block.above(),
                    block.above().west(),
                    block.above().west().north(),
                    block.above().north()
                ]
                break;
            case 1:
                BigKeg = [
                    block.east(),
                    block,
                    block.north(),
                    block.east().north(),
                    block.above().east(),
                    block.above(),
                    block.above().north(),
                    block.above().east().north()
                ]
                break;
            case 2:
                BigKeg = [
                    block.south().east(),
                    block.south(),
                    block,
                    block.east(),
                    block.above().south().east(),
                    block.above().south(),
                    block.above(),
                    block.above().east()
                ]
                break;
            case 3:
                BigKeg = [
                    block.south(),
                    block.south().west(),
                    block.west(),
                    block,
                    block.above().south(),
                    block.above().south().west(),
                    block.above().west(),
                    block.above()
                ]
                break;
            case 4:
                BigKeg = [
                    block.below(),
                    block.below().west(),
                    block.below().west().north(),
                    block.below().north(),
                    block,
                    block.west(),
                    block.west().north(),
                    block.north()
                ]
                break;
            case 5:
                BigKeg = [
                    block.below().east(),
                    block.below(),
                    block.below().north(),
                    block.below().east().north(),
                    block.east(),
                    block,
                    block.north(),
                    block.east().north()
                ]
                break;
            case 6:
                BigKeg = [
                    block.below().south().east(),
                    block.below().south(),
                    block.below(),
                    block.below().east(),
                    block.south().east(),
                    block.south(),
                    block,
                    block.east()
                ]
                break;
            case 7:
                BigKeg = [
                    block.below().south(),
                    block.below().south().west(),
                    block.below().west(),
                    block.below(),
                    block.south(),
                    block.south().west(),
                    block.west(),
                    block
                ]
                break;

        }
    }
    else if (cardinal === "south") {
        switch (part) {
            case 0:
                BigKeg = [
                    block,
                    block.east(),
                    block.east().south(),
                    block.south(),
                    block.above(),
                    block.above().east(),
                    block.above().east().south(),
                    block.above().south()
                ]
                break;
            case 1:
                BigKeg = [
                    block.west(),
                    block,
                    block.south(),
                    block.west().south(),
                    block.above().west(),
                    block.above(),
                    block.above().south(),
                    block.above().west().south()
                ]
                break;
            case 2:
                BigKeg = [
                    block.north().west(),
                    block.north(),
                    block,
                    block.west(),
                    block.above().north().west(),
                    block.above().north(),
                    block.above(),
                    block.above().west()
                ]
                break;
            case 3:
                BigKeg = [
                    block.north(),
                    block.north().east(),
                    block.east(),
                    block,
                    block.above().north(),
                    block.above().north().east(),
                    block.above().east(),
                    block.above()
                ]
                break;
            case 4:
                BigKeg = [
                    block.below(),
                    block.below().east(),
                    block.below().east().south(),
                    block.below().south(),
                    block,
                    block.east(),
                    block.east().south(),
                    block.south()
                ]
                break;
            case 5:
                BigKeg = [
                    block.below().west(),
                    block.below(),
                    block.below().south(),
                    block.below().west().south(),
                    block.west(),
                    block,
                    block.south(),
                    block.west().south()
                ]
                break;
            case 6:
                BigKeg = [
                    block.below().north().west(),
                    block.below().north(),
                    block.below(),
                    block.below().west(),
                    block.north().west(),
                    block.north(),
                    block,
                    block.west()
                ]
                break;
            case 7:
                BigKeg = [
                    block.below().north(),
                    block.below().north().east(),
                    block.below().east(),
                    block.below(),
                    block.north(),
                    block.north().east(),
                    block.east(),
                    block
                ]
                break;

        }
    }
    else if (cardinal === "west") {//North => West, West => South, South => East, East => North
        switch (part) {
            case 0:
                BigKeg = [
                    block,
                    block.south(),
                    block.south().west(),
                    block.west(),
                    block.above(),
                    block.above().south(),
                    block.above().south().west(),
                    block.above().west()
                ]
                break;
            case 1:
                BigKeg = [
                    block.north(),
                    block,
                    block.west(),
                    block.north().west(),
                    block.above().north(),
                    block.above(),
                    block.above().west(),
                    block.above().north().west()
                ]
                break;
            case 2:
                BigKeg = [
                    block.east().north(),
                    block.east(),
                    block,
                    block.north(),
                    block.above().east().north(),
                    block.above().east(),
                    block.above(),
                    block.above().north()
                ]
                break;
            case 3:
                BigKeg = [
                    block.east(),
                    block.east().south(),
                    block.south(),
                    block,
                    block.above().east(),
                    block.above().east().south(),
                    block.above().south(),
                    block.above()
                ]
                break;
            case 4:
                BigKeg = [
                    block.below(),
                    block.below().south(),
                    block.below().south().west(),
                    block.below().west(),
                    block,
                    block.south(),
                    block.south().west(),
                    block.west()
                ]
                break;
            case 5:
                BigKeg = [
                    block.below().north(),
                    block.below(),
                    block.below().west(),
                    block.below().north().west(),
                    block.north(),
                    block,
                    block.west(),
                    block.north().west()
                ]
                break;
            case 6:
                BigKeg = [
                    block.below().east().north(),
                    block.below().east(),
                    block.below(),
                    block.below().north(),
                    block.east().north(),
                    block.east(),
                    block,
                    block.north()
                ]
                break;
            case 7:
                BigKeg = [
                    block.below().east(),
                    block.below().east().south(),
                    block.below().south(),
                    block.below(),
                    block.east(),
                    block.east().south(),
                    block.south(),
                    block
                ]
                break;

        }
    }
    else if (cardinal === "east") {//North => West, West => South, South => East, East => North
        switch (part) {
            case 0:
                BigKeg = [
                    block,
                    block.north(),
                    block.north().east(),
                    block.east(),
                    block.above(),
                    block.above().north(),
                    block.above().north().east(),
                    block.above().east()
                ]
                break;
            case 1:
                BigKeg = [
                    block.south(),
                    block,
                    block.east(),
                    block.south().east(),
                    block.above().south(),
                    block.above(),
                    block.above().east(),
                    block.above().south().east()
                ]
                break;
            case 2:
                BigKeg = [
                    block.west().south(),
                    block.west(),
                    block,
                    block.south(),
                    block.above().west().south(),
                    block.above().west(),
                    block.above(),
                    block.above().south()
                ]
                break;
            case 3:
                BigKeg = [
                    block.west(),
                    block.west().north(),
                    block.north(),
                    block,
                    block.above().west(),
                    block.above().west().north(),
                    block.above().north(),
                    block.above()
                ]
                break;
            case 4:
                BigKeg = [
                    block.below(),
                    block.below().north(),
                    block.below().north().east(),
                    block.below().east(),
                    block,
                    block.north(),
                    block.north().east(),
                    block.east()
                ]
                break;
            case 5:
                BigKeg = [
                    block.below().south(),
                    block.below(),
                    block.below().east(),
                    block.below().south().east(),
                    block.south(),
                    block,
                    block.east(),
                    block.south().east()
                ]
                break;
            case 6:
                BigKeg = [
                    block.below().west().south(),
                    block.below().west(),
                    block.below(),
                    block.below().south(),
                    block.west().south(),
                    block.west(),
                    block,
                    block.south()
                ]
                break;
            case 7:
                BigKeg = [
                    block.below().west(),
                    block.below().west().north(),
                    block.below().north(),
                    block.below(),
                    block.west(),
                    block.west().north(),
                    block.north(),
                    block
                ]
                break;

        }
    };
    return BigKeg;
}