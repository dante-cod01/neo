const topBarEvents = async (modules, openPanels) => {

    document.addEventListener("panelsChanger", async (e) => {
        e.detail.input && modules.panelsChanger.control(true, e.detail.input.id)
    })

    document.addEventListener("backChanger", async (e) => {
        e.detail.input && modules.backChanger.control(e.detail.input)
    })

    document.addEventListener("viewChanger", async (e) => {
        e.detail.input && modules.viewChanger.control(e.detail.input.id)
    })
}

/* const panelEvents = async (modules, openPanels) => {
    const action = async (e) => {
        e.detail.panel && modules.panels.control(openPanels, e.detail, "panel")
    }

    document.addEventListener("menuPanel", async (e) => { action(e) })
    document.addEventListener("configPanel", async (e) => { action(e) })
}
 */

const registerModules = async (modules, components) => {
    await Promise.all(components.map(async (item) => { modules[item.component] = await import(item.module) }))
}

const loadListeners = async (modules, components) => {
    await registerModules(modules, components)
    topBarEvents(modules, components)
}

export const init = () => {
    let components = [
        { component: "panelsChanger", loaded: false, module: "./interface/controls/panelsControl.js" },
        { component: "backChanger", loaded: false, module: "./interface/controls/backControl.js" },
        { component: "viewChanger", loaded: false, module: "./interface/controls/viewsControl.js" },
    ]
    const modules = {}
    const openPanels = { menuPanel: true, configPanel: true }

    loadListeners(modules, components)
    console.log(modules)
}