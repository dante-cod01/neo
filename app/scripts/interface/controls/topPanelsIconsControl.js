import * as dom_helper from "../../modules/dom.js"

const controlIcons = (input, icons) => {
    const options = Array.from(dom_helper.id("expandIcons", dom_helper.id("topBar").shadowRoot).shadowRoot.querySelectorAll("input"))
    const menu = options[0]
    const config = options[1]
    const all = options[2]

    if (input.id === "allPanels") {
        menu.checked = !input.checked
        config.checked = !input.checked
    } 
    
    if (input.id === "menuPanel" || input.id === "configPanel") {
        all.checked = !(menu.checked || config.checked)
    }

    icons.allPanels = all.checked
    icons.menuPanel = menu.checked
    icons.configPanel = config.checked
}




export const control = async (detail, panelsIcons) => {
    console.log(detail)
    controlIcons(detail.input, panelsIcons)
}
