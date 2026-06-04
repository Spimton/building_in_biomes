import { world } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"
import { ModalFormData } from "@minecraft/server-ui"
import { MessageFormData } from "@minecraft/server-ui"

world.afterEvents.itemUse.subscribe(event => {
    const item = event.itemStack.typeId
    var player = event.source

    if (item === 'spimton:guide_book') {
        Book1(player)
    }
    if (item === 'spimton:ancient_tablet') {
        Sculpt(player)
    }
    if (item === 'spimton:boss_guide')
        Book2(player)
    if (item === 'spimton:block_guide')
        BookBlocks(player)
})

function Sculpt(player) {
    let MennS = new ActionFormData()
    MennS.title("Sculption Templates List")
    MennS.body("Select the template to convert the Tablet to a Sculpture Template.\nBronze Statues require a block of bronze to be crafted and Mud ones require mud bricks")
    MennS.button("§vBronze Statue§r: Sit")
    MennS.button("§vBronze Statue§r: Player")
    MennS.button("§vBronze Statue§r: Creeper")
    MennS.button("§vBronze Statue§r: Scared")
    MennS.button("§vBronze Statue§r: Dance")
    MennS.button("§vBronze Statue§r: WRYYYYYYY")
    MennS.button("§nMud Statue§r: Healthy")
    MennS.button("§nMud Statue§r: Calm")
    MennS.button("§nMud Statue§r: Brute")
    MennS.button("§nMud Statue§r: Curious")
    MennS.button("§nMud Statue§r: Tough")
    MennS.button("§mCrimstone Statue§r: Healthy")
    MennS.button("§mCrimstone Statue§r: Calm")
    MennS.button("§mCrimstone Statue§r: Brute")
    MennS.button("§mCrimstone Statue§r: Curious")
    MennS.button("§mCrimstone Statue§r: Tough")
    MennS.show(player).then(r => {
        if (r.canceled) return

        switch (r.selection) {
            case 0:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:sit_template 1 0")
                break

            case 1:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:player_template 1 0")
                break
            case 2:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:creeper_template 1 0")
                break
            case 3:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:scared_template 1 0")
                break
            case 4:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")

                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:dance_template 1 0")
                break
            case 5:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")

                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:wryyy_template 1 0")
                break
            case 6:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:healthy_template 1 0")
                break
            case 7:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:calm_template 1 0")
                break
            case 8:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:brute_template 1 0")
                break
            case 9:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:curious_template 1 0")
                break
            case 10:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:tough_template 1 0")
                break
            case 11:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:healthy_template_c 1 0")
                break
            case 12:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:calm_template_c 1 0")
                break
            case 13:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:brute_template_c 1 0")
                break
            case 14:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:curious_template_c 1 0")
                break
            case 15:
                player.runCommand("clear @s spimton:ancient_tablet 0 1")
                player.playSound("random.anvil_break")
                player.runCommand("give @s spimton:tough_template_c 1 0")
                break
        }
    })
}

// Main Form
function Book1(player) {
    let BookForme = new ActionFormData()

    BookForme.title("Building in Biomes Guide Book")
    BookForme.body("Hey every! This manual contains information about the Building in Biomes[tm] features and what you can expect in your world with this add-on installed!")
    BookForme.button("§1Vanilla Stuff")
    BookForme.button("§1New Materials")
    BookForme.button("§1Mechanics")
    BookForme.button("§1Bosses")

    BookForme.show(player).then(r => {
        if (r.canceled) return

        switch (r.selection) {
            case 0:
                Page1(player)
                break

            case 1:
                Page2(player)
                break
            case 2:
                Page3(player)
                break
            case 3:
                Page4(player)
                break
        }
    })
}

// Pages
function Page1(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1Vanilla Stuff")
    BookForme.body("This add-on, other than all-new building blocks, adds some variations to vanilla blocks, all available within the recipe book\n\n\n\nNow I am too lazy to write down all the recipes, so I hope you found a port of §9Just Enough Items§r for 1.21.100!")
    BookForme.button("Back to Menu")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Book1(player)
                break

        }
    })
}
//abcdefghijklmnopqrstuvwxyz


function Page2(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1New Materials")
    BookForme.body("Along with new vanilla-like building blocks, this addon introduces all new resources to enrich your survival experience or transform it into misery.")
    BookForme.button("Back to Menu")
    BookForme.button("Chillgem")
    BookForme.button("Minerals")
    BookForme.button("Rocks")
    BookForme.button("Others")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Book1(player)
                break
            case 1:
                PageChillgem(player)
                break
            case 2:
                PageMinerals(player)
                break
            case 3:
                PageRocks(player)
                break
            case 4:
                PageOthers(player)

        }
    })
}

function PageChillgem(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1Chillgem")
    BookForme.body("Found in the coldest of places, Chillgem is a rare material dropped by Chillagers, an Illager variant that can attack with ice moves. Three variants exist, with each having different abilities and clothes color.\n\nChillgem can be used to convert stone into Chillstone, a new blockset that has many variations and can be 'defrosted' in a blast furnace to maintain the stone texture, but leave ice patches on it.\n\nIf you have trouble with the mobs, you can gamble away your hard-earned Chillgems and try to gain more. They can be crafted in a block that yields from 2 to 6 pieces whilst costing 4. Keep in mind that the drop IS NOT affected by fortune.")
    BookForme.button("Back to Menu")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) Page2(player)
    })
}
function PageMinerals(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1Minerals")
    BookForme.body("While caving, you are most certainly to run into new ores added by this addon. Below are documented the types of ores you will find.\n\n§lLead§r is a purple-ish ore found most commonly around y=40. It is mainly a building block, but can be used to make other things. Be careful when mining it though...\n\n§lTin§r is a common material found in equal quantity throughout Y layers. It can be used to make Cans, which store both food and stews!\n\n§lJade§r is a gem found in mountain biomes. When mining the ore you can find a rare Imperial Jade. Both are mostly used for decorational blocks.\n\n§lBismuth§r is an ore found only in nether biomes. Despite its rarity, it can only be used for making gay versions of Vanilla blocks, nothing more.\n\n§lSilver§r is the first ore I added to the addon, only found in cold biomes\ndue to the original\n       theme of the addon being ice stuff. It is used for Totems and other magical stuff via Silver Orbs.\n\nLast and not least, §lAsbestos§r! In stone layers it's difficult to spot, and one wrong move will result in Lung Cancer! Asbestos is the most dangerous resource in the add-on: not even lead houses create that much damage to the environment! I'll let you imagine what happens.")
    BookForme.button("Back to Menu")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) Page2(player)
    })
}
function PageRocks(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1Rocks")
    BookForme.body("Other than ores, I added new stone types you can find underground. If diorite and granite weren't enough be ready for these:\n\n§lHighrock§r is a black version of andesite found in the highest of mountains. Its blockset is ripped off MCD. With it you can make Cragrock, another MCD block.\n\nNot ripped off MCD but off Alex's Caves there is §lLimestone§r. Found in trail ruins biomes this stone generates in small patches. It can be used to make primitive tools and Siltstone, another rock. A Red variant is found in Jungle Biomes.\n\nWith ores you can make new stone blocksets, such as Galena(made from lead) and Shale(made from silver). With Time in a Bottle, it's possible to craft antique variants of Stone and Sandstone blocks.")
    BookForme.button("Back to Menu")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) Page2(player)
    })
}
function Page3(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1Mechanics")
    BookForme.body("If you think Minecrap recipes are too simple, I kind of disagree. Of course, if you're a pro and play §eHBM NTM§R (§eH§rerbert §eB§ray §eM§richael's e§eN§rdless a§eT§romic bo§eM§rbs) 24/7 you will be let down when you'll discover these recipes are not that complex either. You just need 3 more reskinned crafting tables in your workshop (OreUI, i am prepared come at me RAHHHHH).")
    BookForme.button("Back to Menu")
    BookForme.button("Brewing")
    BookForme.button("Forging")
    BookForme.button("Manufacturing")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Book1(player)
                break
            case 1:
                Brewing(player)
                break
            case 2:
                Forging(player)
                break
            case 3:
                Sculpting(player)
                break

        }
    })
}
function PageOthers(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Other Stuff")
    BookForme.body("Deep in caves you can find Guano, which is basically bat poop. The substance can be used to make questionable building blocks and nothing else if I remember correctly.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page2(player)
                break

        }
    })

}
function Brewing(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Brewing")
    BookForme.body("If damaging your brain and lungs wasn't enough, let me introduce you to brewing! This add-on offer more than 10 alcoholics for you to drink!\n\nBefore you think about getting drunk, you need to craft a Keg. From there, you can decide its temperature by putting certain block under it. Then, you can craft mugs and start gathering resources for your beverages!\n\nEach temperautre has its own recipes, shown in the crafting menu. They are all common ingredients, except grapes, which can be found in savannas.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page3(player)
                break

        }
    })

}
function Forging(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Forging")
    BookForme.body("When I play survival, I don't rush at diamond equipment, especially without a reliable mending source. But the gap between Diamond and Iron is too much, so I added new sets of tools that are ridicolously tedious to make.\n\nTo begin Forging, you must find Bluestone ore in caves and craft an Alloy Forge. The block can only be used when heated, and different items grant different heat. Coal Blocks heat up by 750 degrees, Lava by 1500 and Blaze Rods by 2250. The heat will run out eventually, so lit the block only when you need to craft.\n\nVarious Alloys can be made, such as Electrum used for decoration/accessories, Bronze used to make tools and decorational blocks and Steel, the best alloy for tools, since they come with Unbreaking 2.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page3(player)
                break

        }
    })

}
function Sculpting(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Archaeology")
    BookForme.body("You found pottery sherds but you don't want to use them because you have too few? With the new Archaeology Table found in Savanna Ruins you cna duplicate pottery sherds.\n\nIn those ruins you can also find blueprints for statues, which can be sculpted in the same workstation.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page3(player)
                break

        }
    })

}
function Page4(player) {
    let BookForme = new ActionFormData()

    BookForme.title("§1Bosses")
    BookForme.body("You thought you could build all you want with your new blocks? Of course not, and the Almighty §vMichael Bay§r is §ePISSED§r off. He sent three bosses at the world's edge, on a quest to blow up your [Heaven].\n\nUnfortunately, §4Heroin§r made the three bosses go mad and the rest is history.\n\nA full guide on how to defeat them is documented elsewhere, so here I'll cover only their rewards.")
    BookForme.button("Back to Menu")
    BookForme.button("§aOvergrown Archshaman")
    BookForme.button("§cThe Weeper")
    BookForme.button("§9Champion of Justice")
    BookForme.button("§5Heroin (Non fightable)")
    BookForme.button("§gSans Bay (NYI)")

    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Book1(player)
                break
            case 1:
                PageArchshaman(player)
                break
            case 2:
                PageWeeper(player)
                break
            case 3:
                PageJuandice(player)
                break
            case 4:
                PageHeroin(player)
                break
            case 5:
                PageSansbay(player)
                break

        }
    })
}


function PageArchshaman(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Overgrown Archshaman")
    BookForme.body("The Archshaman is a skeleton pyromancer that lives in the Overgrown Pyramid. He is sealed in the inner chamber, so he avoids causing wildfires.\n\nHis drop is difficult to obtain, as it can burn in the fire or get blown up by the boss' final attack. It can be used to make Staves, one to control time and the other to blow up stuff.\n\nThe Orb can be placed down and interacted with either a Clock or a Blaze Rod to do time and explosion related shenanigans.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page4(player)
                break

        }
    })
}

function PageWeeper(player) {
    let BookForme = new ActionFormData()
    BookForme.title("The Weeper")
    BookForme.body("Unlike other bosses, the Weeper isn't fought in its structure, and you don't want to fight it there unless you're a masochist. It drops a Platinum Star, which can be made into Gauntlets and Cannons if combined with Sitltstone. You can also craft a Storm Horn, which changes the weather to Thunderstorm and a Tainted Beacon, which you can use to grant yourself limited time effects at the cost of resources.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page4(player)
                break

        }
    })
}
function PageJuandice(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Champion of Justice")
    BookForme.body("Upon defeating the boss by tiring out their Stand, the Champion of Justice will reward you with some Netherite and a Pure Diamond. With it, you can upgrade your steel armor to Championship tier, which comes with powerful movement abilities, or you can waste it on Unbreakable accessories. You can also make Hammers, which is alway appreciated.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page4(player)
                break

        }
    })
}
function PageHeroin(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Heroin")
    BookForme.body("What was only a rumored legend amongst our younger selves, Heroin is now (probably) in Building in Biomes. Despite what the documents found in the structures tell you, it was him who made the bosses lose their sanity and make them revolt against Michael Bay. Heroin cannote be fought nor found anywhere in the add-on files, but players should be gaslighted into thinking he's real. Become insane enough to defeat him and he will drop Heroin. I'll let your imagination make up what happens next.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page4(player)
                break

        }
    })
}
function PageSansbay(player) {
    let BookForme = new ActionFormData()
    BookForme.title("Sans Bay")
    BookForme.body("Fused with Sans Undertale out of spite, Sans Bay is your final opponent, who will judge you for your behaviour. Unfortunately, he remembers you're genocides of villagers you caused when you first got minecraft and played creative mode. You caused many explosions, but it isn't enought for Bay. He isn't in the game yet, and when added it will be a creative only mob.")
    BookForme.button("Back to Menu")
    BookForme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Page4(player)
                break

        }
    })
}


////////////////////////////////SSP///////////////////////////////////////////////////////          //////////////////////////////////



function Book2(player) {
    let Forme = new ActionFormData()
    Forme.title("Stand Sound Profiles")
    Forme.body("Handbook containing information regarding boss mobs")
    Forme.button("§aOvergrown Archshaman", "textures/ui/herbert")
    Forme.button("§cThe Weeper", "textures/ui/getreal")
    Forme.button("§9Champion of Justice", "textures/ui/blackknight")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Shaman(player)
                break
            case 1:
                Weeper(player)
                break
            case 2:
                Juandice(player)
                break
        }
    })
}
function Shaman(player) {
    let Forme = new ActionFormData()
    Forme.title("Overgrown Archshaman, the Michael Bay Enthusiast")
    Forme.body("The Overgrown Archshaman is an ancient sorcerer that wields extraordinary fire magic. He possesses a plethora of attacks that involve fiery projectiles, but has other tricks up his nonexistant sleeves.")
    Forme.button("General")
    Forme.button("Attacks")
    Forme.button("Strategy")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                General1(player)
                break
            case 1:
                Attacks1(player)
                break
            case 2:
                Strats1(player)
                break
            case 3:
                Book2(player)
                break
        }
    })
}
function Attacks1(player) {
    let Forme = new ActionFormData()
    Forme.title("Attacks")
    Forme.body("First and foremost, the boss keeps cycling between three different attack modes.\n\nThe first and most common one is the §aSpell Mode§r. It has the most abilities stored in it, so it lasts 25 seconds.\n\n-The first attack of this mode is the Fire Barrage. The boss plays a low-pitched fireworks sound before summoning fire walls on the ground. They have a 1x1x1 solid collision and deal damage on touch. They cannot be removed unless washed away with water and last practically forever.\n\n-The second attack is the Teleport Blast. You can recognize it by the line 'Nothing personal, kid' and the DBZ teleport sfx, and is important to do so because the Archshaman will teleport to you and summon six Meteors, which deal lots of damage if not dodged.\n\n-The third and most dangerous attack is the Meteor Shower. It has the recognizable sound cue that is the Deltarune explosion sfx followed by the iconic phrase 'Succumb to the power of Micheal Bay!' and consists in several meteors falling from the sky. It is by far the most devastating attack, even among other bosses, in terms of destruction: it's capable of destroying the entire structure in just a few casts.\n\n-The last attack of this mode is its Stand, Made in Heaven. It is a technique refined and perfected throughout the various years in the Temple, capable of accelerating the flow of time (but not the tick speed). Even though it is considered by Michael Bay the 'key to [[hyperlink blocked]]', the Archshaman doesn't see much utility in the stand, so after summoning him he immediatly consumes the body, healing the sorcerer to full health, making him able to use that ability over and over again.\n\n\nThe second attack mode is similar to the first, except he can only §asummon Goon(er)s§r. Before everything the Archshaman will consume every Fire Wall, healing for about 1/3 of its maximum health. Then, it will begin summoning goons, but the phase lasts about five seconds, and after that if there are allies that are still standing the Archshaman will consume them: the Warlocks will give him Absorption hearts and the Skirmishers will give him Resistance V.\n\nThe last and less likely to be used mode is §aBullet Hell§r. The boss will shout 'This is DARK SOULS!', for him to begin start blasting you with projectile-like meteors. They don't possess the same destructive capabilities of regular ones, but they still pack a punch.")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Shaman(player)
                break
        }
    })
}
function General1(player) {
    let Forme = new ActionFormData()
    Forme.title("General")
    Forme.body("The Overgrown Archshaman is the easiest boss to come across, found in jungle biomes in a giant pyramid(Stop saying pyramid, otherwise they'll find out we're illuminati!) in its inner chamber. The boss, after an encounter with Herbert Bay Michael, got obsessed with explosions and started studying fire magic. Eventually, everyone in the structure with a shape of a solid that has triangular faces and a square base became a skeleton due to [Plot Hole].\n\nThe Archshaman tried to rejoice with Michael, trying to replicate a portal to another dimension, but ultimately failed.\nEventually, he realized he was trapped in the structure with his treasure, so he decided to bind his soul to a block and if he was ever woken up by external forces he would destroy the temple because again of [Plot Hole].")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Shaman(player)
                break
        }
    })
}
function Strats1(player) {
    let Forme = new ActionFormData()
    Forme.title("Tactics")
    Forme.body("§a§lPremise§r\n\nEven though the boss has few health and has low mobility, it doesn't mean it will be an easy fight, especially for players that don't know what they are doing.\n\nFor starters, the arena will be covered in fire most of the time, therefore it's dangerous because if you die your items are going to be destroyes, other than the fact that you are going to take damage from the hazardous battlefield.\nSecond, the boss is very destructive: the pyramid will shield you from the first meteors, but it will take away all the precis materials it's made of. Avid players will dismantle the structure then die to the devastating meteor showers because they didn't have cover, so it's advised to create a roof made of blast-resistant materials, such as Obsidian or Asbestos (Cobblestone is too weak to sustain the attacks, but can be replenished fast).\n\nDuring the fight, it's important to pay attention to the sounds: each one corresponds to a certain attack, and knowing what the boss is going to throw at you can help in avoiding attacks, which will be discussed in the §aAttacks§r segment.\n\n§a§lLoadout§r\n\nAny decent armor is okay, as long as Fire and Blast protection are applied. Rather than normal protection, specific types are more effective due to the boss having two main damage sources: fire and explosions.\nAny smite sword is good, and a power bow is mandatory: Most of the time you'll end up far away from the boss due to its knockback roars and having to avoid attacks. A water bucked is as important as the ranged weapon, as you'll be set on fire very frequently, and if you know Bugrock Edition you'll understand how it feels having the fire overlay taking 80% of the screen. Fire Resistance is good too, but a Water Bucket can extinguish the fire wall. But keep in mind that without Depth Strider being in water is dangerous because the fight is about mobility and being in water reduces yours.\nAs for food, you have to bring canned food: being slowed down while eating is a chance for the opponent to finish you off easily, and you want to avoid it.\n\n§a§lAttacks§r\n\nAs stated in the 'Attacks' section of the Archshaman Boss, the enemy has three modes. The Spell one lasts the longest, while others last way less (25, 5, 5).\nYour goal is to deal as much damage to the boss in the least time possible, because he could use Made in Heaven at any moment. When in close range, the boss is most likely to use the Meteor Shower, which in the first few battles, when the roof of the arena is present, will only grant you the chance to deal a lot of damage and possibly fisish off the boss.\nWhen the boss is distant from you, it either uses the fire wall skill or teleport. As soon as you recognize the attack, it's best to run away in the most covered spot of the arena, because of two reason: the first, he summons 6 meteors where he teleports and the second is because you want the boss in a covered area: if you go far away, it's likely that he will teleport again to your location.\nDuring the Bullet Hell you have to keep in mind that the projectiles do not have a long reach and he will keep using them even when out of range.\nThe Gooner mode is much more dangerous: just avoid them and the Archshaman will consume them. The maximum effect duration for the Resistance is 10 seconds and the maximum absorption health is 16.")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Shaman(player)
                break
        }
    })
}
function Weeper(player) {
    let Forme = new ActionFormData()
    Forme.title("The Weeper, Michael Bay Connoisseur")
    Forme.body("The Weeper is a hovering mob that attacks anything it sees. It utilizes high explosive attacks to destroy the landscape and its victims")
    Forme.button("General")
    Forme.button("Attacks")
    Forme.button("Strategy")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                General2(player)
                break
            case 1:
                Attacks2(player)
                break
            case 2:
                Strats2(player)
                break
            case 3:
                Book2(player)
                break
        }
    })
}
function Attacks2(player) {
    let Forme = new ActionFormData()
    Forme.title("Attacks")
    Forme.body("To decide the attack that it should throw at its enemies, the runs a 30 seconds interval, then activates one of its four attack modes.\n\nThe first is the §cSummoner§r mode. In this setting the Weeper can summon either creepers or TNT in a circular pattern centered on the target.\n\nThe second mode is §cAssassain§r mode, which has three variants: The first shoots quick and small projectiles at a fast rate, the second one shoots big, fiery projectiles at a slower rate and the third one shoots projectiles that deploy TNT on impact.\n\nThe third mode is §cRam Mode§r: the boss charges towards you screaming 'I'm stil standing, and you're not going to be' and dealing damage.\n\nThe last mode is summoning its Stand (§cStar Platinum: The World§r), charging up energy, reducing your TPS to unleash a devastating ORA! punch dealing massive damage and consuming the Stand.")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Weeper(player)
                break
        }
    })
}
function General2(player) {
    let Forme = new ActionFormData()
    Forme.title("General")
    Forme.body("The Weeper. An aberration created by the ancient coders, such as Heroin (Notch's Lost Brother), that possesses the Geometry of a Wither with a Creeper texture slapped on it (The truth is that I didn't want to create a weeper texture). It had tremendous destructive capabilities, but not as much as the Wither, who can break Obsidian. The Ancient Builders, after seeing an onslaught of entities, set up a plan to capture the boss. In the meantime, the Weeper was §o§4getting stronger§r with the help of Micheal Bay, but not enough to break Obsidian. So, the ancient builders jumped it and sealed the creature in an obsidian cage and hid it in an underground crypt.")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Weeper(player)
                break
        }
    })
}
function Strats2(player) {
    let Forme = new ActionFormData()
    Forme.title("Tactics")
    Forme.body("§c§lPremise§r\n\nThe Weeper, unlike the other two bosses, doesn't have a set arena and spawn location. Instead, you decide where to fight it. The boss is very destructive, so to avoid having a crater in your world it's best to fight it in a blast resistant battlefield. It's advised to have a nearby bed so you can respawn and continue the fight before the Weeper changes target and destroys more stuff.\n\n§c§lLoadout§r\n\nDue to the boss being Wither-based, it's obvious that Blast protection is a must-have for this fight. Projectile Protection is good against the Assassain Mode, but not as important as Blast Protection. Of course, a bow will be your primary weapon, so make sure to enchant it with your best books. A shield will be handy, because you may not be able to dodge all explosions if you're stuck in a hole. Any food is good, but I recommend Regeneration Sus Stews: since the combat is still pre 1.9, natural regeneration is slow so Regeneration effects are fundamental.\n\n§c§lAttacks§r\n\nThe Boss switches between four modes:\n\nThe Summoner one spawns entities in a circular pattern, where the TNT attack starts from the outer circumference and goes to the inner one and the Creeper one starts from the inner circumference and goes to the outer one. While you can simply run away from the creepers, for the tnt attack the best you can do is wait for the outer TNTs to explode (therefore pushing the inner ones to the center of the attack), then run away or block with your shield.\n\nThe Assassain Mode isn't too complex, just run in a circle and try to not be hit. It's the hardest mode to completely avoid, and can be very dangerous especially if you don't escape in time.\n\nThe Charge mode is the easiest attack to dodge, simply shooting the boss is enough to slow it down and make it fail the attack. If anything, it's a free hit and the boss will lower its altitude, making it more vulnerable.\n\nThe Stand is a mighty yet easy attack to dodge. The boss will create a circle of fire walls and will (unintentionally) lower your TPS. After five seconds, it will unleash a powerful shockwave dealing 70 damage ot nearby entities. The radius is a bit lower than the flame ring, so get out of that area. Do not try to attack it as the game is slowed down and the boss will regenerate 1/3 of its health over the span of the charge.")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Weeper(player)
                break
        }
    })
}
function Juandice(player) {
    let Forme = new ActionFormData()
    Forme.title("Champion of Justice, Michael Bay Devotee")
    Forme.body("The Champion of Justice is the protector of the Nether. It was a great warrior that managed to master the power of lightning and exterminate hundreds of piglin and wither legions.")
    Forme.button("General")
    Forme.button("Attacks")
    Forme.button("Strategy")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                General3(player)
                break
            case 1:
                Attacks3(player)
                break
            case 2:
                Strats3(player)
                break
            case 3:
                Book2(player)
                break
        }
    })
}
function General3(player) {
    let Forme = new ActionFormData()
    Forme.title("General")
    Forme.body("The Champion of Justice, despite its title, isn't too keen on the 'Justice' part. He possesses a plethora of lightning-based attacks and a mighty Stand. Luckily, the arena has water so you can extinguish yourself from fire")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Juandice(player)
                break
        }
    })
}
function Attacks3(player) {
    let Forme = new ActionFormData()
    Forme.title("Attacks")
    Forme.body("Just like the Weeper and the Archshaman, the boss periodically switches between modes, with a 5 second pause for each switch.\n\nThe first mode is Electroball mode. The boss shoots a rapid burst of electric projectiles that deal damage on impact, but summon lighning if they miss, dealing much more damage that way.\n\nThe second attack is the Lightning Ring. The boss summons lighning bolts in various patterns, with the last one purposefully lagging your game.\n\nThe most dangerous attacks are this one and the move below: the Champion can decide to throw big explosive projectiles that deal an enormous amount of damage on impact and to the terrain: there is no surviving this unless you get out of the boss' line of sight.\n\nA much more tricky attack is the Domain Expansion: the boss applies many negative effects onto you that last 30 seconds.\n\nAfter being defeated, it unleashes its Stand, that has the same moves as the boss, only with less switch cooldown and more powerflu attack patterns. After five moves the boss collapses and extinguishes all the fire in the arena.")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Juandice(player)
                break
        }
    })
}
function Strats3(player) {
    let Forme = new ActionFormData()
    Forme.title("Tactics")
    Forme.body("§9§lPremise§r\n\nDespite being in the §o§kkr§r§oNether§kis§r, the arena has an abundant presence of water. This will be fundamental to keep, since most attacks set you on fire and you cannot place it back down. It's also advised not to destroy the columns. Unlike in the Archshaman fight, where they are just decoration, here they are the key to survival in case the boss uses ranged attacks. Every move of the boss is devastating if you don't know how to take cover.\n\n§9§lLoadout§r\n\nThe boss' attacks aren't too complex, but they do pack a punch, and unlike the other bosses they are mainly lightning-based. Normal Protection is recommended, and since the lightning bolts pierce your armor, any tier is good, what matters are the enchantments on it. A ranged weapon is optimal, but the boss' armor grants them a resistance to projectiles, and the boss won't be moving so things such as Potions and Brain Damage will help. One last important item is a Milk Bucket or anything that removes potion effects: the boss can inflict you several debuff with a potency of 256 that last 30 seconds with no warning.\n\n§9§lAttacks§r\n\n")
    Forme.button("Back")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:

                Juandice(player)
                break
        }
    })
}

function BookBlocks(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks" })
    Forme.body({ text: "Building in Biomes adds primarily building blocks. Down here are shown the main materials and blocks this add-on contains." })
    Forme.button({ text: "Stone-like Blocks" }, "textures/ui/emoji_stone2")
    Forme.button({ text: "Bizarre Stone-like Blocks" }, "textures/ui/emoji_stone1")
    Forme.button({ text: "Metallic Blocks" }, "textures/ui/emoji_alloyblock")
    Forme.button({ text: "Hazardous Blocks" }, "textures/ui/emoji_dangeris")
    Forme.button({ text: "Crystalline Blocks" }, "textures/ui/chill_emoji")
    Forme.button({ text: "Vanilla Material Blocks" }, "textures/blocks/otherstone/sea/granite_bricks")
    Forme.button({ text: "Building Tools" }, "textures/ui/emoji_tools")
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_1(player)
                break
            case 1:
                Blocks_2(player)
                break
            case 2:
                Blocks_3(player)
                break
            case 3:
                Blocks_4(player)
                break
            case 4:
                Blocks_5(player)
                break
            case 5:
                Blocks_6(player)
                break
            case 7:
                Blocks_7(player)
                break
        }
    })
}

function Blocks_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Stone-like" })
    Forme.body({ text: "This section covers blocks akin to stone: they are mostly found in nature, but can also be crafted" })
    Forme.button({ text: "Limestone/Siltstone" }, "textures/blocks/limestoneblocks/limestone")
    Forme.button({ text: "Highrock/Cragrocks" }, "textures/blocks/otherstone/highrock/gold_chiseled_highrock_bricks")
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_1_1(player)
                break
            case 1:
                Blocks_1_2(player)
                break
            case 2:
                BookBlocks(player)
                break
        }
    })
}
function Blocks_1_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Stone-like\n=Limestone/Siltstone=" })
    Forme.body({ text: "Limestone is a material commonly found in Taiga and Jungle biomes. You can also craft it, but that requires various blocks.\n\nMega taigas hold large quantiteso f it, so it's best to mine there if you need a lot of it.\n\nA red variant is also obtainable in Jungle biomes: it has the same texture but palette-swapped.\n\nYou can make Polished, Brick and Pillars out of this material, but it's also the key ingredient to making Siltstone.\n\nBeing a material originated from Minecraft Dungeons, it's not just a recoloration of vanilla patterns: almost every variation from the game has been ported.\n\nWith Limestone you can also craft Marble. While the material comes form MCD, the texture is taken from Nether Quartz. With Shale you can turn it into Slate Marble, a blue-colored version of the block." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_1(player)
                break
        }
    })
}
function Blocks_1_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Stone-like\n=Highrock/Cragrocks=" })
    Forme.body({ text: "Being known also as Black Andesite, Highrock is a material originating from the Howling Peaks of MCD.\n\nIt's found naturally in Stony Peak biomes, but it can also be crafted. It can make most of its blockset from Minecraft Dungeons.\n\nThe same thing applies for Cragrock, but this stone can only be crafted, form Highrock and Gravel" })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_1(player)
                break
        }
    })
}
function Blocks_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Bizarre Stone-like Block" })
    Forme.body({ text: "This section covers blocks akin to stone but derivated from other materials: their obtaining is trickier than normal blocks." })
    Forme.button({ text: "Jade Derivatives" }, "textures/blocks/jade_block")
    Forme.button({ text: "Metal Derivatives" }, "textures/blocks/otherstone/galena")
    Forme.button({ text: "Drop Derivatives" }, "textures/items/bottled_time")
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_2_1(player)
                break
            case 1:
                Blocks_2_2(player)
                break
            case 2:
                Blocks_2_3(player)
                break
            case 3:
                BookBlocks(player)
                break
        }
    })
}
function Blocks_2_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Bizarre Stone-like\n=Jade Derivatives=" })
    Forme.body({ text: "Instead of being found or crafted, Jade is extracted from its ore, found in mountain biomes. Once mined, it drops a few Jade and Imperial Jade chinks.\n\nBy combining it with Nether Wart you can make a chunk of Crimsite, which shares the texture with Jade blocks, but with a red tone.\n\nJade makes the building blocks found in Minecraft Dungeons, Imperial Jade tweaks the textures while being a more vibrant color and Crimsite being red and making Crimstone, a building block set that resembles packed mud." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_2(player)
                break
        }
    })
}
function Blocks_2_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Bizarre Stone-like\n=Metal Derivatives=" })
    Forme.body({ text: "This stone types are crafted by surrounding a metallic ingot with existing materials. While their palettes are limited, they can still be unique blocks to build with.\n\nGalena is made from Lead, and it only has Bricks, Smooth, Polished and Pillar variant. It has a striking purple palette.\n\nShale is made from Tuff and Silver. It's basically tuff but azure.\n\nWhilst Bismuth doesn't have building blocks, its homosexual properties can be combied with blocks to make them change colors continuously.\n\nNot craftable, but with a connection to silver is Temple Rock. Every time this stone is mined, it drops Pebbles, so make sure you mine it with Silk Touch." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_2(player)
                break
        }
    })
}
function Blocks_2_3(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Bizarre Stone-like\n=Drop Derivatives=" })
    Forme.body({ text: "This stone types are crafted by surrounding a mob drop with existing materials. The most unusual blocks of Building in Biomes.\n\nChillstone is the first ever block of the add-on, and it's made out of Stone and Chillgem. While the frosted blocks may not look pleasing, by putting them in a blast furnace you can remove the frosting on some blocks.\n\nGuano is an interesting building choice to say the least. Fortunately, you can make Guanostone, a beige-looking blockset with some very, very interesting patterns and shapes.\n\nWith Time in a Bottle, you can turn Sandstone and Stone Bricks into their 'antique' versions (Cacti Canyon). Perfect if you want to expand on the Desert Temple.\n\nWith Void Liquid and Endstone you can make End Basalt. Mainly decorative, as the variants are few.\n\nFinally, with Phantom Membrane and Stone Tiles you can make Gloom Tiles. Their main purpose is to craft traps out of them, by combibibg 8 of these blocks with Ectoplasm." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_2(player)
                break
        }
    })
}
function Blocks_3(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Metallic Blocks" })
    Forme.body({ text: "This section covers blocks made from Ores and Alloys." })
    Forme.button({ text: "Steel/Heavy Metal" }, "textures/items/alloy/metallicore_ingot")
    Forme.button({ text: "Bronze/Applen Gold" }, "textures/items/alloy/bronze_ingot")
    Forme.button({ text: "Kromium/Ancient Gold/Electrum" }, "textures/items/alloy/electrum_ingot")
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_3_1(player)
                break
            case 1:
                Blocks_3_2(player)
                break
            case 2:
                Blocks_3_3(player)
                break
            case 3:
                BookBlocks(player)
                break
        }
    })
}
function Blocks_3_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Metallic Blocks\n=Steel/Heavy Metal=" })
    Forme.body({ text: "Steel isn't only for tools. You can also craft Polished and Bricks versions that have excellent hardness and blast resistance!\n\nUnfortunately, the good blocks are locked behind Metallicore. These are themed around the heavy core." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_3(player)
                break
        }
    })
}
function Blocks_3_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Metallic Blocks\n=Bronze/Applen Gold=" })
    Forme.body({ text: "Bronze is more oriented towards building than steel. Other than classic blocks, with Bronze you can make Lanterns, Chains and even Statues!\n\nUnfortunately Applen Gold doesn't have as many blocks, but it still has a decent amount of variants with a red version of the bronze ones' texture." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_3(player)
                break
        }
    })
}
function Blocks_3_3(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Metallic Blocks\n=Kromium/Ancient Gold/Electrum=" })
    Forme.body({ text: "These three sets are known for their shiny appearence.\n\nElectrum is the basic alloy: its main use in not in decoration, so its blockset is limited compared to Ancient Gold.\n\nSpeaking of which, this is a block that cannot be obtained outside of the Overgrown mobs and structures. It sports one of the largest block set in the add-on. It can even be combied with Jade and Crimsite for cool checkered blocks.\n\nIts orange-ish palette is applied onto Electrum and Imperial Jade patterns, and it's made to be used alongside those materials.\n\nLastly there's Kromium, made from Ancient Gold and Bismuth. It changes its color from Pink to Gold, and possesses a moderate amount of variations." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_3(player)
                break
        }
    })
}
function Blocks_4(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Dangeris" })
    Forme.body({ text: "This section covers blocks with dangeris properties. Build at your own risk and peril." })
    Forme.button({ text: "Asbestos" }, "textures/items/ingot_asbestos")
    Forme.button({ text: "Lead" }, "textures/items/alloy/lead_ingot")
    Forme.button({ text: "Void Liquid" }, "textures/items/void_bottle")
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_4_1(player)
                break
            case 1:
                Blocks_4_2(player)
                break
            case 2:
                Blocks_4_3(player)
                break
            case 3:
                BookBlocks(player)
                break
        }
    })
}
function Blocks_4_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Dangeris\n=Asbesto=" })
    Forme.body({ text: "Asbestos is a resource found underground. Its ore looks like stone with white spots, so it's easy to not notice it and mine it anyway.\n\nAsbestos makes Concrete, Bricks, Roof and Tiles. While they possess excellent properties that make them an amazing choice when building resistant shelters, they all have in common the fact that they produce asbestos particles which are dangeris to inhale.\n\nIntially that don't do much, but if the exposure is prolonged you will recieve slight Lung Damage, which inflicts Slowness, eventually becoming Wither.\n\nWith Asbestos you can also make an Insulator block, which prevents your builds from catching on fire (most of the time)." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_4(player)
                break
        }
    })
}
function Blocks_4_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Dangeris\n=Lead=" })
    Forme.body({ text: "Lead is a metal used mainly for decorational blocks. Unlike copper, an ore known for being so abundant, lead is more scarce.\n\nMining its ore results in a cloud of dust particles, which inflicts slight Brain Damage. Raw lead can be smelted down into Ingots, which are dangeris to eat. In an Alloy Forge, High Toxicity Lead can be made, which straight up kills you if eaten.\n\nFortunately, Lead blocks don't produce dust particles." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_4(player)
                break
        }
    })
}
function Blocks_4_3(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Dangeris\n=Void=" })
    Forme.body({ text: "With a Water Bucket, you can pick up Void Blocks. Other than bottling them for crafting, you can trap your enemy with them, as they cannot be broken and their collision box is the one of a full block.\n\nWith Void blocks you can make a Void Barrel. Triggering it with a void block means death: within two seconds the barrel will explode, causing massive damage." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_4(player)
                break
        }
    })
}
function Blocks_5(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Kristalline" })
    Forme.body({ text: "This section covers blocks made from crystal gem shards" })
    Forme.button({ text: "Amethyst" }, "textures/items/amethyst_shard")
    Forme.button({ text: "Chillgem" }, "textures/items/chillgem_shard")
    Forme.button({ text: "Shadow Crystal" }, "textures/items/shadowcrystal")
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_5_1(player)
                break
            case 1:
                Blocks_5_2(player)
                break
            case 2:
                Blocks_5_3(player)
                break
            case 3:
                BookBlocks(player)
                break
        }
    })
}
function Blocks_5_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Kristals\n=Amethyst=" })
    Forme.body({ text: "When it came out in 1.17, Amethyst let down many fans as it only had 2 crafting recipes.\n\nBuilding in Biomes adds a few, but I'm here to talk about blocks. With 9 amethyst shards you can make a Compressed Amethyst block: from there you make Cut and Brick versions of it. Nothing special but they are cool blocks nonetheless." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_5(player)
                break
        }
    })
}
function Blocks_5_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Kristals\n=Chillgem=" })
    Forme.body({ text: "When Building in Biomes was still in its first iterations, I wanted a way to craft chillstone without going to the inexisting Windswept Glaciers biome.\n\nThat's when I remembered Chillagers, a mob I suggested for an Illager addon that's now discontinued. But I didn't want a BUILDING addon to include much fighting, so I opted for a better solution: GAMBLING.\n\nWith 4 chillgem shards, you can either get 2 to 6 back. It's a more or less reliable way of getting chillgem, but you will need it for the blocks.\n\nLike Amethyst, you can make Compressed, Cut and Brick variats of chillgem" })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_5(player)
                break
        }
    })
}
function Blocks_5_3(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Kristals\n=Shadow Crystal=" })
    Forme.body({ text: "Shadow Crystals are rare shards that are obtained through the closest disciples of Michael Bay. They are scarce but renewable, so they can be used for black versions of Chillgem and Amethyst blocks.\n\nLike Chillgem, you can gamble them away with Unstable Shadowcrystal Blocks: this time the prize ranges from 0 to 8, so it's definitely more extreme." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_5(player)
                break
        }
    })
}
function Blocks_6(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Vanilla" })
    Forme.body({ text: "This section covers blocks made from vanilla blocksets" })
    Forme.button({ text: "Stone" }, "textures/blocks/otherstone/stone_tiles")
    Forme.button({ text: "Prismarine" }, "textures/items/primarine_shard")
    Forme.button({ text: "Ender" }, "textures/blocks/otherstone/endstone/endstone_tiles")
    Forme.button({ text: "Terracotta" }, "textures/blocks/clayworks/terracotta_bricks")
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_6_1(player)
                break
            case 1:
                Blocks_6_2(player)
                break
            case 2:
                Blocks_6_3(player)
                break
            case 3:
                Blocks_6_4(player)
                break
            case 4:
                BookBlocks(player)
                break
        }
    })
}
function Blocks_6_1(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Vanilla\n=Stone=" })
    Forme.body({ text: "During early develpoment (when biomes were the scope of the addon) I was adding various chillstone building blocks. Then I played a hide and seek match on §oThe Hive§r, and I was so stunned by the new custom blocks I couldn't not add them.\n\nSince then, I've added Cut Stone and Stone Tiles along with Pillars from MCD and new cobblestone bricks, tiles and Mosaic variations.\n\nOther kinds of stone types got way less, but I've added some blocks to both Calcite and Granite." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_6(player)
                break
        }
    })
}
function Blocks_6_2(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Vanilla\n=Prismarine=" })
    Forme.body({ text: "People complain about the ocean monument beacuse it has very few rewards (by that they mean the 8 gold blocks and sponges). However, I think that the prismarine blockset is slept on by most players.\n\nSo, with my trusty https://minecraft.wiki/w/Category:Minecraft_Dungeons_prefab_textures, I've added MCD-themed prismarine blocks. One thing to nothe is that they don't change color due to laziness, not bedrock limitations." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_6(player)
                break
        }
    })
}
function Blocks_6_3(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Vanilla\n=End Stone=" })
    Forme.body({ text: "Oh look Goety (a minecraft java mod that is not a MCD port) has added end blocks!\n\nAnyways, they are in building in biomes! I'm surprised not many people port MCD blocks into the game, as they are very well made. Other than the MCD ones, I've also added new variations, made with chorus fruit." })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_6(player)
                break
        }
    })
}
function Blocks_6_4(player) {
    let Forme = new ActionFormData()
    Forme.title({ text: "Building Blocks - Vanilla\n=Terracotta=" })
    Forme.body({ text: "When I added these blocks, I had the same experience as with stone. I saw these blocks on the Hive and decided to add them. Now terracotta can be made into bricks!\n\nTeam Abnormals? Clayworks? Caverns and Chasms? I hardly know 'er!" })
    Forme.button({ text: "Back" })
    Forme.show(player).then(r => {
        if (r.canceled) return
        switch (r.selection) {
            case 0:
                Blocks_6(player)
                break
        }
    })
}