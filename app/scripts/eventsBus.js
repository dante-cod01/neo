const topBarEvents = (modules, openPanels) => {

    document.addEventListener("panelsChanger", (e) => {
/*         modules.panelsChanger.control(openPanels, e.detail)
 */        modules.barsExpand.control(openPanels, e.detail, )
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
    })

    document.addEventListener("configPanel", (e) => {
        modules.barsExpand.control(openPanels, e.detail)
    })
}

const listEvents = (modules, lastComponent) => {
    document.addEventListener("listMenu", (e) => {
        modules.infoControl.control(e.detail.conf, lastComponent)
    })
}

const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.module] = await import(item.path) }))
    return modules
}

export const init = async () => {
    let components = [
        { module: "infoControl", path: "./interface/controls/infoControl.js" },
/*         { module: "panelsChanger", path: "./interface/controls/panelsControl.js" },
 */        { module: "backChanger", path: "./interface/controls/backControl.js" },
        { module: "viewChanger", path: "./interface/controls/viewsControl.js" },
        { module: "barsExpand", path: "./interface/controls/barsControl.js" }
    ]

    const openPanels = { menuPanel: true, configPanel: true, both: true }
    const modules = await registerModules(components)
    const lastComponent = {}

    listEvents(modules, lastComponent)
    topBarEvents(modules, openPanels)
    panelEvents(modules, openPanels)
}
