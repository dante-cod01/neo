import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"
const dependency = (await import("../components/class/componentBase.js")).ComponentBase

const drawInfoContainer = async (box) => {
    const infoContainer = element.add("section", box, "infoContainer absolute", "infoContainer")
    const relativeBox = element.add("div", infoContainer, "relativeInfoBox relative", "relativeInfoBox")
    const infoSectionBox = element.add("div", relativeBox, "infoSectionBox absolute")
    const infoNameBox = element.add("div", relativeBox, "infoNameBox absolute")
    return [infoSectionBox, infoNameBox]
}

const drawText = async (containers) => {
    const component = await import("../components/nano/animatedText.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    /* section title */
    const sectionFont = [
        { type: "font", name: "Zen+Dots", href: "https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" },
    ]

    const sectionCss = {
        font_family: "Zen Dots",
        font_size: "24px",
        font_style: "italic",
        back: "black",
        font_color: "rgba(255, 255, 255, 0.49)",
        text_opacity: "0.4",
        textFilter_before: "blur(20px)",
        text_padding: "0 20px 0 20px",
        text_mix: "overlay",
        moveTo: "0%",
        moveFrom: "100%",
        text_weight: "bolder",
        transition: cssHelper.getVar("info_transition")
    }

    const infoSection = await element.add(component.tag, containers[0], "infoSection", "infoSection")
    infoSection.css = sectionCss
    infoSection.links = sectionFont
    infoSection.eventDom = document
    infoSection.eventName = infoSection.id
    infoSection.addDependency(new dependency())

    /* setion info */
    const nameFont = [
        { type: "font", name: "Syne Mono", href: "https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap" },
    ]

    const nameCss = {
        font_family: "Syne Mono",
        font_size: "14px",
        font_style: "normal",
        font_color: cssHelper.getVar("light_1"),
/*         text_weight: "bolder",
 */        text_opacity: "0.5",
        textFilter_before: "blur(20px)",
        text_padding: "0 20px 0 20px",
        moveTo: "100%",
        moveFrom: "0%",
        transition: cssHelper.getVar("info_transition")
    }

    const infoName = await element.add(component.tag, containers[1], "infoName", "infoName")
    infoName.css = nameCss
    infoName.links = nameFont
    infoName.eventDom = document
    infoName.eventName = infoName.id
    infoName.addDependency(new dependency())
}

export const init = async (box) => {
    const containers = await drawInfoContainer(box)
    await drawText(containers)
}