const topBarEvents = (modules, openPanels) => {

    document.addEventListener("panelsChanger", (e) => {
        e.detail.input && modules.panelsChanger.control("delegate", openPanels, e.detail)
    })

    document.addEventListener("backChanger", (e) => {
        e.detail.input && modules.backChanger.control(e.detail.input)
    })

    document.addEventListener("viewChanger", (e) => {
        e.detail.input && modules.viewChanger.control(e.detail.input.id)
    })
}

const panelEvents = (modules, openPanels) => {
    const action = (e) => {
        e.detail.panel && modules.panelsChanger.control("direct", openPanels, e.detail)
    }

    document.addEventListener("menuPanel", (e) => { action(e) })
    document.addEventListener("configPanel", (e) => { action(e) })
}

const listEvents = (modules, lastComponent) => {
    document.addEventListener("listMenu", (e) => {
        e.detail.conf && modules.infoControl.control(e.detail.conf, lastComponent)
    }) 
}

const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.component] = await import(item.module) }))
    return modules
}

export const init = async () => {
    let components = [
        { component: "infoControl", loaded: false, module: "./interface/controls/infoControl.js" },
        { component: "panelsChanger", loaded: false, module: "./interface/controls/panelsControl.js" },
        { component: "backChanger", loaded: false, module: "./interface/controls/backControl.js" },
        { component: "viewChanger", loaded: false, module: "./interface/controls/viewsControl.js" },
    ]

    const openPanels = { menuPanel: true, configPanel: true }
    const modules = await registerModules(components)
    const lastComponent = {}

    listEvents(modules, lastComponent)
    topBarEvents(modules, openPanels)
    panelEvents(modules, openPanels)
}
