import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"
const expandBar = await import("../components/nano/expandBar.js")
const dependency = (await import("../components/class/componentBase.js")).ComponentBase

const drawInfoBar = async (box) => {
    const css = {
        box_width: "0px",
        box_height: "100px",
        box_width_max: "130px",
        box_back: cssHelper.getVar("dark_4"),
        box_radius: "6px",
        box_blur: cssHelper.getVar("interface_blur"),
        transition: cssHelper.getVar("normal_transition")
    }

        const infoBar = element.add(expandBar.tag, box, "absolute infoBar", "infoBar")
        infoBar.css = css
        infoBar.eventDom = document
        infoBar.eventName = infoBar.id
        infoBar.addDependency(new dependency())
        infoBar.addNodes(1)
        return infoBar
}

export const init = async (box) => {
    const infoBar = await drawInfoBar(box)
}