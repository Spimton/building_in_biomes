import { BlockPermutation, GameMode, Player, world, system } from "@minecraft/server";

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockTreaderDetectionComponent = {
    onStepOn({ entity, block }) {
        if (entity instanceof Player && entity.getGameMode() === GameMode.Creative) return;

        block.setPermutation(
            BlockPermutation.resolve(block.typeId, {
                "spimton:stood_on": true,
            })
        );
    },
    onStepOff({ entity, block }) {
        if (entity instanceof Player && entity.getGameMode() === GameMode.Creative) return;

        block.setPermutation(
            BlockPermutation.resolve(block.typeId, {
                "spimton:stood_on": false,
            })
        );
    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "spimton:treader_detection",
        BlockTreaderDetectionComponent
    );
});
