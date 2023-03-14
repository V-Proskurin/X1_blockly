import {BasePlugin} from "./BasePlugin";
import * as Blockly from "blockly";
import {TypedVariableModal} from "@blockly/plugin-typed-variable-modal";

export class TypedVariablePlugin extends BasePlugin {
    constructor(x1blockly) {
        super(x1blockly);

        if (x1blockly.settings.toolbox['contents'] instanceof Array) {
            x1blockly.settings.toolbox['contents'].push({
                'kind': 'category',
                'name': 'Typed Variables',
                'custom': 'CREATE_TYPED_VARIABLE',
                'categorystyle': 'variable_category',
            });
        }
    }

    init(x1blockly) {
        const types = [['Penguin', 'PENGUIN'], ['Giraffe', 'GIRAFFE']];
        x1blockly.workspace.registerToolboxCategoryCallback('CREATE_TYPED_VARIABLE', this.createFlyout);

        const typedVarModal = new TypedVariableModal(x1blockly.workspace, 'CREATE_TYPED_VARIABLE', types);
        typedVarModal.init();
    }

    createFlyout(workspace) {
        let xmlList = [];
        const button = document.createElement('button');
        button.setAttribute('text', 'Create Typed Variable');
        button.setAttribute('callbackKey', 'CREATE_TYPED_VARIABLE');

        xmlList.push(button);

        const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace);
        xmlList = xmlList.concat(blockList);
        return xmlList;
    }
}