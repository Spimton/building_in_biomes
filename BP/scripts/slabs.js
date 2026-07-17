import { system, ItemStack, world, EquipmentSlot, Direction, GameMode } from '@minecraft/server';



system.beforeEvents.startup.subscribe(s => {
    s.blockComponentRegistry.registerCustomComponent("spimton:slab_comp", {
        beforeOnPlayerPlace(event) {
            console.warn("BeforeEvent")
            const { block, face, player } = event;
            const items = player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
            console.warn(`Holding: ${items?.typeId}`);
            console.warn(`Block: ${block.typeId}`);

            const opposite = {
                [Direction.Up]: Direction.Down,
                [Direction.Down]: Direction.Up,
                [Direction.North]: Direction.South,
                [Direction.South]: Direction.North,
                [Direction.East]: Direction.West,
                [Direction.West]: Direction.East
            };

            const offsets = {
                [Direction.Up]: { x: 0, y: 1, z: 0 },
                [Direction.Down]: { x: 0, y: -1, z: 0 },
                [Direction.North]: { x: 0, y: 0, z: -1 },
                [Direction.South]: { x: 0, y: 0, z: 1 },
                [Direction.East]: { x: 1, y: 0, z: 0 },
                [Direction.West]: { x: -1, y: 0, z: 0 }
            };

            const clickedFace = opposite[face];
            const offset = offsets[clickedFace];

            const clickedBlock = block.dimension.getBlock({
                x: block.location.x + offset.x,
                y: block.location.y + offset.y,
                z: block.location.z + offset.z
            });


            const perm = clickedBlock.permutation;




            if (clickedBlock.typeId !== items.typeId)
                return;

            if (perm.getState("spimton:double"))
                return;
            console.warn("Same Slab")
            if (perm.getState("spimton:double"))
                return;

            const half = perm.getState("minecraft:vertical_half");

            const shouldMerge =
                (half === "bottom" && face === Direction.Up) ||
                (half === "top" && face === Direction.Down);
            if (!shouldMerge)
                return;
            console.warn("Should Merge")
            console.warn("Merged")
            event.cancel = true;
            system.run(() => {
                clickedBlock.setPermutation(
                    clickedBlock.permutation.withState("spimton:double", true)
                );
                const equippable = player.getComponent("minecraft:equippable");
                const item = equippable?.getEquipment(EquipmentSlot.Mainhand);

                if (!item) return;

                if (item.amount > 1) {
                    item.amount--;
                    equippable.setEquipment(EquipmentSlot.Mainhand, item);
                } else {
                    equippable.setEquipment(EquipmentSlot.Mainhand, undefined);
                }

            });
        },
        onPlayerBreak(event, { params }) {
            console.warn("Broke")
            const { block, player, brokenBlockPermutation } = event;
            const double = brokenBlockPermutation.getState("spimton:double");
            const mainh = player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
            const silk = mainh
                ?.getComponent("minecraft:enchantable")
                ?.getEnchantment("minecraft:silk_touch");
            if (double && world.gameRules.doTileDrops && !player.matches({ gameMode: GameMode.Creative })) {
                console.warn("Double and TileDrops")
                if (params.lootTable === "false" && silk) {

                    const { x, y, z } = block.center()
                    block.dimension.runCommand(`loot spawn ${x} ${y} ${z} loot "${params.lootTable}"`)
                }
                else {

                    console.warn(brokenBlockPermutation.type.id)
                    const dropblock = new ItemStack(brokenBlockPermutation.type.id, 1);
                    console.warn("Drop")
                    block.dimension.spawnItem(dropblock, block.center())

                }
            };

        }
    })
})