import * as cssHelper from "../modules/css.js"
import * as element from "../modules/element.js"

const drawBottomBar = async (box, dependency) => {
    const component = await import("../components/nano/expandBar.js")

    const conf = {
        box_width: cssHelper.getVar("bar_width"),
        box_height: cssHelper.getVar("bar_height"),
        box_width_max: "180px",
        box_back: cssHelper.getVar("dark_4"),
        box_radius: cssHelper.getVar("interface_radius"),
        box_nodesLayer_padding: "0px 20px 0px 0px",
        box_transition: cssHelper.getVar("normal_transition")
    }

    const bottomBar = element.add(component.tag, box, "absolute bottomBar", "bottomBar")
    bottomBar.newConf = conf
    bottomBar.eventDom = document
    bottomBar.eventName = bottomBar.id
    bottomBar.addDependency(new dependency())
    bottomBar.addNodes(2)
    return bottomBar
}

const drawTitlesBox = async (box, dependency) => {
    const component = await import("../components/nano/expandBox.js")

    const conf = {
        box_position: "absolute",
        box_top: `calc(0% - ${cssHelper.getVar("bar_height")}`,
        box_width: "0px",
        box_height: "100px",
        box_border: "1px solid red",
    }

    const titlesBox = element.add(component.tag, box, "titlesBox absolute", "titlesBox")
    titlesBox.eventDom = document
    titlesBox.eventName = titlesBox.id
    titlesBox.newConf = conf
    titlesBox.addDependency(new dependency())
    titlesBox.addNodes(3)
    return titlesBox
}

const drawSection = async (box, dependency) => {
    const component = await import("../components/nano/text/animatedText.js")

    const links = [
        { type: "font", name: "Permanent Marker", href: "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" },
    ]

    const conf = {
        box_width: "0px",
/*         box_height: cssHelper.getVar("bar_height"),
 */        box_height: "fit-content",
        box_transition: cssHelper.getVar("normal_transition"),

        textBox_width: "fit-content",
        textBox_height: "100%",
        textBox_color: cssHelper.getVar("light_4"),
        textBox_colorEnphasis: "white",
        textBox_font: links[0].name,
        textBox_fontSize: "30px",
/*         textBox_fontStyle: "italic",
 */        textBox_padding: "0px 20px",
        textBox_textShadow: `0 0 10px cyan`,
        textBox_filter: "blur(8px)",
        textBox_scale: "2",
        textBox_transition: "500ms ease"
    }

    const logic = {
        upperCase: true
    }

    const sectionComponent = await element.add(component.tag, box, "absolute", "titleSection")
    sectionComponent.newConf = conf
    sectionComponent.newLogic = logic
    sectionComponent.links = links
    sectionComponent.eventDom = document
    sectionComponent.eventname = sectionComponent.id
    sectionComponent.addDependency(new dependency())
    return sectionComponent
}

const drawName = async (box, dependency) => {
    const component = await import("../components/nano/text/animatedText.js")

    const links = [
        { type: "font", name: "Finger Paint", href: "https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap" },
    ]

    const conf = {
        box_width: "0px",
        box_height: "fit-contentd",
/*         box_back: cssHelper.getVar("dark_4"),
        box_backFilter: `blur(${cssHelper.getVar("interface_blur")})`,
 */        box_radius: cssHelper.getVar("interface_radius"),
        box_transition: cssHelper.getVar("normal_transition"),

        textBox_width: "fit-content",
        textBox_height: "100%",
        textBox_color: cssHelper.getVar("light_4"),
        textBox_colorEnphasis: "white",
        textBox_font: links[0].name,
        textBox_fontSize: "12px",
/*         textBox_fontStyle: "italic",
 */        textBox_padding: "0px 20px",
        textBox_textShadow: `0 0 10px cyan`,
        textBox_filter: "blur(8px)",
        textBox_scale: "2",
        textBox_transition: "500ms ease"
    }

    const logic = {
        upperCase: false
    }

    const nameBar = await element.add(component.tag, box, "absolute", "titleName")
    nameBar.newConf = conf
    nameBar.newLogic = logic
    nameBar.links = links
    nameBar.eventDom = document
    nameBar.eventName = nameBar.id
    nameBar.addDependency(new dependency())
    return nameBar
}


export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const bottomBar = await drawBottomBar(box, dependency)
    const titlesBox = await drawTitlesBox(bottomBar.nodes.node_0, dependency)
    await drawSection(titlesBox.nodes.node_0, dependency)
    await drawName(titlesBox.nodes.node_1, dependency)
}