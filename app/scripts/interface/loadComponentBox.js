import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawComponentContainer = async (box) => {
    const componentContainer = element.add("div", box, "componentContainer max center relative", "componentContainer")
    return componentContainer
}

const drawBacksLayers = (box) => {
    const backLayer = element.add("div", box, "backLayer absolute max")
    const blurLayer = element.add("div", box, "blurLayer absolute max")
}

export const drawComponentBox = async (box, width, height) => {
    /* expand-box component */
    const component = await import("../components/nano/expandBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const css = {
        box_width: width,
        box_height: height,
        main_transition: cssHelper.getVar("normal_transition")
    }

    const componentBox = element.add(component.tag, box, "componentTransform componentOpacity componentTransition", "componentBox")
    componentBox.eventDom = document
    componentBox.eventName = "componentBox"
    componentBox.css = css
    componentBox.addDependency(new dependency())
    return componentBox
}


export const init = async (box) => {
    const container = await drawComponentContainer(box)
    const backsLayer = drawBacksLayers(container)
    const componentBox = await drawComponentBox(container, "100%", "100%")
} 