import * as dom_helper from "../../modules/dom.js"

const controlPanels = (input) => {
    const menuPanel = dom_helper.id("menuPanel")
    const configPanel = dom_helper.id("configPanel")

    if (input.id === "menuPanel") {
        menuPanel.tooglePanel(!input.checked)
    }

    if (input.id === "configPanel") {
        configPanel.tooglePanel(!input.checked)
    }

    if (input.id === "allPanels") {
        menuPanel.tooglePanel(input.checked)
        configPanel.tooglePanel(input.checked)
    }
}

export const control = async (detail, panels) => {
    controlPanels(detail.input)
}
