import * as dom_helper from "./modules/dom.js"

const barsEvents = (modules) => {
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
            modules.titlesMove.control(e.detail)
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

const listEvents = (modules, actualComponent, lastComponent) => {
    document.addEventListener("listMenu", async (e) => {
        actualComponent.conf = e.detail.conf
        modules.titlesChanger.control(actualComponent, lastComponent)
        lastComponent.conf = e.detail.conf

    })
}

const titlesEvents = (modules, actualComponent, lastComponent) => {
    document.addEventListener("titleSection", async (e) => {
        modules.componentChanger.control(e.detail, actualComponent, lastComponent)
        await modules.drawPresets.control(e.detail, actualComponent, lastComponent)
    })
    document.addEventListener("titleName", async (e) => {
        modules.componentChanger.control(e.detail, actualComponent, lastComponent)
    })
}

/* const componentEvents = (modules, actualComponent, lastComponent) => {
    document.addEventListener("componentInBox", (e) => {
        console.log("component", e.detail)
    }) 
}
 */
const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.module] = await import(item.path) }))
    return modules
}

const actualComponent = {}
const lastComponent = {}

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
        { module: "titlesMove", path: "./interface/controls/titlesMove.js" },
        /* components */
        { module: "componentChanger", path: "./interface/controls/componentChanger.js" },
        { module: "drawPresets", path: "./interface/controls/drawPresets.js" }
    ]

    const panels = {
        menuPanel: dom_helper.search("#menuPanel"),
        configPanel: dom_helper.search("#configPanel")
    }

    const modules = await registerModules(components)

    listEvents(modules, actualComponent, lastComponent)

    titlesEvents(modules, actualComponent, lastComponent)
    barsEvents(modules)
    panelEvents(modules, panels)
/*     componentEvents(modules, actualComponent, lastComponent)
 */}
