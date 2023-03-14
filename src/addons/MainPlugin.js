import {BasePlugin} from "./BasePlugin";

export class MainPlugin extends BasePlugin {
    constructor(x1blockly) {
        super(x1blockly);

        console.log(x1blockly.settings.toolbox['contents']);

        if (x1blockly.settings.toolbox.contents instanceof Array) {
            x1blockly.settings.toolbox.contents.push({
                'kind': 'category',
                'name': 'Test Blocks',
                'categorystyle': 'login_category',
                'contents': [{
                    enabled: true,
                    kind: "block",
                    type: "js_block"
                }]
            });
        }
    }

    init(x1blockly) {

    }
}