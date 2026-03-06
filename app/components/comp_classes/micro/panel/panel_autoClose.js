import * as loader from "/app/runtime/componentLoader.js"

const drawPanelBox = async (box, conf = null) => {
    const module = { "magicBox": "/app/components/comp_classes/nano/boxes/magicBox.js" }
    const dependencies = { "base": "/app/components/comp_dependencies/base.js" }

    const component = await loader.load(box, module, dependencies, conf || null)
    component.className = "panel panelMenu"
    component.init()
    return component
}

const drawTitleBox = async (box, conf = null) => {
    const module = { "titleIcon": "/app/components/comp_classes/nano/titles/titleIcon.js" }
    const dependencies = { "base": "/app/components/comp_dependencies/base.js" }

    const component = await loader.load(box, module, dependencies, conf || null)
    component.init()
    return component
}

const drawListBox = async (box, conf = null, data) => {
    const module = { "reactiveList_01": "/app/components/comp_classes/nano/lists/reactiveList_01.js" }
    const dependencies = { "base": "/app/components/comp_dependencies/base.js" }

    const component = await loader.load(box, module, dependencies, conf || null)
    component.init()
    return component
}

export const init = async (box, conf, data) => {
    const panelBox = await drawPanelBox(box, conf.panel || null)
    const titleBox = await drawTitleBox(panelBox.nodes[0], conf.title || null)
    const listBox = await drawListBox(panelBox.nodes[0], conf.list || null)
    control(panelBox, titleBox, listBox)
}
export default init

/* CONTROL EVENTS-BUS */

const control = (panel, title, list) => {
    document.addEventListener(title.id, async (e) => {
        toggleSequence(e.detail.check, panel, title, list)
    })
}

const toggleSequence = async (boolean, panel, title, list) => {
    const transition = panel.css.box_transition.split(" ")[0]
    const pauseTime = transition.endsWith("ms") ? transition.slice(0, -2) : transition.slice(0, -1) * 1000

    if (boolean) {
        panel.contract(true, "vertical")
        title.titleVisible(false)
        list.updateConf("box_height", "0px")
        await new Promise(resolve => setTimeout(resolve, pauseTime))
        panel.contract(true, "horizontal")
        title.updateConf("icon_opacity", "0.6")
        await new Promise(resolve => setTimeout(resolve, pauseTime))
    } else {
        title.updateConf("icon_opacity", "1")
        panel.contract(false, "horizontal")
        await new Promise(resolve => setTimeout(resolve, pauseTime))
        panel.contract(false, "vertical")
        title.titleVisible(true)
        list.updateConf("box_height", `calc(100% - ${title.offsetHeight}px)`)
        await new Promise(resolve => setTimeout(resolve, pauseTime))
    }
}