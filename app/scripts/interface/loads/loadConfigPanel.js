import * as element from "./../../modules/element.js"
import * as cssHelper from "./../../modules/css.js"

const drawPanelBox = async (box, dependency) => {
    /* panel-box component */
    const component = await import("../../components/comp-classes/nano/panelBox.js")

    const links = [
        { type: "font", name: "Material Symbols Outlined", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
        { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        box_width: cssHelper.getVar("panel_width"),
        box_height: cssHelper.getVar("panel_height"),
        box_radius: "6px",
        box_blur: cssHelper.getVar("interface_blur"),
        box_transition: cssHelper.getVar("normal_transition"),
        topBar_height: cssHelper.getVar("bar_height"),
        topBar_back: cssHelper.getVar("dark_2"),
        content_back: cssHelper.getVar("dark_4"),
        title_font: "Anta",
        title_fontSize: "14px",
        title_color: cssHelper.getVar("light_2"),
        icon_size: "16px",
        icon_color: cssHelper.getVar("light_2"),
        bottomBar_height: "34px",
        bottomBar_back: cssHelper.getVar("dark_2"),
    }

    document.body.style.transition = css.transition

    const logic = {
        buttom: true,
        side: "right",
        title: "Config",
        icon: "tune"
    }

    const panelBox = element.add(component.tag, box, "panelMenu panelRight", "configPanel")
    panelBox.css = css
    panelBox.logic = logic
    panelBox.links = links
    panelBox.eventDom = document
    panelBox.eventName = panelBox.id
    panelBox.addDependency(new dependency())
    return panelBox
}

export const init = async (box) => {
    const dependency = (await import("../../components/comp-dependencies/componentBase.js")).ComponentBase

    const panel = await drawPanelBox(box, dependency)
}