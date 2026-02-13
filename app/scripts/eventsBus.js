const barsEvents = (modules, barsAnimation, panelsAnimation) => {
    document.addEventListener("bottomBar", async (e) => {
        modules.panelsIconsBlock.control(e.detail, barsAnimation, panelsAnimation)
    })
    document.addEventListener("topBar", async (e) => {
        modules.panelsIconsBlock.control(e.detail, barsAnimation, panelsAnimation)
    })
}

const topBarEvents = (modules, panelsIcons) => {
    document.addEventListener("expandIcons", async (e) => {
        modules.panelsControl.control(e.detail)
        modules.panelIconsControl.control(e.detail, panelsIcons)
    })

    document.addEventListener("backChanger", (e) => {
        modules.backChanger.control(e.detail.input)
    })

    document.addEventListener("viewChanger", (e) => {
        modules.viewChanger.control(e.detail.input.id)
    })
}

const panelEvents = (modules, panels, panelsIcons, barsAnimation, panelsAnimation) => {
    document.addEventListener("menuPanel", async (e) => {
        modules.panelsIconsBlock.control(e.detail, barsAnimation, panelsAnimation)
        panels[e.detail.panel][e.detail.type] = e.detail.value
        modules.barsControl.control(e.detail, panels)
        modules.panelIconsControl.control(e.detail, panelsIcons)
        /*         
                modules.titlesChanger.control(openPanels)
         */
    })

    document.addEventListener("configPanel", (e) => {
        panels[e.detail.panel][e.detail.type] = e.detail.value
        modules.panelsIconsBlock.control(e.detail, barsAnimation, panelsAnimation)
        modules.barsControl.control(e.detail, panels)
        modules.panelIconsControl.control(e.detail, panelsIcons)
    })
}

const listEvents = (modules, lastComponent) => {
    document.addEventListener("listMenu", (e) => {
/*         modules.titlesChanger.control(e.detail, lastComponent)
 */    })
}

const registerModules = async (components) => {
    const modules = {}
    await Promise.all(components.map(async (item) => { modules[item.module] = await import(item.path) }))
    return modules
}

export const init = async () => {
    let components = [
        { module: "barsControl", path: "./interface/controls/barsControl.js" },

        { module: "panelsControl", path: "./interface/controls/topPanelsToogle.js" },
        { module: "panelIconsControl", path: "./interface/controls/topPanelsIconsControl.js" },
        { module: "panelsIconsBlock", path: "./interface/controls/topPanelsIconsBlock.js" },

        { module: "backChanger", path: "./interface/controls/topBackgrounds.js" },
        { module: "viewChanger", path: "./interface/controls/topViews.js" },
        /*         { module: "titlesChanger", path: "./interface/controls/titlesChanger.js" },
         */
    ]

    const panels = { menuPanel: { hor: true, ver: true }, configPanel: { hor: true, ver: true }, allPanels: { hor: true, ver: true } }
    const panelsIcons = { menuPanel: false, configPanel: false, allPanels: true }
    const barsAnimation = { topBar: null, bottomBar: null }
    const panelsAnimation = { menuPanel: null, configPanel: null }
    const modules = await registerModules(components)
    const lastComponent = {}

    barsEvents(modules, barsAnimation, panelsAnimation)
/*     listEvents(modules, lastComponent)
 */    topBarEvents(modules, panelsIcons)
    panelEvents(modules, panels, panelsIcons, barsAnimation, panelsAnimation)
}
