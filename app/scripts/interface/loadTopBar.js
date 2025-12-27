import * as element from "../modules/element.js"
import * as cssHelper from "../modules/css.js"
const expandBar = await import("../components/nano/expandBar.js")
const checkersGroup = await import("../components/nano/checkersGroup.js")

const dependency = (await import("../components/class/componentBase.js")).ComponentBase

const drawTopBar = async (box) => {
    /* expand-bar component */
    const css = {
        box_width: cssHelper.getVar("bar_width"),
        box_height: cssHelper.getVar("bar_height"),
        box_width_max: "130px",
        box_back: cssHelper.getVar("dark_4"),
        box_radius: "6px",
        transition: cssHelper.getVar("normal_transition")
    }

    const topBar = element.add(expandBar.tag, box, "bars topBar", "topBar")
    topBar.css = css
    topBar.eventDom = document
    topBar.eventName = topBar.id
    topBar.addDependency(new dependency())
    topBar.addNodes(3)
    return topBar
}

const drawBackChanger = async (box) => {
    /* backs changer */
    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const data = [
        { box: "radio", id: "1", name: "back", type: "text", icon: "1", checked: true },
        { box: "radio", id: "2", name: "back", type: "text", icon: "2" },
        { box: "radio", id: "3", name: "back", type: "text", icon: "3" },
        { box: "radio", id: "4", name: "back", type: "text", icon: "4" },
        { box: "radio", id: "5", name: "back", type: "text", icon: "5" },
    ]

    const css = {
        box_width: "fit-content",
        box_height: cssHelper.getVar("bar_height"),

        transition: "140ms ease-in-out",

        option_width: "fit-content",
        option_height: "100%",
        option_hover_color: cssHelper.getVar("dark_1"),
        option_hover_back: cssHelper.getVar("light_2"),
        option_checked_color: cssHelper.getVar("dark_1"),
        option_checked_back: cssHelper.getVar("enphasis_1"),

        iconBox_size: "20px",
        iconBox_margin: "4px",
        icon_font: "Anta",
        icon_color: cssHelper.getVar("dark_2"),
        icon_back: cssHelper.getVar("light_5"),
        icon_radius: "50%",
        icon_border: `1px solid ${cssHelper.getVar("light_5")}`,
        icon_fontSize: "10px"
    }

    const logic = {
        horizontal: true
    }

    const backChanger = element.add(checkersGroup.tag, box, "", "backChanger")
    backChanger.data = data
    backChanger.links = links
    backChanger.css = css
    backChanger.logic = logic
    backChanger.eventDom = document
    backChanger.eventName = backChanger.id
    backChanger.addDependency(new dependency())
    return backChanger
}

const drawViewChanger = async (box) => {
    /* views changer */
    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
    ]

    const data = [
        { box: "space", size: "5px" },
        { box: "radio", id: "computer", name: "view", type: "material", icon: "computer", checked: true },
        { box: "radio", id: "tablet", name: "view", type: "material", icon: "crop_landscape" },
        { box: "radio", id: "mobile", name: "view", type: "material", icon: "mobile_3" },
        { box: "space", size: "20px" },
        { box: "checkbox", id: "rotate", type: "material", icon: "autorenew", disabled: true },
        { box: "checkbox", id: "fullscreen", type: "material", icon: "crop_free" },
        { box: "space", size: "5px" },
    ]

    const css = {
        box_width: "auto",
        box_height: `calc(${cssHelper.getVar("bar_height")} - 8px)`,
        box_back: cssHelper.getVar("dark_2"),
        box_radius: "6px",

        option_width: "28px",
        option_height: "100%",
        option_hover_color: cssHelper.getVar("light_2"),
        option_checked_color: cssHelper.getVar("enphasis_1"),

        material_size: cssHelper.getVar("bar_height"),
        material_color: cssHelper.getVar("light_4"),
        material_fontSize: "16px",
        material_disabled: cssHelper.getVar("grey_2")
    }

    const logic = {
        horizontal: true
    }

    const viewChanger = element.add(checkersGroup.tag, box, "", "viewChanger")
    viewChanger.data = data
    viewChanger.links = links
    viewChanger.css = css
    viewChanger.logic = logic
    viewChanger.eventDom = document
    viewChanger.eventName = viewChanger.id
    viewChanger.addDependency(new dependency())
    return viewChanger
}

const drawPanelsControls = async (box) => {
    /* panels control */
    const links = [
        { type: "font", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
    ]

    const data = [
        { box: "space", size: "5px" },
        { box: "radio", id: "computer", name: "view", type: "material", icon: "arrow_menu_close" },
        { box: "radio", id: "mobile", name: "view", type: "material", icon: "arrow_menu_open" },
        { box: "radio", id: "tablet", name: "view", type: "material", icon: "crop_landscape", checked: true },
        { box: "space", size: "5px" },
    ]

    const css = {
        box_width: "auto",
        box_height: `calc(${cssHelper.getVar("bar_height")} - 8px)`,
        box_back: cssHelper.getVar("dark_2"),
        box_radius: "6px",

        option_width: "28px",
        option_height: "100%",
        option_hover_color: cssHelper.getVar("light_1"),
        option_checked_color: cssHelper.getVar("enphasis_1"),

        material_fontSize: "16px",
        material_color: cssHelper.getVar("light_4"),
    }

    const logic = {
        horizontal: true
    }

    const panelsControls = element.add(checkersGroup.tag, box, "", "panelsControls")
    panelsControls.data = data
    panelsControls.links = links
    panelsControls.css = css
    panelsControls.logic = logic
    panelsControls.eventDom = document
    panelsControls.eventName = panelsControls.id
    panelsControls.addDependency(new dependency())
}

export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase

    const topBar = await drawTopBar(box, dependency)
    const backChanger = await drawBackChanger(topBar.nodes.node_1, dependency)
    const viewChanger = await drawViewChanger(topBar.nodes.node_2, dependency)
    const panelControls = await drawPanelsControls(topBar.nodes.node_0, dependency)
}