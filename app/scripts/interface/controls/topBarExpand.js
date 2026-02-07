import * as utils from "../../modules/utils.js"

const barsExpand = async (openPanels) => {
    const topBar = document.getElementById("topBar")
    const nameBar = document.getElementById("nameBar")

    if (openPanels.menuPanel === true && openPanels.configPanel === true) {
        topBar.expand()
        nameBar.classList.remove("nameBar_left")
    }
    if (openPanels.menuPanel === true && openPanels.configPanel === false) {
        topBar.expand("right")
    }
    if (openPanels.menuPanel === false && openPanels.configPanel === true) {
        topBar.expand("left")
        nameBar.classList.add("nameBar_left")
    }
    if (openPanels.menuPanel === false && openPanels.configPanel === false) {
        topBar.expand("both")
        nameBar.classList.add("nameBar_left")
    }
}

export const control = async (openPanels, detail) => {
    const topBar = document.getElementById("topBar")
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs
    const time = utils.getTimeById("menuPanel")

    openPanels[detail.panel] = detail.value
    option.forEach(item => { item.disabled = true })
    detail.type === "opened_W" && barsExpand(openPanels)
    await utils.time(time * 2)
    option.forEach(item => { item.disabled = false })
}
