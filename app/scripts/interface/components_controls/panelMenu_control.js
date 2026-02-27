import * as dom_helper from "../../modules/dom.js"
import * as utils_helper from "../../modules/utils.js"

const toggleSequence = async (boolean) => {
    const panel = dom_helper.find(document, "#panelMenu")
    const title = dom_helper.find(panel.shadowRoot, "#panelMenu_title")

    const pauseTime = utils_helper.getTime(panel.css.box_transition)
    if (boolean) {
        panel.contract(true, "vertical")
        title.titleVisible(false)
        await utils_helper.pause(pauseTime)
        panel.contract(true, "horizontal")
        title.updateConf("icon_opacity", "0.6")
        await utils_helper.pause(pauseTime)
    } else {
        title.updateConf("icon_opacity", "1")
        panel.contract(false, "horizontal")
        await utils_helper.pause(pauseTime)
        title.titleVisible(true)
        panel.contract(false, "vertical")
        await utils_helper.pause(pauseTime)
    }
}

const titleEvents = () => {
    document.addEventListener("panelMenu_title", async (e) => {
        toggleSequence(e.detail.check)
    })
}

export const control = () => {
    titleEvents()
}