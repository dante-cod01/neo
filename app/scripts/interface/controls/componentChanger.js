import * as dom_helper from "./../../modules/dom.js"
import * as utils_helper from "./../../modules/utils.js"
import * as component from "./../../../runtime/componentLoader.js"

const loadComponent = async (par, box) => {
    const compClass = await import(par.conf.config.class)
    const dependencies = par.conf.config.dependencies
    const index = "preset_0"
    const preset = (await import(par.conf.config.presets))[index]
    const config = {}

    preset.data && (config["data"] = preset.data)
    preset.css && (config["css"] = preset.css)
    preset.logic && (config["logic"] = preset.logic)
    preset.id && (config["id"] = preset.id)
    preset.commands && (config["commands"] = preset.commands)
    config["dependencies"] = dependencies

    component.load(compClass, config, "", box)
}

const boxVisibility = async (boolean) => {
    const componentBox = dom_helper.search("#componentBox")
    const delay = utils_helper.getTimePropCss(componentBox)
    boolean
        ? componentBox.classList.add("componentBox_visible")
        : componentBox.classList.remove("componentBox_visible")
    await utils_helper.pause(delay)
}

export const control = async (boolean, actualComponent) => {
    const componentBox = dom_helper.search("#componentBox")

    if (boolean) {
        await loadComponent(actualComponent, componentBox)
        await boxVisibility(true)
    } else {
        await boxVisibility(false)
        componentBox.innerHTML = ""
    }
}