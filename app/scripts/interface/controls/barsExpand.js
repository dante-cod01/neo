import * as utils_helper from "../../modules/utils.js"
import * as dom_helper from "../../modules/dom.js"

const topBarExpand = async (openPanels) => {
    const topBar = dom_helper.id("topBar")
    openPanels.menuPanel.hor === true && openPanels.configPanel.hor === true && topBar.expand()
    openPanels.menuPanel.hor === true && openPanels.configPanel.hor === false && topBar.expand("right")
    openPanels.menuPanel.hor === false && openPanels.configPanel.hor === true && topBar.expand("left")
    openPanels.menuPanel.hor === false && openPanels.configPanel.hor === false && topBar.expand("both")
}

const bottomBarExpand = async (openPanels) => {
    const bottomBar = dom_helper.id("bottomBar")
    openPanels.menuPanel.ver === true && openPanels.configPanel.ver === true && bottomBar.expand() & moveTitlesBox(true)
    openPanels.menuPanel.ver === true && openPanels.configPanel.ver === false && bottomBar.expand("right")
    openPanels.menuPanel.ver === false && openPanels.configPanel.ver === true && bottomBar.expand("left") & moveTitlesBox(false)
    openPanels.menuPanel.ver === false && openPanels.configPanel.ver === false && bottomBar.expand("both")
}

const moveTitlesBox = async (boolean) => {
    const titlesBox = dom_helper.id("titlesBox")
    boolean
        ? titlesBox.classList.replace("titlesBox_left", "titlesBox")
        : titlesBox.classList.replace("titlesBox", "titlesBox_left")
}

export const control = async (openPanels, detail) => {
    const topBar = dom_helper.id("topBar")
    const panel = detail.panel ? detail.panel : null
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs
    const time = utils_helper.getTimeById("menuPanel")

    option.forEach(item => { item.disabled = true })

    if (detail.type === "ver") {
        openPanels[detail.panel].ver = detail.value
        bottomBarExpand(openPanels)
    }
    if (detail.type === "hor") {
        openPanels[detail.panel].hor = detail.value
        panel && topBarExpand(openPanels)

    }
    await utils_helper.time(time * 2)
    option.forEach(item => { item.disabled = false })
}
