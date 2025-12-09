import * as element from "../modules/element.js"
import * as json from "../modules/json.js"

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
        title_color: "rgb(200, 200, 200)",
        icon_size: "16px",
        icon_color: "rgb(200, 200, 200)",
        bottomBar_height: "34px",
        bottomBar_back: getComputedStyle(document.documentElement).getPropertyValue("--main_back"),
    }

    const logic = {
        buttom: true,
        bottombar: true,
        side: "left",
        title: "Components",
        icon: "menu"
    }

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

    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        back: "transparent",
        back_selected1: "rgba(50, 173, 255, 0.4)",
        back_selected2: "rgba(37, 188, 196, 0.4)",
        back_selected3: "rgba(255, 255, 255, 0.4)",
        pointer_color: "rgba(50, 173, 255, 0.17)",
        color_default: "rgba(153, 153, 153, 1)",
        color_selected1: "whitesmoke",
        color_selected2: "whitesmoke",
        border_color: "rgba(255, 255, 255, 0.5)",
        border_radius: "4px",
        section_back: "transparent",
        title_height: "24px",
        title_font: "Anta",
        title_fontSize: "12px",
        title_color: "rgb(200, 200, 200)",
        li_height: "24px",
        transition: "400ms ease-in-out",
    }

    const dynamicList = element.add(component.tag, box)
    dynamicList.css = css
    dynamicList.links = links
    dynamicList.eventDom = document
    dynamicList.eventName = "listMenu"
    dynamicList.data = dataList
    dynamicList.addDependency(new dependency())
    return dynamicList
}

export const init = async (box) => {
    const panel = await drawPanelBox(box)
    const list = await drawDynamicList(panel.nodes.list)
}