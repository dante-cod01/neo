export const control = (openPanels, panel, eventType, value) => {
    const topBar = document.getElementById("topBar") || null

    if (eventType === "open_W" && topBar) {
        openPanels[panel] = value
        if (openPanels.menuPanel === true && openPanels.configPanel === true) topBar.expand()
        if (openPanels.menuPanel === true && openPanels.configPanel === false) topBar.expand("right")
        if (openPanels.menuPanel === false && openPanels.configPanel === true) topBar.expand("left")
        if (openPanels.menuPanel === false && openPanels.configPanel === false) topBar.expand("both")
    }
}