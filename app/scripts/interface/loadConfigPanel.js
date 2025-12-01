import * as element from "../modules/element.js"

const magicBox = async (box) => {
    /* magic-box component */
    const component = await import("../components/nano/magicBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const config = {
        closeButtom: true
    }

    const configCss = {
        panelWidth: getComputedStyle(document.documentElement).getPropertyValue("--panelList_width"),
        panelHeight: getComputedStyle(document.documentElement).getPropertyValue("--panelsHeight"),
        panelRadius: "6px",
        topBar_H: "30px",
        topBarBack: "rgba(0, 0, 0, 0.6)",
        contentBack: "rgba(0, 0, 0, 0.5)",
        titleFont: "Anta",
        titleFontSize: "14px",
        titleColor: "rgba(190, 190, 190, 1)",
        closeIconSize: "16px",
        closeColor: "rgba(190, 190, 190, 1",
        nodeBack: "transparent",
        transition: getComputedStyle(document.documentElement).getPropertyValue("--panel_transition")
    }

    const configLogic = {
        panelSide: "right",
        title: "Config",

    }

    const magicBox = element.add(component.tag, box, "panelMenu panelRight")
    magicBox.entryConfig = config
    magicBox.entryCss = configCss
    magicBox.entryLogic = configLogic
    magicBox.eventDom = document
    magicBox.eventName = "config"

    magicBox.addDependency(new dependency())
    return magicBox
}

export const init = async (box) => {
    const panel = await magicBox(box)
}