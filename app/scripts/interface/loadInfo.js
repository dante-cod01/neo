import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawText = async (box) => {
    const component = await import("../components/nano/animatedText.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    /* section title */
    const sectionFont = [
        { type: "font", name: "Zen+Dots", href: "https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" },
    ]

    const css = {
        box_width: "300px",
        box_height: "100px",

/*         font_family: "Zen Dots",
        font_size: "24px",
        font_style: "italic",
        font_color: "rgba(255, 255, 255, 0.49)",
        font_weight: "bolder",
        back: "black",
        transition: cssHelper.getVar("info_transition")
 */    }

    const logic = {

    }

    const content = {
        textBox_text_0: "texto 0",
/*         textBox_width_0: "100%",
        textBox_height_0: "100%",
 */        textBox_border_0: "1px solid red",
         textBox_text_2: "texto 2",

    }

    const infoSection = await element.add(component.tag, box, "infoSection  absolute", "infoSection")
    infoSection.css = css
    infoSection.logic = logic
    infoSection.content = content
    infoSection.links = sectionFont
    infoSection.eventDom = document
    infoSection.eventName = infoSection.id
    await infoSection.addDependency(new dependency())
}

export const init = async (box) => {
    await drawText(box)
}