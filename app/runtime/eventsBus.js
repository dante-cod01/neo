import * as dom_helper from "../scripts/modules/dom.js"
import * as utils_helper from "../scripts/modules/utils.js"

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

const listEvents = (modules, actualComponent) => {
    document.addEventListener("listMenu", async (e) => {
        actualComponent.conf !== undefined && await componentSequenceOut(modules)
        actualComponent.conf = e.detail.conf
        await componentSequenceIn(modules, actualComponent)
    })
}

/* sequences */
const componentSequenceIn = async (modules, actualComponent) => {
    await Promise.all([
        await modules.componentChanger.control(true, actualComponent),
        modules.titlesChanger.control(true, actualComponent),
/*         modules.componentPresets.control(true, actualComponent)
 */    ])
}

const componentSequenceOut = async (modules) => {
    const titlesBox = dom_helper.search("#titlesBox")
    const nameBox = dom_helper.search("#titleName", titlesBox.nodes.node_1)
    const time = utils_helper.getTime(nameBox.conf.textBox_transition)

    await Promise.all([
        modules.titlesChanger.control(false),
        await utils_helper.pause(time * 3),
        modules.componentChanger.control(false),
/*         modules.componentPresets.control(false)
 */    ])
}

/* modules */
const registerModules = async () => {
    let controls = [
        /* controls panels */
        { module: "barsControl", path: "/app/scripts/interface/controls/barsControl.js" },
        /* controls top bar */
        { module: "panelsDelegate", path: "/app/scripts/interface/controls/panelsDelegate.js" },
        { module: "panelsIconsControl", path: "/app/scripts/interface/controls/topPanelsIconsControl.js" },
        { module: "panelsIconsBlock", path: "/app/scripts/interface/controls/topPanelsIconsBlock.js" },
        { module: "backChanger", path: "/app/scripts/interface/controls/topBackgrounds.js" },
        { module: "viewChanger", path: "/app/scripts/interface/controls/topViews.js" },
        /* controls titles */
        { module: "titlesChanger", path: "/app/scripts/interface/controls/titlesChanger.js" },
        { module: "titlesMove", path: "/app/scripts/interface/controls/titlesMove.js" },
        /* components */
        { module: "componentChanger", path: "/app/scripts/interface/controls/componentChanger.js" },
        { module: "componentPresets", path: "/app/scripts/interface/controls/componentPresets.js" }
    ]

    const modules = {}
    await Promise.all(controls.map(async (item) => { modules[item.module] = await import(item.path) }))
    return modules
}

/* init */
export const init = async () => {
    const panels = {
        menuPanel: dom_helper.search("#menuPanel"),
        configPanel: dom_helper.search("#configPanel")
    }
    const actualComponent = {}

    const modules = await registerModules()
    listEvents(modules, actualComponent)
    barsEvents(modules)
    panelEvents(modules, panels)
}
