const topBarEvents = () => {
    document.addEventListener("backChanger", (e) => {
        const inputIndex = e.detail.input

        console.log(inputIndex)
    })
}

const panelEvents = () => {
    document.addEventListener("panel", (e) => {
        const topBar = document.getElementById("topBar")
        const panels = { left: true, right: true }
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
    panelEvents()
    topBarEvents()
}