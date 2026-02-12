import * as dom_helper from "../../modules/dom.js"

const blockInputs = (boolean) => {
    const options = Array.from(dom_helper.id("expandIcons", dom_helper.id("topBar").shadowRoot).shadowRoot.querySelectorAll("input"))
    options.forEach(item => { item.disabled = boolean })
}

export const control = (detail, bars) => {
    bars[detail.bar] = detail.expand
    if (bars.topBar || bars.bottomBar) blockInputs(true)
    if (!bars.topBar && !bars.bottomBar) blockInputs(false)
}