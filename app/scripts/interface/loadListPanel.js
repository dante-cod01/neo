import * as element from "../modules/element.js"
import * as json from "../modules/json.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const component = await import("../components/nano/panelBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const config = {
        closeButtom: true,
        bottomBar: true
    }

    const configCss = {
        box_w: getComputedStyle(document.documentElement).getPropertyValue("--panel_Width"),
        box_h: getComputedStyle(document.documentElement).getPropertyValue("--panel_Height"),
        box_radius: "6px",
        box_blur: "blur(2px)",
        box_transition: getComputedStyle(document.documentElement).getPropertyValue("--light_Transition"),
        topBar_h: "34px",
        topBar_back: getComputedStyle(document.documentElement).getPropertyValue("--main_Back"),
        content_back: "rgba(0, 0, 0, 0.4)",
        title_font: "Anta",
        title_fontSize: "14px",
        title_color: "rgb(200, 200, 200)",
        closeIcon_size: "16px",
        close_color: "rgba(200, 200, 200, 1)",
        bottomBar_h: "34px",
        bottomBar_back: getComputedStyle(document.documentElement).getPropertyValue("--main_Back"),
    }

    const configLogic = {
        panel_side: "left",
        title: "Components",
        title_fontHref: componentFont_Href,
        close_icon: "menu"
    }

    const panelBox = element.add(component.tag, box, "panelMenu panelLeft")
    panelBox.entryConfig = config
    panelBox.entryCss = configCss
    panelBox.entryLogic = configLogic
    panelBox.eventDom = document
    panelBox.eventName = "listMenu"
    panelBox.addDependency(new dependency())
    return panelBox
}

const drawDynamicList = async (box) => {
    /* dynamic-list component */
    const component = await import("../components/nano/dynamicList.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const dataList = await json.get("./app/config/components/list.json")
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const configCss = {
        back: "transparent",
        backSelected1: "rgba(50, 173, 255, 0.4)",
        backSelected2: "rgba(37, 188, 196, 0.4)",
        backSelected3: "rgba(255, 255, 255, 0.4)",
        pointerColor: "rgba(50, 173, 255, 0.17)",
        colorDefault: "rgba(153, 153, 153, 1)",
        colorSelected1: "whitesmoke",
        colorSelected2: "whitesmoke",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "4px",
        sectionBack: "transparent",
        title_H: "24px",
        titleFont: "Anta",
        titleFontSize: "12px",
        titleColor: "rgb(200, 200, 200)",
        listItem_H: "24px",
        transition: "400ms ease-in-out",
    }

    const configLogic = {
        titleFont_Href: componentFont_Href,
    }

    const dynamicList = element.add(component.tag, box)
    dynamicList.entryCss = configCss
    dynamicList.entryLogic = configLogic
    dynamicList.eventDom = document
    dynamicList.eventName = "listMenu"
    dynamicList.data = dataList
    /* init */
    dynamicList.addDependency(new dependency())
    return dynamicList
}

export const init = async (box) => {
    const panel = await drawPanelBox(box)
    const panelNodes = panel.getNodes()
    const list = await drawDynamicList(panelNodes.list)
}