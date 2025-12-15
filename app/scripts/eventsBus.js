const topBarEvents = () => {
    document.addEventListener("backChanger", (e) => {
        const inputIndex = e.detail.input

        console.log(inputIndex)
    })

    document.addEventListener("viewChanger", (e) => {
        console.log(e.detail.input)
    })
}

const panelEvents = () => {
    const openPanels = {left: true, right: true}

    document.addEventListener("panel", (e) => {
        const topBar = document.getElementById("topBar")
        const panel = e.detail.panel
        const type = e.detail.type
        const value = e.detail.value

        if (type === "open_W") {
            openPanels[panel] = value
            if (openPanels.left === true && openPanels.right === true) topBar.expand()
            if (openPanels.left === true && openPanels.right === false) topBar.expand("right")
            if (openPanels.left === false && openPanels.right === true) topBar.expand("left")
            if (openPanels.left === false && openPanels.right === false) topBar.expand("both")
        }
    })
}

export const loadListeners = async () => {
    panelEvents()
    topBarEvents()
}