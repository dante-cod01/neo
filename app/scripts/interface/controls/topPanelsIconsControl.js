import * as dom_helper from "../../modules/dom.js"

const iconsControl = (input, icons) => {
    /*     console.log(input)
     */
    const options = Array.from(dom_helper.id("expandIcons", dom_helper.id("topBar").shadowRoot).shadowRoot.querySelectorAll("input"))
    const menu = options[0]
    const config = options[1]
    const all = options[2]
    icons.menuPanel = menu.checked
    icons.configPanel = config.checked
    icons.allPanels = icons.allChecked

    /*     if (input.id === "allPanels_input") {
            menu.checked = !input.checked
            config.checked = !input.checked
        }
    
        if (input.id === "menuPanel_input" || input.id === "configPanel_input") {
            all.checked = !(menu.checked || config.checked)
        }
     */
    console.log(icons)

    /*     
     */
    console.log(icons, "---------")

/*     console.log(icons)
    Object.entries(icons).forEach(([key, value]) => {
        let input = dom_helper.id(key, dom_helper.id("expandIcons", dom_helper.id("topBar").nodes.node_0).shadowRoot)
        input.checked = value
    })
 */}

const delegateIconsControl = (detail, icons) => {
    console.log(detail)
    if (detail.animation === "end") {
        let input = dom_helper.id(detail.panel + "_input", dom_helper.id("expandIcons", dom_helper.id("topBar").nodes.node_0).shadowRoot)
        /*         console.log(detail.panel)
         */
        input.checked = !input.checked
        icons[detail.panel] = input.checked
        iconsControl(input, icons)
    }
}


export const control = async (detail, panelsIcons) => {
/*     console.log(detail)
 */    detail.input && iconsControl(detail.input, panelsIcons)
    detail.animation && delegateIconsControl(detail, panelsIcons)
}
