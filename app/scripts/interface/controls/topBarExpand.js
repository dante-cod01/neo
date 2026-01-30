import * as utils from "../../modules/utils.js"

const infoBoxMove = async (boolean) => {
    const infoBox = document.getElementById("infoBox")
    boolean ? infoBox.classList.remove("infoBox_leftMax") : infoBox.classList.add("infoBox_leftMax")
}

const topBarExpand = async (openPanels) => {
    const topBar = document.getElementById("topBar")

    if (openPanels.menuPanel === true && openPanels.configPanel === true) { topBar.expand() }
    if (openPanels.menuPanel === true && openPanels.configPanel === false) { topBar.expand("right") }
    if (openPanels.menuPanel === false && openPanels.configPanel === true) { topBar.expand("left") }
    if (openPanels.menuPanel === false && openPanels.configPanel === false) { topBar.expand("both") }
}

export const control = async (openPanels, detail) => {
    const topBar = document.getElementById("topBar")
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs
    const time = utils.getTimeById("menuPanel")

    openPanels[detail.panel] = detail.value
    option.forEach(item => { item.disabled = true })
    detail.type === "opened_W" && topBarExpand(openPanels)
    detail.panel === "menuPanel" && detail.type === "opened_H" && infoBoxMove(detail.value)
    await utils.time(time * 2)
    option.forEach(item => { item.disabled = false })
}
