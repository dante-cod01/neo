const register = async (eventName, url, logic, components) => {
    if (!logic[eventName]) {
        logic[eventName] = "true - waiting import"
        logic[eventName] = await import(url)
        components[eventName] = true
    } else {
        return
    }
}

const topBarEvents = async (logic, components) => {

    document.addEventListener("viewChanger", async (e) => {
        e.detail === "ready" && register("viewChanger", "./interface/controls/viewsControl.js", logic, components)
        if (e.detail !== "ready") logic.view.control(e.detail)
    })

    document.addEventListener("backChanger", async (e) => {
        e.detail === "ready" && register("backChanger", "./interface/controls/backControl.js", logic, components)
        if (e.detail !== "ready") logic.back.control(e.detail)
    })
}

const panelEvents = async (logic, components) => {
    const openPanels = { menuPanel: true, configPanel: true }

    const action = async (e) => {
        if (e.detail === "ready") register("panel", "./interface/controls/panelsControl.js", logic, components)
        if (e.detail !== "ready") logic.panel.control(openPanels, e.detail.panel, e.detail.type, e.detail.value)
    }

    document.addEventListener("menuPanel", async (e) => { action(e) })
    document.addEventListener("configPanel", async (e) => { action(e) })
}

export const loadListeners = () => {
    const logic = {}
    const components = {}

    topBarEvents(logic, components)
    panelEvents(logic, components)

}