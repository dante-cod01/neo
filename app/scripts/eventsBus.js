/* let panels = await import("./interface/controls/panelsControls.js")
 */

const topBarEvents = async (logic) => {

    document.addEventListener("viewChanger", async (e) => {
        if (e.detail === "ready") logic["view"] = await import("./interface/controls/viewsControl.js") 
        if (e.detail !== "ready") logic.view.control(e.detail)
    })

    document.addEventListener("backChanger", async (e) => {
        if (e.detail === "ready") logic["back"] = await import("./interface/controls/backControls.js")
        if (e.detail !== "ready") logic.back.control(e.detail)
    })
}

const panelEvents = async () => {
    const openPanels = { left: true, right: true }

    document.addEventListener("panel", (e) => {
        const panel = e.detail.panel
        const eventType = e.detail.type
        const value = e.detail.value

        panels.control(openPanels, panel, eventType, value)
/*         if (type === "open_W") {
            openPanels[panel] = value
            if (openPanels.left === true && openPanels.right === true) topBar.expand()
            if (openPanels.left === true && openPanels.right === false) topBar.expand("right")
            if (openPanels.left === false && openPanels.right === true) topBar.expand("left")
            if (openPanels.left === false && openPanels.right === false) topBar.expand("both")
        }
 */    })
}

export const loadListeners = async () => {
    const logic = {}

/*     await panelEvents(logic, ready)
 */    await topBarEvents(logic)
}