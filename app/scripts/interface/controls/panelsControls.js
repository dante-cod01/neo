export const control = (openPanels, panel, eventType, value) => {
    const topBar = document.getElementById("topBar")

    if (eventType === "open_W") {
        openPanels[panel] = value
        if (openPanels.left === true && openPanels.right === true) topBar.expand()
        if (openPanels.left === true && openPanels.right === false) topBar.expand("right")
        if (openPanels.left === false && openPanels.right === true) topBar.expand("left")
        if (openPanels.left === false && openPanels.right === false) topBar.expand("both")
    }
}