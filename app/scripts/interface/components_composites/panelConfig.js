import * as dom_helper from "../../modules/dom.js"
import * as css_helper from "../../modules/css.js"
import * as component from "../../../runtime/componentLoader.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const componentClass = await import("../../components/comp-classes/nano/boxes/magicBox.js")

    const conf = {
        css: {
            box_width: css_helper.getVar("panel_width_open"),
            box_height: css_helper.getVar("panel_height_open"),
            box_width_contract: css_helper.getVar("panel_width_close"),
            box_height_contract: css_helper.getVar("panel_height_close"),
            box_back: "transparent",
            box_radius: css_helper.getVar("interface_radius"),
            box_transition: css_helper.getVar("normal_transition")
        },
        id: "configPanel",
        events: document,
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }
    const componentLoaded = await component.load(componentClass, conf, "configPanel panel absolute", box)
    const node = componentLoaded
    return node
}

const drawTitleBox = async (box) => {
    const componentClass = await import("../../components/comp-classes/nano/titles/titleIcon.js")

    const conf = {
        links: [
            { type: "font", name: "Material Symbols Outlined", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
            { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
        ],
        data: {
            title: "Config",
            icon: "tune"
        },
        css: {
            box_width: css_helper.getVar("100%"),
            box_height: css_helper.getVar("bar_height"),
            box_back: css_helper.getVar("dark_2"),
            box_transition: css_helper.getVar("normal_transition"),

            title_fontFamily: "Anta",
            title_fontSize: "14px",
            title_fontColor: css_helper.getVar("light_3"),
            title_margin: "0 20px 0 0",

            icon_fontSize: "16px",
            icon_fontColor: css_helper.getVar("light_3"),

        },
        logic: {
            iconType: "material",
            iconSide: "right"
        },
        id: "configPanel_title",
        events: document,
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }
    const componentLoaded = await component.load(componentClass, conf, "configPanelTitle", box)
}

const drawConfigSection = (box, dom) => {
    const ccsClass = dom_helper.add("style", dom.shadowRoot, "panel_configSection")
    ccsClass.textContent = `
        .panel_configSection {
            width: 100%;
            height: 100%;
            background: ${css_helper.getVar("dark_4")};
        }
    `

    const configSection = dom_helper.add("div", box, "panel_configSection", "panel_configSection")
    return configSection
}

export const init = async (box) => {
    const panelBox = await drawPanelBox(box)
    const titleBox = await drawTitleBox(panelBox.getNodes()[0])
    const configSection = drawConfigSection(panelBox.getNodes()[0], panelBox)
/*     console.log("panel")
    const dependency = (await import("../../components/comp-dependencies/base.js")).default
    const sections = drawPresetsBox(panel.nodes.node_0, panel)
 */}