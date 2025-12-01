import * as element from "../modules/element.js"
import * as json from "../modules/json.js"

const magicBox = async (box) => {
    /* magic-box component */
    const component = await import("../components/nano/magicBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const config = {
        closeButtom: true,
        bottomBar: true
    }

    const configCss = {
        panelWidth: getComputedStyle(document.documentElement).getPropertyValue("--panelList_width"),
        panelHeight: getComputedStyle(document.documentElement).getPropertyValue("--panelsHeight"),
        panelRadius: "6px",
        topBar_H: "30px",
        topBarBack: "rgba(0, 0, 0, 0.6)",
        contentBack: "rgba(0, 0, 0, 0.4)",
        titleFont: "Anta",
        titleFontSize: "14px",
        titleColor: "rgb(200, 200, 200)",
        closeIconSize: "16px",
        closeColor: "rgb(200, 200, 200)",
        bottomBar_H: "30px",
        bottomBarBack: "rgba(0, 0, 0, 0.6)",
        transition: getComputedStyle(document.documentElement).getPropertyValue("--panel_transition")
    }

    const configLogic = {
        panelSide: "left",
        title: "Components",
        titleFontHref: componentFont_Href,
        closeIcon: "menu"
    }

    const magicBox = element.add(component.tag, box, "panelMenu panelLeft")
    magicBox.entryConfig = config
    magicBox.entryCss = configCss
    magicBox.entryLogic = configLogic
    magicBox.eventDom = document
    magicBox.eventName = "listMenu"
    magicBox.addDependency(new dependency())
    return magicBox
}

const dynamicList = async (box) => {
    /* dynamic-list component */
    const component = await import("../components/nano/dynamicList.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const dataList = await json.get("./app/config/components/list.json")
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const config = {
    }

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
    dynamicList.entryConfig = config
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
    const panel = await magicBox(box)
    const panelNodes = panel.getNodes()
    const list = await dynamicList(panelNodes.list)
}