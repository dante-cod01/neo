import * as dom_helper from "./../../modules/dom.js"
import * as css_helper from "./../../modules/css.js"

const drawPanelBox = async (box, dependency) => {
    /* panel-box component */
    const component = await import("../../components/comp-classes/nano/panelBox.js")

    const links = [
        { type: "font", name: "Material Symbols Outlined", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
        { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        box_width: css_helper.getVar("panel_width"),
        box_height: css_helper.getVar("panel_height"),
        box_radius: "6px",
        box_blur: css_helper.getVar("interface_blur"),
        box_transition: css_helper.getVar("normal_transition"),
        topBar_height: css_helper.getVar("bar_height"),
        topBar_back: css_helper.getVar("dark_2"),
        content_back: css_helper.getVar("dark_4"),
        title_font: "Anta",
        title_fontSize: "14px",
        title_color: css_helper.getVar("light_2"),
        icon_size: "16px",
        icon_color: css_helper.getVar("light_2"),
    }

    document.body.style.transition = css.transition

    const logic = {
        buttom: true,
        side: "right",
        title: "Config",
        icon: "tune"
    }

    const panelBox = dom_helper.add(component.tag, box, "panelMenu configPanel", "configPanel")
    panelBox.css = css
    panelBox.logic = logic
    panelBox.links = links
    panelBox.eventDom = document
    panelBox.eventName = panelBox.id
    panelBox.addDependency(new dependency())
    return panelBox
}

const drawPresetsBox = (box, panel) => {
    const panelSections = dom_helper.add("div", box, "panelSections")
    const configSection = dom_helper.add("div", panelSections, "configSection", "configSection")
    const presetsSection = dom_helper.add("div", panelSections, "presetsSection", "presetsSection")
    const configPanelsNodes = dom_helper.add("style", panel.shadowRoot, "configPanelsNodes")
    configPanelsNodes.textContent = `
        .panelSections {
            width: 100%;
            height: 100%;

            .configSection, .presetsSection {
                width: 100%;
                transition: ${css_helper.getVar("normal_transition")};
            }

            .configSection { height: 100%; }
            .presetsSection { height: 0px; }
            .configSection_reduced { height: calc(100% - ${css_helper.getVar("presetsBox_height")}); }
            .presetSection_open { 
                height: ${css_helper.getVar("presetsBox_height")}; 
                background: ${css_helper.getVar("dark_3")}
            }
        }
    `
}

export const init = async (box) => {
    const dependency = (await import("../../components/comp-dependencies/base.js")).Base
    const panel = await drawPanelBox(box, dependency)
    const sections = drawPresetsBox(panel.nodes.node_0, panel)
}