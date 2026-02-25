import * as dom_helper from "./../../modules/dom.js"
import * as json_helper from "./../../modules/json.js"
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
        bottomBar_height: css_helper.getVar("bar_height"),
        bottomBar_back: css_helper.getVar("dark_2"),
    }

    const logic = {
        buttom: true,
        bottomBar: true,
        side: "left",
        title: "Components",
        icon: "menu"
    }

    const panelBox = dom_helper.add(component.tag, box, "panel panelLeft", "menuPanel")
    panelBox.css = css
    panelBox.logic = logic
    panelBox.links = links
    panelBox.eventDom = document
    panelBox.eventName = panelBox.id
    panelBox.addDependency(new dependency())
    return panelBox
}

const drawDynamicList = async (box, dependency) => {
    /* dynamic-list component */
    const component = await import("../../components/comp-classes/nano/dynamicList.js")
    const dataList = await json_helper.get("./app/config/allComponents_list.json")

    const links = [
        { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        back_hover_1: css_helper.getVar("light_5"),
        color_hover_1: css_helper.getVar("light_1"),
        back_selected_1: css_helper.getVar("light_4"),
        color_selected_1: css_helper.getVar("grey_5"),

        back_hover_2: css_helper.getVar("light_5"),
        color_hover_2: css_helper.getVar("light_1"),
        back_selected_2: css_helper.getVar("light_4"),
        color_selected_2: css_helper.getVar("grey_5"),

        pointer_back: css_helper.getVar("enphasis_1"),
        pointer_color: css_helper.getVar("grey_5"),

        back: "transparent",
        border_color: "rgba(255, 255, 255, 0.5)",
        border_radius: "4px",
        section_back: "transparent",
        title_height: "24px",
        title_font: "Anta",
        title_fontSize: "12px",
        title_color: css_helper.getVar("light_3"),
        li_height: "24px",
        transition: "400ms ease-in-out",
    }

    const dynamicList = dom_helper.add(component.tag, box, "", "listMenu")
    dynamicList.css = css
    dynamicList.links = links
    dynamicList.eventDom = document
    dynamicList.eventName = dynamicList.id
    dynamicList.data = dataList
    dynamicList.addDependency(new dependency())
    return dynamicList
}

export const init = async (box) => {
    const dependency = (await import("../../components/comp-dependencies/componentBase.js")).ComponentBase
    const panel = await drawPanelBox(box, dependency)
    const list = await drawDynamicList(panel.nodes.node_0, dependency)
}