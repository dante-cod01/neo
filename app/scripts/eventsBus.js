const panelEvents = () => {
    const topBar = document.getElementById("topBar")
    const panels = { left: true, right: true }

    document.addEventListener("panel", (e) => {
        const panel = e.detail.panel
        const type = e.detail.type
        const value = e.detail.value

        if (type === "open_W") {
            panel === "left" ? panels.left = value : panels.right = value
            if (panels.left === true && panels.right === true) topBar.expand()
            if (panels.left === true && panels.right === false) topBar.expand("right")
            if (panels.left === false && panels.right === true) topBar.expand("left")
            if (panels.left === false && panels.right === false) topBar.expand("both")
        }
    })
}

export const loadListeners = async () => {
    /* panels */
    document.addEventListener("topBar", (e) => {
        if (e.detail === "preLoaded") { panelEvents() }
    }, { once: true })
}