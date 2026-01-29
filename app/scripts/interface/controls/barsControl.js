import * as utils from "../../modules/utils.js"

const infoBoxMove = async (boolean) => {
    const infoBox = document.getElementById("infoBox")

    boolean
        ? infoBox.classList.remove("infoBox_leftMax")
        : infoBox.classList.add("infoBox_leftMax")
}

const topBarExpand = async (openPanels) => {
    const topBar = document.getElementById("topBar")

    if (openPanels.menuPanel === true && openPanels.configPanel === true) { topBar.expand() }
    if (openPanels.menuPanel === true && openPanels.configPanel === false) { topBar.expand("right", true, "16vw") }
    if (openPanels.menuPanel === false && openPanels.configPanel === true) { topBar.expand("left", true, "16vw") }
    if (openPanels.menuPanel === false && openPanels.configPanel === false) { topBar.expand("both") }
}

const inputsControl = (openPanels) => {
    const topBar = document.getElementById("topBar")
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs

    option[0].checked = !openPanels.menuPanel
    option[1].checked = !openPanels.configPanel
}




/* const drawInfo = async (info, infoBox) => {
    const component = document.getElementById("infoBox")
    const time = cssHelper.convertTransition(getComputedStyle(component).getPropertyValue("transition"))
    const section = info.section.slice(0, 5).toUpperCase()
    const name = info.config.name


}
 */
/* const infoControl = async (info, lastComponent) => {
    const infoBox = document.getElementById("infoBox")
    if (!lastComponent.tag) {
        console.log("component null")
        lastComponent.section = info.section
        lastComponent.tag = info.config.tag
        await expandInfoBox(true, infoBox)
        drawInfo(info, infoBox)
    } else {
        console.log("component valid")
        await expandInfoBox(false, infoBox)
        await drawInfo(info, infoBox)
        await expandInfoBox(true, infoBox)
    }
}
 */
export const control = async (openPanels, detail) => {
    const topBar = document.getElementById("topBar")
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs

    const timeMenu = utils.getTimeById("menuPanel")
    const timeConfig = utils.getTimeById("configPanel")

    if (detail.panel) {
        const panel = detail.panel
        openPanels[panel] = detail.value

        if (panel === "menuPanel") {
            detail.type === "opened_W" && topBarExpand(openPanels)
            detail.type === "opened_H" && infoBoxMove(detail.value)
            await utils.time(timeMenu * 2)
        }

        if (panel === "configPanel") {
            detail.type === "opened_W" && topBarExpand(openPanels)
            await utils.time(timeConfig * 2)
        }
        
        inputsControl(openPanels)
    }

    if (detail.input) {
        option.forEach(item => { item.disabled = true })
        const panel = detail.input.id
        openPanels[panel] = !detail.input.checked

        if (panel === "menuPanel") {
            await utils.time(timeConfig)
            infoBoxMove(!detail.input.checked)
            topBarExpand(openPanels)
            await utils.time(timeConfig)
        }

        if (panel === "configPanel") {
            await utils.time(timeConfig)
            topBarExpand(openPanels)
            await utils.time(timeConfig)
        }

        option.forEach(item => { item.disabled = false })
    }
}
