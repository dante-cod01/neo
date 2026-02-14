import * as dom_helper from "../../modules/dom.js"

const evalueInputs = (options, panels) => {
    const menuPanel = panels.menuPanel
    const configPanel = panels.configPanel
    const topMenuInput = options[0]
    const topConfigInput = options[1]
    const topAllInput = options[2]

    options.forEach(item => item.checked = false)

    topMenuInput.checked = !menuPanel.state.open
    topConfigInput.checked = !configPanel.state.open

    if (topMenuInput.checked || topConfigInput.checked) topAllInput.checked = false
    if (!topMenuInput.checked && !topConfigInput.checked) topAllInput.checked = true
    if (topMenuInput.checked && topConfigInput.checked) {
        topAllInput.checked = false
        topMenuInput.checked = true
        topConfigInput.checked = true
    }
}

export const control = async (detail, panels) => {
    const panelsOptions = Array.from(dom_helper.id("expandIcons", dom_helper.id("topBar").shadowRoot).shadowRoot.querySelectorAll("input"))
    if (detail.panel && detail.animation === "end") evalueInputs(panelsOptions, panels)
}
