import {BasePlugin} from "./BasePlugin";
import {Backpack} from "@blockly/workspace-backpack";

export class BackpackPlugin extends BasePlugin {
    constructor() {
        super();
    }

    init(x1blockly) {
        const backpack = new Backpack(x1blockly.workspace);
        backpack.init();
    }
}