

const barTag = 'spimton:is_bar'

export class bars {
    static update_Bar_States(Bar) {
        let north = undefined;
        try {
            north = Bar.north(1);
        } catch { }
        let south = undefined;
        try {
            south = Bar.south(1);
        } catch { }
        let east = undefined;
        try {
            east = Bar.east(1);
        } catch { }
        let west = undefined;
        try {
            west = Bar.west(1);
        } catch { }
        const blocks = [
            { block: north, side: "north" },
            { block: south, side: "south" },
            { block: east, side: "east" },
            { block: west, side: "west" },
        ];
        for (const blockData of blocks) {
            if (blockData.block != undefined) {
                if (!(blockData.block.isLiquid || blockData.block.isAir || blockData.block.permutation.matches('minecraft:snow_layer') || blockData.block.permutation.matches('minecraft:red_flower') || blockData.block.permutation.matches('minecraft:tallgrass') || blockData.block.permutation.matches('minecraft:double_plant') || blockData.block.permutation.matches('minecraft:anvil') || blockData.block.permutation.matches('minecraft:scaffolding') || blockData.block.permutation.matches('minecraft:decorated_pot'))) {
                    Bar.setPermutation(Bar.permutation.withState("spimton:connect_" + blockData.side, true));
                } else {
                    Bar.setPermutation(Bar.permutation.withState("spimton:connect_" + blockData.side, false));
                }
            } else {
                Bar.setPermutation(Bar.permutation.withState("spimton:connect_" + blockData.side, false));
            }
        }
    }
    static updateBarsAround(Block) {
        let north = undefined;
        try {
            north = Block.north(1);
        } catch { }
        let south = undefined;
        try {
            south = Block.south(1);
        } catch { }
        let east = undefined;
        try {
            east = Block.east(1);
        } catch { }
        let west = undefined;
        try {
            west = Block.west(1);
        } catch { }
        const blocks = [Block, north, south, east, west];
        for (const block of blocks) {
            if (block != undefined) {
                if (block.hasTag(barTag)) this.update_Bar_States(block);
            }
        }
    }
}