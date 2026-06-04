import { EquipmentSlot, GameMode, world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
/**
 * @param {number} min The minimum integer
 * @param {number} max The maximum integer
 * @returns {number} A random integer between the `min` and `max` parameters (inclusive)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maxGrowth = 7;

/** @type {import("@minecraft/server").BlockCustomComponent} */
const OvergrownBossSpawner = {
    onPlayerInteract({ block, dimension, player }) {
        if (!player) return;

        const equippable = player.getComponent("minecraft:equippable");
        if (!equippable) return;

        const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
        if (!mainhand.hasItem() || mainhand.typeId !== "spimton:overgrown_amulet") {
            player.runCommand("title @p actionbar The Altar needs an §aAmulet§f to activate...")
            return;
        }
        const activated = block.permutation.getState("spimton:activated")
        if (activated == false) {
            player.runCommand("title @p actionbar The Altar's Soul §vis not ready yet§f...")
            return;
        }


        block.setPermutation(block.permutation.withState('spimton:activated', false))

        // Decrement stack
        if (mainhand.amount > 1) mainhand.amount--;


        else mainhand.setItem(undefined);


        // Play effects
        const effectLocation = block.above();
        dimension.playSound("mob.wither.spawn", effectLocation);
        dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", effectLocation);
        dimension.spawnEntity("spimton:overgrown_archshaman", effectLocation);
        dimension.runCommand('tellraw @a {"rawtext": [{"text": "The §aOvergrown Archshaman§r has been summoned!"}]}');
    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:overgrown_boss",
        OvergrownBossSpawner
    );
});

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent("spimton:spawner", {
        onPlayerInteract: arg => {
            const player = arg.player
            const block = arg.block;
            const cplx = block.below(40);
            const cplxx = cplx.south(25);
            if (block.typeId === "spimton:overgrown_structure") ConfirmStructureOvegrownTemple(player);
            if (block.typeId === "spimton:weeper_structure") ConfirmStructureWeepingCatacomb(player, block);
            if (block.typeId === "spimton:juandice_structure") ConfirmStructureSanctuarium(player, block);
        }
    })

})

function ConfirmStructureArena(player) {
    let OptionBC = new ActionFormData()

    OptionBC.title("Proceed with structure placement?")
    OptionBC.body("Performing this action is going to place a 47x25x47 arena from this altar, which overrides nearby blocks. Don't do this if this altar is located in your base.\n\n\nPlace the structure?")
    OptionBC.button("YES YES YES YES YES")
    OptionBC.button("No")
    OptionBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('clear @s spimton:overgrown_helmet 0 1'), player.runCommand('structure load overgrown_arena_full ~-23 ~-1 ~-23 0_degrees none block_by_block 10 true'), player.addEffect("slow_falling", 200), player.runCommand("tp @s ~ ~20 ~");
        if (r.selection === 1) player.runCommand("title @s actionbar Cancelled structure placement")
    })
}

function ConfirmStructureWilted(player) {
    let OptionBC = new ActionFormData()

    OptionBC.title("Proceed with structure placement?")
    OptionBC.body("Performing this action is going to place a 35x19x35 arena below this altar, which overrides nearby blocks. Don't do this if this altar is located in your base.\n\n\nPlace the structure?")
    OptionBC.button("YES YES YES YES YES")
    OptionBC.button("No")
    OptionBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('clear @s spimton:black_shard 0 1'), player.runCommand('structure load wilted_arena ~-17 ~-20 ~-17 0_degrees none block_by_block 1 true'), player.addEffect("slow_falling", 200), player.runCommand("tp @s ~ ~1 ~");
        if (r.selection === 1) player.runCommand("title @s actionbar Cancelled structure placement")
    })
}

function ConfirmStructureOvegrownTemple(player) {
    let OptionBC = new ActionFormData()

    OptionBC.title("Proceed with structure placement?")
    OptionBC.body("Performing this action is going to place a 60x35x60 temple from this altar, which overrides nearby blocks. Don't do this if this altar is located in your base.\n\n\nPlace the structure?")
    OptionBC.button("YES YES YES YES YES")
    OptionBC.button("No")
    OptionBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('structure load overgrown_temple ~-30 ~-1 ~-30 0_degrees none block_by_block 6 true'), player.addEffect("slow_falling", 200), player.runCommand("tp @s ~ ~60 ~");
        if (r.selection === 1) player.runCommand("title @s actionbar Cancelled structure placement")
    })
}

function ConfirmStructureWeepingCatacomb(player, block) {
    let OptionBC = new ActionFormData()

    OptionBC.title("Proceed with structure placement?")
    OptionBC.body("Performing this action is going to place a 50x16x50 arena below this altar, which overrides nearby blocks. Don't do this if this altar is located in your base.\n\n\nPlace the structure?")
    OptionBC.button("YES YES YES YES YES")
    OptionBC.button("No")

    OptionBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('structure load weeping_catacomb ~-25 ~-17 ~-25 0_degrees none block_by_block 1 true'), block.setType("minecraft:air");
        if (r.selection === 1) player.runCommand("title @s actionbar Cancelled structure placement")
    })
}

function ConfirmStructureSanctuarium(player, block) {
    let OptionBC = new ActionFormData()

    OptionBC.title("Proceed with structure placement?")
    OptionBC.body("Performing this action is going to place a 64x25x64 structure from this altar, which overrides nearby blocks. Don't do this if this altar is located in your base.\n\n\nPlace the structure?")
    OptionBC.button("YES YES YES YES YES")
    OptionBC.button("No")
    const south = block.south(22)
    OptionBC.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) player.runCommand('structure load sanctuarium ~-32 ~-1 ~-32 0_degrees none'), player.runCommand(`tp @s ${south.x} ~3 ${south.z}`);
        if (r.selection === 1) player.runCommand("title @s actionbar Cancelled structure placement")
    })
}

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent("spimton:miniboss", {
        onPlayerInteract: arg => {
            const player = arg.player
            const block = arg.block;
            if (block.typeId === "spimton:overgrown_miniboss") {
                const equippable = player.getComponent("minecraft:equippable");
                if (!equippable) return;

                const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
                if (mainhand.typeId === "spimton:overgrown_helmet") {
                    ConfirmStructureArena(player);
                }
                else {
                    block.dimension.spawnEntity("spimton:overgrown_dualliste", block)
                    player.runCommand('titleraw @a actionbar {"rawtext": [{"text": "The §aOvergrown Dualliste§r has been summoned\nnear "},{"selector": "@p"}]}')
                }
            };
            if (block.typeId === "spimton:weeper_miniboss") {
                const equippable = player.getComponent("minecraft:equippable");
                if (!equippable) return;

                const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
                if (mainhand.typeId === "spimton:black_shard") {
                    ConfirmStructureWilted(player);
                }
                else {
                    block.dimension.spawnEntity("spimton:crither", block)
                    player.runCommand('titleraw @a actionbar {"rawtext": [{"text": "The §cRazziator§r has been summoned\nnear "},{"selector": "@p"}]}')
                }
            };
            if (block.typeId === "spimton:juandice_miniboss") {
                block.dimension.spawnEntity("spimton:crimson_king", block)
                player.runCommand('titleraw @a actionbar {"rawtext": [{"text": "The §9Crimson King§r has been summoned\nnear "},{"selector": "@p"}]}')
            };
        }
    })

})

system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent("spimton:overgrown_eqboss", {
        onPlayerInteract({ block, dimension, player }) {
            if (!player) return;

            const equippable = player.getComponent("minecraft:equippable");
            if (!equippable) return;

            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
            const activated = block.permutation.getState("spimton:activated")
            if (activated == false) {
                player.runCommand("title @p actionbar The Altar's Soul §vis not ready yet§f...")
                return;
            }
            if (player?.isSneaking) return;


            block.setPermutation(block.permutation.withState('spimton:activated', false))




            // Play effects
            const effectLocation = block.above();
            dimension.playSound("mob.wither.spawn", effectLocation);
            dimension.spawnParticle("minecraft:trial_spawner_detection_ominous", effectLocation);
            dimension.spawnEntity("spimton:overgrown_horseman", effectLocation);
            dimension.runCommand('tellraw @a {"rawtext": [{"text": "The §aOvergrown Equestrian§r has been summoned!"}]}');
        },
    })

})