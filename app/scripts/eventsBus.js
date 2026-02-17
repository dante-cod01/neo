import * as dom_helper from "./modules/dom.js"

const barsEvents = (modules, lastComponent) => {
    document.addEventListener("expandIcons", async (e) => {
        modules.panelsDelegate.control(e.detail)
    })

    document.addEventListener("backChanger", (e) => {
        modules.backChanger.control(e.detail.input)
    })

    document.addEventListener("viewChanger", (e) => {
        modules.viewChanger.control(e.detail.input.id)
    })
}

const panelEvents = (modules, panels) => {
    document.addEventListener("menuPanel", async (e) => {
        if (["hor", "ver"].some(key => key in e.detail)) {
            modules.barsControl.control(e.detail, panels)
            modules.titlesChanger.control(e.detail, panels)
        }
        if ("animation" in e.detail) {
            modules.panelsIconsBlock.control(e.detail)
            modules.panelsIconsControl.control(e.detail, panels)
        }
    })

    document.addEventListener("configPanel", async (e) => {
        if (["hor", "ver"].some(key => key in e.detail)) {
            modules.barsControl.control(e.detail, panels)
        }
        if ("animation" in e.detail) {
            modules.panelsIconsBlock.control(e.detail)
            modules.panelsIconsControl.control(e.detail, panels)
        }
    })
}

const listEvents = (modules, lastComponent) => {
    document.addEventListener("listMenu", (e) => {
        modules.titlesChanger.control(e.detail, lastComponent)
        modules.componentChanger.control(e.detail, lastComponent)
    })
}

const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.module] = await import(item.path) }))
    return modules
}

export const init = async () => {
    let components = [
        /* controls panels */
        { module: "barsControl", path: "./interface/controls/barsControl.js" },
        /* controls top bar */
        { module: "panelsDelegate", path: "./interface/controls/panelsDelegate.js" },
        { module: "panelsIconsControl", path: "./interface/controls/topPanelsIconsControl.js" },
        { module: "panelsIconsBlock", path: "./interface/controls/topPanelsIconsBlock.js" },
        { module: "backChanger", path: "./interface/controls/topBackgrounds.js" },
        { module: "viewChanger", path: "./interface/controls/topViews.js" },
        /* controls titles */
        { module: "titlesChanger", path: "./interface/controls/titlesChanger.js" },
        /* components */
        { module: "componentChanger", path: "./interface/controls/componentChanger.js" }
    ]

    const panels = {
        menuPanel: dom_helper.id("menuPanel"),
        configPanel: dom_helper.id("configPanel")
    }

    const modules = await registerModules(components)
    const lastComponent = {}

    listEvents(modules, lastComponent)
    barsEvents(modules, lastComponent)
    panelEvents(modules, panels)
}
