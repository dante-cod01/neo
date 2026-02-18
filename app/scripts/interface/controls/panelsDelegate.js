import * as dom_helper from "../../modules/dom.js"

const delegate = (input) => {
    const menuPanel = dom_helper.search("#menuPanel")
    const configPanel = dom_helper.search("#configPanel")

    if (input.id === "menuPanel_input") {
        menuPanel.tooglePanel(!input.checked)
    }

    if (input.id === "configPanel_input") {
        configPanel.tooglePanel(!input.checked)
    }

    if (input.id === "allPanels_input") {
        menuPanel.tooglePanel(input.checked)
        configPanel.tooglePanel(input.checked)
    }
}

export const control = async (detail) => {
    delegate(detail.input)
}
