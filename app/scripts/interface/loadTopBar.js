import * as element from "../modules/element.js"

const drawTopBar = async (box) => {
    const component = await import("../components/nano/autoBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const configCss = {
        box_W: getComputedStyle(document.documentElement).getPropertyValue("--bar_Width"),
        box_H: getComputedStyle(document.documentElement).getPropertyValue("--bar_Height"),
        box_back: getComputedStyle(document.documentElement).getPropertyValue("--main_Back"),
    }

    const topBar = element.add(component.tag, box, "bars topBar")
    topBar.entryCss = configCss
    topBar.addDependency(new dependency())
}

export const init = async (box) => {
    const topBar = await drawTopBar(box)
}