const inputsControl = (openPanels) => {
    const topBar = document.getElementById("topBar")
    const option = topBar.shadowRoot.getElementById("panelsChanger").inputs

    option[0].checked = !openPanels.menuPanel
    option[1].checked = !openPanels.configPanel
    option[2].checked = openPanels.menuPanel && openPanels.configPanel ? true : false
}

export const control = (openPanels, detail) => {
    if (detail.panel && detail.type === "opened_H") inputsControl(openPanels)
}