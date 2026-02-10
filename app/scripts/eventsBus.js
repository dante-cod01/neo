const topBarEvents = (modules, openPanels) => {

    document.addEventListener("panelsChanger", async (e) => {
        modules.panelsChanger.control(openPanels, e.detail)
        modules.panelsIcons.control(openPanels, e.detail)
    })

    document.addEventListener("backChanger", (e) => {
        modules.backChanger.control(e.detail.input)
    })

    document.addEventListener("viewChanger", (e) => {
        modules.viewChanger.control(e.detail.input.id)
    })
}

const panelEvents = (modules, openPanels) => {
    document.addEventListener("menuPanel", (e) => {
        modules.barsExpand.control(openPanels, e.detail)
        modules.panelsIcons.control(openPanels, e.detail)
    })

    document.addEventListener("configPanel", (e) => {
        modules.barsExpand.control(openPanels, e.detail)
        modules.panelsIcons.control(openPanels, e.detail)
    })
}

const listEvents = (modules, lastComponent) => {
    document.addEventListener("listMenu", (e) => {
        modules.titlesChanger.control(e.detail, lastComponent)
    })
}

const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.module] = await import(item.path) }))
    return modules
}

export const init = async () => {
    let components = [
        { module: "panelsChanger", path: "./interface/controls/topPanelsControl.js" },
        { module: "barsExpand", path: "./interface/controls/barsExpand.js" },
        { module: "backChanger", path: "./interface/controls/topBackControl.js" },
        { module: "viewChanger", path: "./interface/controls/topViewsControl.js" },
        { module: "panelsIcons", path: "./interface/controls/topPanelsIcons.js" },
        { module: "titlesChanger", path: "./interface/controls/titlesChanger.js" },

    ]

    const openPanels = { menuPanel: true, configPanel: true, bothPanels: true }
    const modules = await registerModules(components)
    const lastComponent = {}

    listEvents(modules, lastComponent)
    topBarEvents(modules, openPanels)
    panelEvents(modules, openPanels)
}
