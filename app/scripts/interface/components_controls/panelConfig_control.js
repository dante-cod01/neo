import * as dom_helper from "../../modules/dom.js"
import * as utils_helper from "../../modules/utils.js"

const toggleSequence = async (boolean) => {
    const panel = dom_helper.find(document, "#configPanel")
    const title = dom_helper.find(panel.shadowRoot, "#configPanel_title")

    const pauseTime = utils_helper.getTime(panel.css.box_transition)
    if (boolean) {
        configPanel.contract(true, "top")
        title.titleVisible(false)
        await utils_helper.pause(pauseTime)
        configPanel.contract(true, "right")
        title.updateConf("icon_opacity", "0.6")
        await utils_helper.pause(pauseTime)
    } else {
        title.updateConf("icon_opacity", "1")
        configPanel.contract(false, "right")
        await utils_helper.pause(pauseTime)
        title.titleVisible(true)
        configPanel.contract(false, "top")
        await utils_helper.pause(pauseTime)
    }
}

const titleEvents = () => {
    document.addEventListener("configPanel_title", async (e) => {
        toggleSequence(e.detail.check)

    })
}


export const control = () => {

    titleEvents(configPanel)
}