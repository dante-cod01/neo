import * as css_helper from "../modules/css.js"
import * as element from "../modules/element.js"

const drawBottomBar = async (box, dependency) => {
    const component = await import("../components/nano/expandBar.js")

    const conf = {
        box_width: css_helper.getVar("bar_width"),
        box_height: css_helper.getVar("bar_height"),
        box_width_max: "180px",
        box_back: css_helper.getVar("dark_4"),
        box_backFilter: `blur(${css_helper.getVar("interface_blur")})`,
        box_radius: css_helper.getVar("interface_radius"),
        box_nodesLayer_padding: "0px 20px 0px 20px",
        box_transition: css_helper.getVar("normal_transition")
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
        box_top: `calc(-50% + ${css_helper.getVar("bar_height")} / 2 )`,
        box_width: "0px",
        box_height: "54px",
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
        box_height: "34px",
        box_radius: "8px",
        box_back: css_helper.getVar("light_4"),
        box_backFilter: `blur(${css_helper.getVar("interface_blur")})`,
        box_transition: css_helper.getVar("normal_transition"),

        textBox_width: "fit-content",
        textBox_height: "100%",
        textBox_color: css_helper.getVar("dark_2"),
        textBox_colorEnphasis: "cyan",
        textBox_font: links[0].name,
        textBox_fontSize: "22px",
        textBox_padding: "0px 20px",
        textBox_textShadow: `0 0 10px cyan`,
        textBox_scale: "3",
        textBox_transition: "500ms ease-in",
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
        { type: "font", name: "Sour Gummy", href: "https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" },
        { type: "font", name: "Ubuntu Mono", href: "https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
    ]

    const conf = {
        box_width: "0px",
        box_height: "20px",
        box_radius: css_helper.getVar("interface_radius"),
        box_transition: css_helper.getVar("normal_transition"),

        textBox_width: "100%",
        textBox_height: "100%",
        textBox_color: css_helper.getVar("light_4"),
        textBox_colorEnphasis: "white",
        textBox_font: links[1].name,
        textBox_fontSize: "14px",
        textBox_fontStyle: "italic",
/*         textBox_fontWeight: "bolder",
 */        textBox_padding: "0px 20px",
        textBox_textShadow: `0 0 10px white`,
        textBox_scale: "1",
        textBox_transition: "500ms ease-in",
        textBox_side: "center",
        char_spacing: "1px"
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