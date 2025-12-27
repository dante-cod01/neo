const topBarEvents = async () => {

    const viewChangerListener = (controls) => {
        document.addEventListener("viewChanger", (e) => {
            controls.viewControl(e.detail)
        })
    }

    document.addEventListener("viewChanger", async (e) => {
        if (e.detail === "ready") {
            const boxControl = await import("./interface/controls/boxControls.js")
            viewChangerListener(boxControl)
        }
    })

    document.addEventListener("backChanger", (e) => {
        const inputIndex = Number(e.detail.input)
    })
}

const panelEvents = () => {
    const openPanels = { left: true, right: true }

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