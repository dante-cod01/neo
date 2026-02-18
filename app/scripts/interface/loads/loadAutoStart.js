import * as appConfig from "./../../../config/appConfig.js"
import * as dom_helper from "./../../modules/dom.js"
import * as css_helper from "./../../modules/css.js"
import * as utils_helper from "./../../modules/utils.js"

const drawAutoStart = async (box) => {
    const component = await import("../../components/comp-classes/nano/inputs/switch_01.js")
    const dependency = (await import("../../components/comp-dependencies/componentBase.js")).ComponentBase

    const fonts = [
        { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        box_width: "170px",
        box_height: "24px",

        switch_width: "40px",
        switch_height: "16px",
        switch_back_off: css_helper.getVar("grey_4"),
        switch_back_on: css_helper.getVar("light_4"),
        switch_radius: "4px",
        switch_shadow: "inset 1px 0 4px black",

        pointer_width: "20px",
        pointer_height: "14px",
        pointer_back_off: css_helper.getVar("light_5"),
        pointer_back_on: "white",
        pointer_border_off: "5px solid transparent",
        pointer_border_on: `5px solid ${css_helper.getVar("enphasis_1")}`,
        pointer_filter: "blur(2px)",
        pointer_radius: "4px",

        icon_size: "20px",
        icon_color: "green",

        label_font: "Anta",
        label_style: "italic",
        label_size: "12px",
        label_color: css_helper.getVar("light_5"),
        label_padding: "0 44px 0 0",
        label_hover_color: css_helper.getVar("light_4"),
        label_checked_color: css_helper.getVar("light_4"),
        transition: "160ms ease-out"
    }

    const logic = {
        label_content: "Auto Start",
        type: "switch",
        label_pos: "left",
        icon: "motion_play",
        icon_pos: "left"
    }

    const autoStartToogle = dom_helper.add(component.tag, box, "", "toogleAutoStart")
    autoStartToogle.css = css
    autoStartToogle.logic = logic
    autoStartToogle.fonts = fonts
    autoStartToogle.eventDom = document
    autoStartToogle.eventName = autoStartToogle.id
    autoStartToogle.addDependency(new dependency())
    return autoStartToogle
}

const saveModeStatus = (boolean) => {
    localStorage.setItem("appAutoLoad", JSON.stringify(boolean))
}

const eventListener = (menuPanel) => {
    document.addEventListener("toogleAutoStart", async (e) => {
        if (e.detail.value) {
            startAutoMode(menuPanel)
            saveModeStatus(true)
        } else {
            saveModeStatus(false)
        }
    })
}

const startAutoMode = async (box) => {
    const listItems = box.nodes.node_0.children[0]
    listItems.items.section_0.sectionInput.checked = true
    listItems.items.section_0.sectionInput.dispatchEvent(new CustomEvent("change"))
    await utils_helper.pause(500)
    listItems.items.section_0.itemsInput[0].checked = true
    listItems.items.section_0.itemsInput[0].dispatchEvent(new CustomEvent("change"))
}

const init = async () => {
    if (appConfig.autoLoad) {
        const menuPanel = dom_helper.search("#menuPanel")
        const autoStart = await drawAutoStart(menuPanel.nodes.node_1)
        const loadConfig = JSON.parse(localStorage.getItem("appAutoLoad"))
        eventListener(menuPanel)

        if (loadConfig) {
            await utils_helper.pause(500) /* waiting for active input */
            autoStart.inputChecked(true)
            await utils_helper.pause(300)
            startAutoMode(menuPanel)
        }
    }
}

init()