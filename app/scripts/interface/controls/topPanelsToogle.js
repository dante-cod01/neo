import * as dom_helper from "../../modules/dom.js"

const controlPanels = (input) => {
    const menuPanel = dom_helper.id("menuPanel")
    const configPanel = dom_helper.id("configPanel")

    if (input.id === "menuPanel_input") {
        menuPanel.tooglePanel(!input.checked)
    }

    if (input.id === "configPanel_input") {
        configPanel.tooglePanel(!input.checked)
    }

    if (input.id === "allPanels_input") {
        console.log(input.checked)
        menuPanel.tooglePanel(input.checked)
        configPanel.tooglePanel(input.checked)
    }
}

export const control = async (detail, panels) => {
    controlPanels(detail.input)
}
