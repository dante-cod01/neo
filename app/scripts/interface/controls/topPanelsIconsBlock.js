import * as dom_helper from "../../modules/dom.js"

const blockInputs = (boolean) => {
    const options = Array.from(dom_helper.id("expandIcons", dom_helper.id("topBar").shadowRoot).shadowRoot.querySelectorAll("input"))
    options.forEach(item => { item.disabled = boolean })
}

export const control = (detail, bars, panels) => {
    if (detail.bar && detail.animation) bars[detail.bar] = detail.animation
    if (detail.panel && detail.animation) panels[detail.panel] = detail.animation

    const barsState = !Object.values(bars).includes("init")
    const panelsState = !Object.values(panels).includes("init")

    if (!barsState || !panelsState) blockInputs(true)
    if (barsState && panelsState) blockInputs(false)
}