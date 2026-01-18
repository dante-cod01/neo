import * as appConfig from "./../../config/appConfig.js"
import * as element from "./../modules/element.js"
import * as cssHelper from "./../modules/css.js"

const drawAutoStart = async () => {
    const component = await import("../components/nano/inputs/switch_01.js")
    const dependency = (await import("../components/class/nano.js")).Nano

    const fonts = [
        { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
    ]

    const css = {
        box_width: "170px",
        box_height: "24px",

        switch_width: "40px",
        switch_height: "16px",
        switch_back_off: cssHelper.getVar("grey_4"),
        switch_back_on: cssHelper.getVar("light_4"),
        switch_radius: "4px",
        switch_shadow: "inset 1px 0 4px black",

        pointer_width: "20px",
        pointer_height: "14px",
        pointer_back_off: cssHelper.getVar("light_5"),
        pointer_back_on: "white",
        pointer_border_off: "6px solid transparent",
        pointer_border_on: `6px solid tomato`,
        pointer_filter: "blur(3px)",
        pointer_radius: "4px",

        icon_size: "20px",
        icon_color: "green",

        label_font: "Anta",
        label_style: "italic",
        label_size: "12px",
        label_color: cssHelper.getVar("light_5"),
        label_padding: "0 44px 0 0",
        label_hover_color: cssHelper.getVar("light_4"),
        label_checked_color: cssHelper.getVar("light_2"),
        transition: "160ms ease-out"
    }

    const logic = {
        label_content: "Auto Start",
        type: "switch",
        label_pos: "left",
        icon: "motion_play",
        icon_pos: "left"
    }

    const menuPanel = document.getElementById("menuPanel").nodes.node_1
    const autoStartToogle = element.add(component.tag, menuPanel, "", "toogleAutoStart")
    autoStartToogle.css = css
    autoStartToogle.logic = logic
    autoStartToogle.fonts = fonts
    autoStartToogle.eventDom = "not-used"
    autoStartToogle.eventName = "not-used"
    autoStartToogle.addDependency(new dependency())
    return autoStartToogle
}

const saveModeStatus = (boolean) => {
    localStorage.setItem("appAutoLoad", JSON.stringify(boolean))
}

const listenAutoStart = (input) => {
    input.addEventListener("change", (e) => {
        if (e.target.checked) {
            startAutoMode()
            saveModeStatus(true)
        } else {
            saveModeStatus(false)
        }
    })
}

const startAutoMode = async () => {
    const listItems = document.getElementById("menuPanel").nodes.node_0.children[0]
    listItems.items.section_0.sectionInput.checked = true
    listItems.items.section_0.sectionInput.dispatchEvent(new CustomEvent("change"))
    await new Promise(resolve => setTimeout(resolve, 1000))
    listItems.items.section_0.itemsInput[0].checked = true
    listItems.items.section_0.itemsInput[0].dispatchEvent(new CustomEvent("change"))
}

const init = async () => {
    if (appConfig.autoLoad) {
        const autoStart = await drawAutoStart()
        listenAutoStart(autoStart.input)
        const loadConfig = JSON.parse(localStorage.getItem("appAutoLoad"))
        if (loadConfig) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            autoStart.inputChecked(true)
            await new Promise(resolve => setTimeout(resolve, 500))
            startAutoMode()
        }
    }
}

init()