import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawComponentContainer = async (box) => {
    const componentContainer = element.add("div", box, "max center", "componentContainer")
    return componentContainer
}

export const drawComponentBox = async (box, width, height) => {
    /* expand-box component */
    const component = await import("../components/nano/expandBox.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const css = {
        box_width: width,
        box_height: height,
        box_back: "green",
        box_shadow: "5px 5px 20px rgb(28, 28, 28)",
        main_transition: cssHelper.getVar("normal_transition")
    }

    const componentBox = element.add(component.tag, box, "componentTransform componentOpacity componentTransition", "componentBox")
    componentBox.eventDom = document
    componentBox.eventName = "componentBox"
    componentBox.css = css
    componentBox.addDependency(new dependency())

/*     await new Promise(resolve => setTimeout(resolve, 2000))
 */    return componentBox
}

export const init = async (box) => {
    const container = await drawComponentContainer(box)
    const componentBox = await drawComponentBox(componentContainer, "100%", "100%")
} 