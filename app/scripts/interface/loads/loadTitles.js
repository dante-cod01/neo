import * as css_helper from "./../../modules/css.js"
import * as element from "./../../modules/element.js"

const drawTitlesBox = async (box, dependency) => {
    const component = await import("../../components/comp-classes/nano/expandBox.js")

    const conf = {
        box_position: "absolute",
        box_top: `calc(-50% + ${css_helper.getVar("bar_height")} / 2 )`,
        box_width: "0px",
        box_height: "48px",
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
    const component = await import("../../components/comp-classes/nano/text/animatedText.js")

    const links = [
        { type: "font", name: "Permanent Marker", href: "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" },
    ]

    const conf = {
        box_width: "0px",
        box_height: "32px",
        box_radius: "4px",
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
    const component = await import("../../components/comp-classes/nano/text/animatedText.js")

    const links = [
        { type: "font", name: "Orbitron", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" },
        { type: "font", name: "Michroma", href: "https://fonts.googleapis.com/css2?family=Michroma&display=swap" },
        { type: "font", name: "Audiowide", href: "https://fonts.googleapis.com/css2?family=Audiowide&display=swap" },
        { type: "font", name: "Oxanium", href: "https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" },
        { type: "font", name: "Syncopate", href: "https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap" },
    ]

    const conf = {
        box_width: "0px",
        box_height: "20px",
        box_radius: css_helper.getVar("interface_radius"),
        box_transition: css_helper.getVar("normal_transition"),

        textBox_width: "100%",
        textBox_height: "100%",
        textBox_color: css_helper.getVar("grey_2"),
        textBox_colorEnphasis: "white",
        textBox_font: links[4].name,
        textBox_fontSize: "10px",
        textBox_fontWeight: "bolder",
        textBox_padding: "0px 20px",
        textBox_textShadow: `0 0 10px white`,
        textBox_transition: "500ms ease-in",
        textBox_side: "center",
        char_spacing: "0px"
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
    const dependency = (await import("../../components/comp-dependencies/componentBase.js")).ComponentBase

    const titlesBox = await drawTitlesBox(box, dependency)
    await drawSection(titlesBox.nodes.node_0, dependency)
    await drawName(titlesBox.nodes.node_1, dependency)
}