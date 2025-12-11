import * as element from "../modules/element.js"

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
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const data = [
        { box: "radio", name: "back", iconType: "text", icon: "1" },
        { box: "radio", name: "back", iconType: "text", icon: "2" },
        { box: "radio", name: "back", iconType: "text", icon: "3" },
        { box: "radio", name: "back", iconType: "text", icon: "4" },
        { box: "radio", name: "back", iconType: "material", icon: "menu" },
        { box: "space", size: "20px"},
        { box: "radio", name: "back", iconType: "material", icon: "landscape_2" },
    ]

    const css = {
        box_width: "fit-content",
        box_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_height"),
        option_width: "fit-content",
        option_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_height"),
        hover_color: "whitesmoke",
        backHover_color: getComputedStyle(document.documentElement).getPropertyValue("--enphasis_color1"),
        transition: "100ms",

        iconBox_width: "22px",
        iconBox_height: "22px",
        iconBox_border: "2px solid rgba(255, 255, 255, 0.2",
        iconBox_radius: "50%",
        iconBox_back: "rgba(0, 0, 0, 0.1)",
        iconBox_margin: "0 0 0 8px",
        iconBox_font: "Anta",
        iconBox_fontSize: "10px",
        iconBox_color: "rgba(255, 255, 255, 0.4)",

        material_fontSize: "22px",
        material_color: "rgba(255, 255, 255, 0.4)",

        titleBox_font: "Anta",
        titleBox_fontSize: "12px",
        titleBox_color: "rgb(200, 200, 200)",
        titleBox_fontStyle: "italic",
        titleBox_margin: "0 0 0 16px"
    }

    const logic = {
        horizontal: true
    }

    const backChanger = element.add(component.tag, box)
    backChanger.data = data
    backChanger.links = links
    backChanger.css = css
    backChanger.logic = logic
    backChanger.addDependency(new dependency())
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const topBar = await drawTopBar(box, dependency)
    const backChanger = await drawBackChanger(topBar.getNodes().node_1, dependency)
}