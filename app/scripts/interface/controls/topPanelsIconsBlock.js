import * as dom_helper from "../../modules/dom.js"

const blockInputs = (boolean) => {
    const options = Array.from(dom_helper.search("#expandIcons", dom_helper.search("#topBar").shadowRoot).shadowRoot.querySelectorAll("input"))
    options.forEach(item => { item.disabled = boolean })
}

export const control = (detail) => {
    detail.panel && detail.animation === "init" ? blockInputs(true) : blockInputs(false)
}