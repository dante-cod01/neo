import * as element from "../modules/element.js"
import * as json from "../modules/json.js"
import * as cssHelper from "../modules/css.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const component = await import("../components/nano/panelBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
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

    const logic = {
        buttom: true,
        bottomBar: true,
        side: "left",
        title: "Components",
        icon: "menu"
    }

    const panelBox = element.add(component.tag, box, "panelMenu panelLeft", "menuPanel")
    panelBox.css = css
    panelBox.logic = logic
    panelBox.links = links
    panelBox.eventDom = document
    panelBox.eventName = panelBox.id
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
        back_hover_1: cssHelper.getVar("light_5"),
        color_hover_1: cssHelper.getVar("light_1"),
        back_selected_1: cssHelper.getVar("light_4"),
        color_selected_1: cssHelper.getVar("grey_5"),

        back_hover_2: cssHelper.getVar("light_5"),
        color_hover_2: cssHelper.getVar("light_1"),
        back_selected_2: cssHelper.getVar("light_4"),
        color_selected_2: cssHelper.getVar("grey_5"),

        pointer_back: cssHelper.getVar("enphasis_1"),
        pointer_color: cssHelper.getVar("grey_5"),

        back: "transparent",
        border_color: "rgba(255, 255, 255, 0.5)",
        border_radius: "4px",
        section_back: "transparent",
        title_height: "24px",
        title_font: "Anta",
        title_fontSize: "12px",
        title_color: cssHelper.getVar("light_3"),
        li_height: "24px",
        transition: "400ms ease-in-out",
    }

    const dynamicList = element.add(component.tag, box, "", "listMenu")
    dynamicList.css = css
    dynamicList.links = links
    dynamicList.eventDom = document
    dynamicList.eventName = dynamicList.id
    dynamicList.data = dataList
    dynamicList.addDependency(new dependency())
    return dynamicList
}

export const init = async (box) => {
    const panel = await drawPanelBox(box)
    const list = await drawDynamicList(panel.nodes.node_0)
}