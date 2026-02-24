import * as dom_helper from "../../modules/dom.js"
import * as css_helper from "../../modules/css.js"
import * as checkers from "../../components/comp-classes/nano/inputs/checkersGroup.js"
import * as dep from "../../components/comp-dependencies/base.js"
import * as component from "./../../../runtime/componentLoader.js"

const presetsConf = {
    data: [
        { box: "radio", id: "1", name: "back", type: "text", icon: "1" },
        { box: "radio", id: "2", name: "back", type: "text", icon: "2" },
        { box: "radio", id: "3", name: "back", type: "text", icon: "3" },
        { box: "radio", id: "4", name: "back", type: "text", icon: "4" },
        { box: "radio", id: "5", name: "back", type: "text", icon: "5" },
    ],
    css: {
        box_width: "100%",
        box_height: "44px",
        option_width: "fit-content",
        option_height: "20px",
        option_hover_color: css_helper.getVar("dark_1"),
        option_hover_back: css_helper.getVar("light_2"),
        option_checked_color: css_helper.getVar("dark_1"),
        option_checked_back: css_helper.getVar("enphasis_1"),

        iconBox_size: "20px",
        iconBox_margin: "4px",
        icon_font: "Anta",
        icon_color: css_helper.getVar("dark_2"),
        icon_back: css_helper.getVar("light_5"),
        icon_radius: "50%",
        icon_border: `1px solid ${css_helper.getVar("light_5")}`,
        icon_fontSize: "10px"
    },
    logic: {
        horizontal: true
    },
    events: { dom: document, name: "componentLoaded" },
    dep: dep,
    id: "componentPresets"
}

const drawPresets = async (boolean, presetsSection = null, actualComponent = null) => {
    if (boolean) {
        console.log(checkers, checkers.tag, checkers.name)
        const presets = component.load(checkers, presetsConf, "", dep, presetsSection)
    } else {
        presetsSection.innerHTML = ""
    }
}

const tooglePresetsBox = async (boolean, sections = null) => {
    if (boolean) {
        sections[0].classList.add("configSection_reduced")
        sections[1].classList.add("presetSection_open")
    } else {
        sections[0].classList.remove("configSection_reduced")
        sections[1].classList.remove("presetSection_open")
    }
}

export const control = async (boolean, actualComponent) => {
    const configPanel = dom_helper.search("#configPanel")
    const configSection = dom_helper.search("#configSection", configPanel.nodes.node_0)
    const presetsSection = dom_helper.search("#presetsSection", configPanel.nodes.node_0)

    if (boolean) {
        drawPresets(true, presetsSection, actualComponent)
        tooglePresetsBox(true, [configSection, presetsSection])
    } else {
        await tooglePresetsBox(false, [configSection, presetsSection])
        drawPresets(false, presetsSection)
    }
}