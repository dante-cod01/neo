import * as element from "../modules/element.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const component = await import("../components/nano/panelBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        box_width: getComputedStyle(document.documentElement).getPropertyValue("--panel_width"),
        box_height: getComputedStyle(document.documentElement).getPropertyValue("--panel_height"),
        box_radius: "6px",
        box_blur: "blur(2px)",
        box_transition: getComputedStyle(document.documentElement).getPropertyValue("--light_transition"),
        topBar_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_height"),
        topBar_back: getComputedStyle(document.documentElement).getPropertyValue("--main_back"),
        content_back: getComputedStyle(document.documentElement).getPropertyValue("--dark_crystal_light"),
        title_font: "Anta",
        title_fontSize: "14px",
        title_color: "rgba(190, 190, 190, 1)",
        icon_size: "16px",
        icon_color: "rgba(190, 190, 190, 1",
    }

    document.body.style.transition = css.transition

    const logic = {
        buttom: true,
        side: "right",
        title: "Config",
        icon: "tune"
    }

    const panelBox = element.add(component.tag, box, "panelMenu panelRight")
    panelBox.css = css
    panelBox.logic = logic
    panelBox.eventDom = document
    panelBox.eventName = "panel"
    panelBox.id = "right"
    panelBox.addDependency(new dependency())
    return panelBox
}

export const init = async (box) => {
    const panel = await drawPanelBox(box)
}