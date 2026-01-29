import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"


const drawComponentContainer = async (box) => {
    const componentContainer = element.add("div", box, "componentContainer componentTransform max center relative", "componentContainer")
    return componentContainer
}

export const drawComponentBox = async (box, dependency) => {
    /* expand-box component */
    const component = await import("../components/nano/expandBox.js")

    const css = {
        main_transition: cssHelper.getVar("normal_transition")
    }

    const componentBox = element.add(component.tag, box, "componentBox max absolute", "componentBox")
    componentBox.eventDom = document
    componentBox.eventName = componentBox.id
    componentBox.css = css
    componentBox.addDependency(new dependency())
    return componentBox
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const container = await drawComponentContainer(box)
    const backLayer = element.add("div", container, "backLayer absolute max")
    const blurLayer = element.add("div", container, "blurLayer absolute max")
    const componentBox = await drawComponentBox(container, dependency)
} 