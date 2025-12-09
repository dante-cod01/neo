import * as element from "../modules/element.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const component = await import("../components/nano/panelBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const config = {
        closeButtom: true
    }

    const configCss = {
        box_w: getComputedStyle(document.documentElement).getPropertyValue("--panel_w"),
        box_h: getComputedStyle(document.documentElement).getPropertyValue("--panel_h"),
        box_radius: "6px",
        box_blur: "blur(2px)",
        box_transition: getComputedStyle(document.documentElement).getPropertyValue("--light_transition"),
        topBar_h: getComputedStyle(document.documentElement).getPropertyValue("--bar_h"),
        topBar_back: getComputedStyle(document.documentElement).getPropertyValue("--main_back"),
        content_back: getComputedStyle(document.documentElement).getPropertyValue("--dark_crystal_light"),
        title_font: "Anta",
        title_fontSize: "14px",
        title_color: "rgba(190, 190, 190, 1)",
        closeIcon_size: "16px",
        close_color: "rgba(190, 190, 190, 1",
    }

    document.body.style.transition = configCss.transition

    const configLogic = {
        panel_side: "right",
        title: "Config",

    }

    const panelBox = element.add(component.tag, box, "panelMenu panelRight")
    panelBox.entryConfig = config
    panelBox.entryCss = configCss
    panelBox.entryLogic = configLogic
    panelBox.eventDom = document
    panelBox.id = "right"
    panelBox.eventName = "panel"

    panelBox.addDependency(new dependency())
    return panelBox
}

export const init = async (box) => {
    const panel = await drawPanelBox(box)
}