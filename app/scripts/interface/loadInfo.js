import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"

const drawInfoBox = async (box, dependency) => {
    const component = await import("../components/nano/expandBar.js")

    /* section title */
    const sectionFont = [
        { type: "font", name: "Bungee", href: "https://fonts.googleapis.com/css2?family=Bungee&display=swap" },
        { type: "font", name: "Schoolbell", href: "https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" },
    ]

    const conf = {
        width: "300px",
        height: cssHelper.getVar("bar_height"),
        back: cssHelper.getVar("dark_4"),
        radius: cssHelper.getVar("bar_radius"),
        backDrop_filter: "none",
        transition: cssHelper.getVar("normal_transition")
    }

    const infoBox = await element.add(component.tag, box, "infoBox  absolute", "infoBox")
    infoBox.newConf = conf
    infoBox.links = sectionFont
    infoBox.eventDom = document
    infoBox.eventName = infoBox.id
    await infoBox.addDependency(new dependency())
    infoBox.addNodes(1)

    await new Promise(resolve => setTimeout(resolve, 1000))
    return infoBox
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    await drawInfoBox(box, dependency)
}