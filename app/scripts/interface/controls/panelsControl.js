const panelControl = async (openPanels, topBar) => {
    inputsControl(openPanels, topBar)
    if (openPanels.menuPanel === true && openPanels.configPanel === true) { await topBar.expand() }
    if (openPanels.menuPanel === true && openPanels.configPanel === false) { await topBar.expand("right") }
    if (openPanels.menuPanel === false && openPanels.configPanel === true) { await topBar.expand("left") }
    if (openPanels.menuPanel === false && openPanels.configPanel === false) { await topBar.expand("both") }
}

const inputsControl = (openPanels, topBar) => {
    const options = topBar.shadowRoot.getElementById("panelsChanger").inputs
    options[0].checked = !openPanels.menuPanel
    options[1].checked = !openPanels.configPanel
    options[2].checked = (!openPanels.menuPanel || !openPanels.configPanel) ? false : true
}

const delegateControl = async (openPanels, panelId, checked) => {
    const menuPanel = document.getElementById("menuPanel")
    const menucloseInput = menuPanel.getInputButtom()
    const configPanel = document.getElementById("configPanel")
    const configcloseInput = configPanel.getInputButtom()

    if (panelId === "menuPanel") {
        menucloseInput.checked = !checked
        menuPanel.tooglePanel(!checked)
    }

    if (panelId === "configPanel") {
        configcloseInput.checked = !checked
        configPanel.tooglePanel(!checked)
    }

    if (panelId === "bothPanels") {
        menucloseInput.checked = checked
        menuPanel.tooglePanel(checked)
        configcloseInput.checked = checked
        configPanel.tooglePanel(checked)
    }
}

export const control = async (controlType, openPanels, detail) => {
    const topBar = document.getElementById("topBar")

    if (controlType === "direct" && detail.type === "opened_W") {
        openPanels[detail.panel] = detail.value
        await panelControl(openPanels, topBar)
    }

    if (controlType === "delegate") {
        const id = detail.input.id
        const checked = detail.input.checked
        await delegateControl(openPanels, id, checked)
    }
}   