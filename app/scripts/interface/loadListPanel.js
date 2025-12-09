import * as element from "../modules/element.js"
import * as json from "../modules/json.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const component = await import("../components/nano/panelBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

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
        title_color: "rgb(200, 200, 200)",
        closeIcon_size: "16px",
        close_color: "rgb(200, 200, 200)",
        bottomBar_height: "34px",
        bottomBar_back: getComputedStyle(document.documentElement).getPropertyValue("--main_back"),
    }

    const logic = {
        closeButtom: true,
        bottomBar: true,
        panel_side: "left",
        title: "Components",
        icon: ""
    }

    const links = [
        {type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"},
        {type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap"},
    ]

    const panelBox = element.add(component.tag, box, "panelMenu panelLeft")
    panelBox.css = css
    panelBox.logic = logic
    panelBox.eventDom = document
    panelBox.links = links
    panelBox.eventName = "panel"
    panelBox.id = "left"
    panelBox.addDependency(new dependency())
    return panelBox
}

const drawDynamicList = async (box) => {
    /* dynamic-list component */
    const component = await import("../components/nano/dynamicList.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const dataList = await json.get("./app/config/components/list.json")
/*     const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"
 */
    const css = {
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

    const dynamicList = element.add(component.tag, box)
    dynamicList.css = css
    dynamicList.eventDom = document
    dynamicList.eventName = "listMenu"
    dynamicList.data = dataList
    dynamicList.addDependency(new dependency())
    return dynamicList
}

export const init = async (box) => {
    const panel = await drawPanelBox(box)
    const panelNodes = panel.getNodes()
    const list = await drawDynamicList(panelNodes.list)
}