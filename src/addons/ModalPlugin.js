import {Modal} from "@blockly/plugin-modal";
import {BasePlugin} from "./BasePlugin";

export class ModalPlugin extends BasePlugin {
    constructor() {
        super();

    }

    init(x1blockly) {
        const modal = new Modal('Test Modal', x1blockly.workspace);
        modal.init();
        //modal.show();
    }
}