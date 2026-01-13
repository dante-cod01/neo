import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"
const dependency = (await import("../components/class/componentBase.js")).ComponentBase

const drawInfoContainer = async (box) => {
    const infoContainer = element.add("section", box, "infoContainer absolute")
    const relativeBox = element.add("div", infoContainer, "relativeInfoBox relative")
    const infoSectionBox = element.add("div", relativeBox, "infoSectionBox absolute")
    const infoNameBox = element.add("div", relativeBox, "infoNameBox absolute")
    return [infoSectionBox, infoNameBox]
}

const drawText = async (containers) => {
    console.log(containers)
    const component = await import("../components/nano/animatedText.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    /* section title */
    const sectionFont = [
        { type: "font", name: "Zen+Dots", href: "https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" },
    ]

    const sectionCss = {
        font_family: "Zen Dots",
        font_size: "60px",
        font_style: "italic",
        font_color: cssHelper.getVar("light_5"),
        textOpacity_before: "0",
        textOpacity_after: "0.2",
        textFilter_before: "blur(10px)",
        textBox_right: "-30px",
        text_weight: "bolder",
        transition: "1s ease-out"
    }

    const sectionLogic = {
/*         upperCase: true
 */    }

    const infoSection = element.add(component.tag, containers[0], "infoSection", "infoSection")
    infoSection.css = sectionCss
    infoSection.logic = sectionLogic
    infoSection.links = sectionFont
    infoSection.eventDom = document
    infoSection.eventName = infoSection.id
    infoSection.addDependency(new dependency())

    /* setion info */
    const nameFont = [
        { type: "font", name: "Walter Turncoat", href: "https://fonts.googleapis.com/css2?family=Walter+Turncoat&display=swap" },
    ]

    const nameCss = {
        font_family: "Walter Turncoat",
        font_size: "14px",
        font_style: "normal",
        font_color: cssHelper.getVar("light_1"),
        text_weight: "bolder",
        textOpacity_before: "0",
        textOpacity_after: "0.5",
        textFilter_before: "blur(10px)",
        text_indent: "60px",
        textBox_right: "-50px",
        transition: "1s ease-out"
    }

    const infoName = element.add(component.tag, containers[1], "infoName", "infoName")
    infoName.css = nameCss
    infoName.links = nameFont
    infoName.eventDom = document
    infoName.eventName = infoName.id
    infoName.addDependency(new dependency())
    console.log(infoName)
}

export const init = async (box) => {
    const containers = await drawInfoContainer(box)
    await drawText(containers)
}