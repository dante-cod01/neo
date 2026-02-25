import * as dom_helper from "./../../modules/dom.js"
import * as css_helper from "./../../modules/css.js"
import * as component from "./../../../runtime/componentLoader.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const componentClass = await import("../../components/comp-classes/nano/boxes/magicBox.js")

    const conf = {
        css: {
            box_width: css_helper.getVar("panel_width"),
            box_height: css_helper.getVar("panel_height"),
            box_back: css_helper.getVar("dark_4"),
            box_radius: css_helper.getVar("interface_radius"),
            box_transition: css_helper.getVar("normal_transition")
        },
        id: "configPanel",
        events:  document,
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }
    const componentLoaded = await component.load(componentClass, conf, "configPanel panel absolute", box)
    const node = componentLoaded.getNodes()[0]
    return node
}

const drawTitleBox = (box) => {
    const titleBox = dom_helper.add("div", box, "panelTitle", "configPanelTitleBox")
}

export const init = async (box) => {
    const panelBox = await drawPanelBox(box)
    const titleBox = drawTitleBox(panelBox)
/*     console.log("panel")
    const dependency = (await import("../../components/comp-dependencies/base.js")).default
    const sections = drawPresetsBox(panel.nodes.node_0, panel)
 */}