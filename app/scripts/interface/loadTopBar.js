import * as element from "../modules/element.js"

const drawTopBar = async (box, dependency) => {
    /* expand-bar component */
    const component = await import("../components/nano/expandBar.js")

    const css = {
        box_width: getComputedStyle(document.documentElement).getPropertyValue("--bar_width"),
        box_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_height"),
        box_width_max: "130px",
        box_back: getComputedStyle(document.documentElement).getPropertyValue("--dark_crystal_light"),
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

const drawBackChanger = async (box, dependency) => {
    const component = await import("../components/nano/groupRadios.js")

    const data = [
        { type: "radio", name: "back", text: "1" },
        { type: "radio", name: "back", icon: "1" },
        { type: "radio", name: "back", icon: "2" },
        { type: "radio", name: "back", icon: "3" },
        { type: "radio", name: "back", icon: "4" },
        { type: "radio", name: "back", icon: "5" },
        { type: "checkbox", icon: "panorama", material: false, label: "background" },
        { type: "checkbox", label: "background" },
        { type: "checkbox", icon: "background" }
    ]

    const fonts = [
        { font: "Anta", rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const config = {
        horizontal: true
    }

    const css = {
        box_width: "fit-content",
        box_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_h"),

        option_width: "fit-content",
        option_height: getComputedStyle(document.documentElement).getPropertyValue("--bar_h"),
    }

    const backChanger = element.add(component.tag, box)
    backChanger.entryData = data
    backChanger.entryFonts = fonts
    backChanger.entryConfig = config
    backChanger.entryCss = css
    backChanger.addDependency(new dependency())
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const topBar = await drawTopBar(box, dependency)
/*     const backChanger = await drawBackChanger(topBar.getNodes().node_1, dependency)
 */}