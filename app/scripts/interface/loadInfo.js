import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawText = async (box) => {
    const component = await import("../components/nano/animatedText.js")
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    /* section title */
    const sectionFont = [
        { type: "font", name: "Zen+Dots", href: "https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" },
    ]

    const conf = {
        box_width: "300px",
        box_height: "100px",
        box_position: "left",
        box_back: cssHelper.getVar("dark_4"),
        box_border: "none",

        0: {
            textBox_text: "texto 0",
            textBox_position: "relative",
            textBox_font: "Zen Dots",
            textBox_fontSize: "24px",
            textBox_fontStyle: "italic",
            textBox_fontWeight: "bolder",
            textBox_color: "rgba(255, 255, 255, 0.5)",

            textBox_border: "1px solid red",
        },

        1: {
            textBox_text: "texto 0",
            textBox_position: "relative",
            textBox_font: "Zen Dots",
            textBox_fontSize: "24px",
            textBox_fontStyle: "italic",
            textBox_fontWeight: "bolder",
            textBox_color: "rgba(255, 255, 255, 0.5)",

            textBox_border: "1px solid red",
        }


    }

    const infoSection = await element.add(component.tag, box, "infoSection  absolute", "infoSection")
    infoSection.newConf = conf
    infoSection.links = sectionFont
    infoSection.eventDom = document
    infoSection.eventName = infoSection.id
    await infoSection.addDependency(new dependency())
}

export const init = async (box) => {
    await drawText(box)
}