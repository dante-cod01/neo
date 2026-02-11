import * as utils_helper from "../../modules/utils.js"
import * as dom_helper from "../../modules/dom.js"

const barsExpand = async (openPanels) => {
    const topBar = dom_helper.id("topBar")
    const bottomBar = dom_helper.id("bottomBar")

    if (openPanels.menuPanel === true && openPanels.configPanel === true) {
        topBar.expand()
        bottomBar.expand()
    }
    if (openPanels.menuPanel === true && openPanels.configPanel === false) {
        topBar.expand("right")
        bottomBar.expand("right")
    }
    if (openPanels.menuPanel === false && openPanels.configPanel === true) {
        topBar.expand("left")
        bottomBar.expand("left")
    }
    if (openPanels.menuPanel === false && openPanels.configPanel === false) {
        topBar.expand("both")
        bottomBar.expand("both")
    }
}

const moveTitlesBox = async () => {
    
}

export const control = async (openPanels, detail) => {
    const topBar = dom_helper.id("topBar")
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs
    const time = utils_helper.getTimeById("menuPanel")

    openPanels[detail.panel] = detail.value
    option.forEach(item => { item.disabled = true })
    detail.type === "opened_W" && barsExpand(openPanels)
    await utils_helper.time(time * 2)
    option.forEach(item => { item.disabled = false })
}
