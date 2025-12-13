import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawTopBar = async (box) => {
    /* expand-bar component */
    const component = await import("../components/nano/expandBar.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const css = {
        box_width: getComputedStyle(document.documentElement).getPropertyValue("--bar_width"),
        box_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_height"),
        box_width_max: "130px",
        box_back: getComputedStyle(document.documentElement).getPropertyValue("--darkCrystal_light"),
        box_radius: "6px",
        transition: getComputedStyle(document.documentElement).getPropertyValue("--light_transition")
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
        { box: "radio", name: "back", type: "text", icon: "1", checked: true },
        { box: "radio", name: "back", type: "text", icon: "2" },
        { box: "radio", name: "back", type: "text", icon: "3" },
        { box: "radio", name: "back", type: "text", icon: "4" },
        { box: "radio", name: "back", type: "text", icon: "5" },
    ]

    const css = {
        box_width: "300px",
        box_height: cssHelper.getVar("bar_height"),

        option_width: "fit-content",
        option_height: "100%",
        option_hover_color: cssHelper.getVar("text_dark_color"),
        option_hover_back: cssHelper.getVar("hover_back"),
        option_checked_back: cssHelper.getVar("selected_back"),

        iconBox_size: cssHelper.getVar("bar_height"),
        icon_font: "Anta",
        icon_color: cssHelper.getVar("text_light_color"),
        icon_size: "22px",
        icon_radius: "50%",
        icon_back: cssHelper.getVar("back_dark"),
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
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const topBar = await drawTopBar(box, dependency)
    const backChanger = await drawBackChanger(topBar.getNodes().node_1, dependency)
}