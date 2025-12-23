import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawComponentBox = async (box) => {
    /* expand-box component */
    const component = await import("../components/nano/expandBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const css = {
        box_width: "100%",
        box_height: "100%",
        box_back: "green",
        box_shadow: "5px 5px 20px rgb(28, 28, 28)",
        main_transition: cssHelper.getVar("normal_transition")
    }

    const componentBox = element.add(component.tag, box, "componentBox  rotate_0", "componentBox")
    componentBox.eventDom = document
    componentBox.eventName = "componentBox"
    componentBox.css = css
    componentBox.addDependency(new dependency())

    await new Promise(resolve => setTimeout(resolve, 2000))
    return componentBox
}

export const init = async (box) => {
    const componentBox = await drawComponentBox(box)
} 