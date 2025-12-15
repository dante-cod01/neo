import { viewControl } from "./interface/controls/boxControls.js"

const topBarEvents = () => {
    document.addEventListener("backChanger", (e) => {
        const inputIndex = Number(e.detail.input)

        console.log(inputIndex)
    })

    document.addEventListener("viewChanger", (e) => {
        const value = Number(e.detail.input)
        viewControl(value)
    })
}

const panelEvents = () => {
    const openPanels = {left: true, right: true}

    document.addEventListener("panel", (e) => {
        const topBar = document.getElementById("topBar")
        const panel = e.detail.panel
        const type = e.detail.type
        const value = Number(e.detail.value)

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