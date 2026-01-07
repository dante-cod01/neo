const panelControl = async (openPanels, detail) => {
    const topBar = document.getElementById("topBar") || null
    if (!topBar) return
    const options = topBar ? Array.from(topBar.shadowRoot.getElementById("reactivePanelsControl").inputs) : null

    if (detail.type === "opened_W") {

        options[0].checked = !openPanels.menuPanel
        options[1].checked = !openPanels.configPanel
        options[2].checked = (!openPanels.menuPanel || !openPanels.configPanel) ? false : true

        if (openPanels.menuPanel === true && openPanels.configPanel === true) { await topBar.expand() }
        if (openPanels.menuPanel === true && openPanels.configPanel === false) { await topBar.expand("right") }
        if (openPanels.menuPanel === false && openPanels.configPanel === true) { await topBar.expand("left") }
        if (openPanels.menuPanel === false && openPanels.configPanel === false) { await topBar.expand("both") }

    }
}

const delegateControl = async (openPanels, panelId) => {
    console.log(panelId)
    const inputMenu = options.find(item => item.id === "menuPanel")
    const menuPanel = document.getElementById("menuPanel") || null
    const menuToogle = menuPanel.getToogle()

    const inputConfig = options.find(item => item.id === "configPanel")
    const configPanel = document.getElementById("configPanel") || null

    console.log(openPanels, inputMenu.checked)
    if (inputMenu.checked === true && openPanels.menuPanel === true) {
        inputMenu.disabled = false
        menuToogle.checked = false
        menuToogle.dispatchEvent(new Event("change"))
        openPanels.menuPanel = false
        inputMenu.disabled = false
    }

    if (inputMenu.checked === false && openPanels.menuPanel === false) {
        inputMenu.disabled = true
        menuToogle.checked = true
        menuToogle.dispatchEvent(new Event("change"))
        openPanels.menuPanel = true
        inputMenu.disabled = false
    }
}

export const control = async () => {

}