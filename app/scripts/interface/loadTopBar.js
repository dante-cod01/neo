import * as element from "../modules/element.js"

const drawTopBar = async (box) => {
    const component = await import("../components/nano/expandBar.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const configCss = {
        box_w: getComputedStyle(document.documentElement).getPropertyValue("--bar_w"),
        box_h: getComputedStyle(document.documentElement).getPropertyValue("--bar_h"),
        box_w_max: "130px",
        box_back: getComputedStyle(document.documentElement).getPropertyValue("--main_back"),
        box_radius: "4px",
        transition: getComputedStyle(document.documentElement).getPropertyValue("--light_transition")
    }

    const topBar = element.add(component.tag, box, "bars topBar", "topBar")
    topBar.entryCss = configCss
    topBar.eventDom = document
    topBar.eventName = "topBar"
    topBar.addDependency(new dependency())
    return topBar
}

export const init = async (box) => {
    const topBar = await drawTopBar(box)
    await new Promise(resolve => setTimeout(resolve, 2000))
}