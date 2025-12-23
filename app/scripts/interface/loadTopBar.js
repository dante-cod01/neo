import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawTopBar = async (box) => {
    /* expand-bar component */
    const component = await import("../components/nano/expandBar.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const css = {
        box_width: cssHelper.getVar("bar_width"),
        box_height: cssHelper.getVar("bar_height"),
        box_width_max: "130px",
        box_back: cssHelper.getVar("dark_4"),
        box_radius: "6px",
        transition: cssHelper.getVar("normal_transition")
    }

    const topBar = element.add(component.tag, box, "bars topBar", "topBar")
    topBar.css = css
    topBar.eventDom = document
    topBar.eventName = "topBar"
    topBar.addDependency(new dependency())
    topBar.addNodes(3)
    return topBar
}

const drawBackChanger = async (box) => {
    const component = await import("../components/nano/checkersGroup.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const data = [
        { box: "radio", id: "1", name: "back", type: "text", icon: "1", checked: true },
        { box: "radio", id: "2", name: "back", type: "text", icon: "2" },
        { box: "radio", id: "3", name: "back", type: "text", icon: "3" },
        { box: "radio", id: "4", name: "back", type: "text", icon: "4" },
        { box: "radio", id: "5", name: "back", type: "text", icon: "5" },
    ]

    const css = {
        box_width: "fit-content",
        box_height: cssHelper.getVar("bar_height"),

        option_width: "fit-content",
        option_height: "100%",
        option_hover_color: cssHelper.getVar("dark_1"),
        option_hover_back: cssHelper.getVar("light_3"),
        option_checked_color: cssHelper.getVar("dark_1"),
        option_checked_back: cssHelper.getVar("enphasis_1"),

        iconBox_size: cssHelper.getVar("bar_height"),
        icon_size: "22px",
        icon_font: "Anta",
        icon_color: cssHelper.getVar("grey_1"),
        icon_radius: "50%",
        icon_back: cssHelper.getVar("dark_2"),
        icon_fontSize: "10px",

        transition: "140ms ease-in-out"
    }

    const logic = {
        horizontal: true
    }

    const backChanger = element.add(component.tag, box)
    backChanger.data = data
    backChanger.links = links
    backChanger.css = css
    backChanger.logic = logic
    backChanger.eventDom = document
    backChanger.eventName = "backChanger"
    backChanger.addDependency(new dependency())
    return backChanger
}

const drawViewChanger = async (box) => {
    const component = await import("../components/nano/checkersGroup.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
    ]

    const data = [
        { box: "space", size: "5px" },
        { box: "radio", id: "computer", name: "view", type: "material", icon: "computer", checked: true },
        { box: "radio", id: "tablet", name: "view", type: "material", icon: "crop_landscape" },
        { box: "radio", id: "mobile", name: "view", type: "material", icon: "mobile_3" },
        { box: "space", size: "20px" },
        { box: "checkbox", id: "rotate", type: "material", icon: "autorenew", disabled: true },
        { box: "checkbox", id: "fullscreen", type: "material", icon: "crop_free" },
        { box: "space", size: "5px" },
    ]

    const css = {
        box_width: "auto",
        box_height: `calc(${cssHelper.getVar("bar_height")} - 6px)`,
        box_back: cssHelper.getVar("dark_2"),
        box_radius: "6px",

        option_width: "28px",
        option_height: "100%",
        option_hover_color: cssHelper.getVar("light_2"),
        option_checked_color: cssHelper.getVar("enphasis_1"),

        iconBox_size: cssHelper.getVar("bar_height"),
        material_size: cssHelper.getVar("bar_height"),
        material_color: cssHelper.getVar("light_4"),
        material_fontSize: "16px",
        material_disabled: cssHelper.getVar("grey_2")
    }

    const logic = {
        horizontal: true
    }

    const viewChanger = element.add(component.tag, box, "", "viewChanger")
    viewChanger.data = data
    viewChanger.links = links
    viewChanger.css = css
    viewChanger.logic = logic
    viewChanger.eventDom = document
    viewChanger.eventName = "viewChanger"
    viewChanger.addDependency(new dependency())
    return viewChanger
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const topBar = await drawTopBar(box, dependency)
    const backChanger = await drawBackChanger(topBar.nodes.node_0, dependency)
    const viewChanger = await drawViewChanger(topBar.nodes.node_1, dependency)
}