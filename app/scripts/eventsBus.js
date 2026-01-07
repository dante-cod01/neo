const topBarEvents = async (modules, openPanels) => {

    document.addEventListener("panelsChanger", async (e) => {
        e.detail.input && modules.panelsChanger.control("delegate", openPanels, e.detail)
    })

    document.addEventListener("backChanger", async (e) => {
        e.detail.input && modules.backChanger.control(e.detail.input)
    })

    document.addEventListener("viewChanger", async (e) => {
        e.detail.input && modules.viewChanger.control(e.detail.input.id)
    })
}

const panelEvents = async (modules, openPanels) => {
    const action = async (e) => {
        e.detail.panel && modules.panelsChanger.control("direct", openPanels, e.detail)
    }

    document.addEventListener("menuPanel", async (e) => { action(e) })
    document.addEventListener("configPanel", async (e) => { action(e) })
}

const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.component] = await import(item.module) }))
    return modules
}

export const init = async () => {
    let components = [
        { component: "panelsChanger", loaded: false, module: "./interface/controls/panelsControl.js" },
        { component: "backChanger", loaded: false, module: "./interface/controls/backControl.js" },
        { component: "viewChanger", loaded: false, module: "./interface/controls/viewsControl.js" },
    ]

    const openPanels = { menuPanel: true, configPanel: true }
    const modules = await registerModules(components)

    topBarEvents(modules, openPanels)
    panelEvents(modules, openPanels)
}
