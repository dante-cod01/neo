import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

export const drawNameBar = async (box, dependency) => {
    const component = await import("../components/nano/text/animatedText.js")

    const links = [
        { type: "font", name: "Audiowide", href: "https://fonts.googleapis.com/css2?family=Audiowide&display=swap" },
    ]

    const conf = {
        box_width: "0px",
        box_height: cssHelper.getVar("bar_height"),
        box_back: cssHelper.getVar("dark_4"),
        box_backFilter: `blur(${cssHelper.getVar("interface_blur")})`,
        box_radius: cssHelper.getVar("interface_radius"),
        box_transition: cssHelper.getVar("normal_transition"),

        textBox_width: "fit-content",
        textBox_height: "100%",
        textBox_color: cssHelper.getVar("light_4"),
        textBox_colorEnphasis: "white",
        textBox_font: links[0].name,
        textBox_fontSize: "16px",
        textBox_fontStyle: "italic",
        textBox_padding: "0px 20px",
        textBox_textShadow: `0 0 10px cyan`,
        textBox_filter: "blur(8px)",
        textBox_scale: "2",
        textBox_transition: "500ms ease"
    }

    const nameBar = await element.add(component.tag, box, "nameBar absolute", "nameBar")
    nameBar.newConf = conf
    nameBar.links = links
    nameBar.eventDom = document
    nameBar.eventName = nameBar.id
    nameBar.addDependency(new dependency())
    return nameBar
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const nameBox = await drawNameBar(document.body, dependency)
}