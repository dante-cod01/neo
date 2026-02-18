import * as dom_helper from "./../../modules/dom.js"
import * as utils_helper from "./../../modules/utils.js"

const loadComponent = async (par, box) => {
    const loadedClass = par.conf.config.classPath
    const loadedPresets = par.conf.config.presetsPath
    const loadedDependency = par.conf.config.dependency
    const loadedDepName = par.conf.config.dep_name
    const index = "preset_0"

    const compPreset = (await import(loadedPresets))[index]
    const compClass = await import(loadedClass)
    const dependency = (await import(loadedDependency))[loadedDepName]

    const component = dom_helper.add(compClass.tag, box, "", "loaded_" + compClass.tag)
    component.eventDom = document
    component.eventName = component.id
    compPreset.css && (component.newCss = compPreset.css)
    compPreset.logic && (component.newLogic = compPreset.Logic)
    component.addDependency(new dependency())
}

const boxVisibility = async (boolean) => {
    const componentBox = dom_helper.search("#componentBox")
    const delay = utils_helper.getTimePropCss(componentBox)
    boolean
        ? componentBox.classList.add("componentBox_visible")
        : componentBox.classList.remove("componentBox_visible")
    await utils_helper.pause(delay)
}

export const control = async (detail, actualComponent) => {
    const componentBox = dom_helper.search("#componentBox")

    if (detail.title === "titleName" && detail.expand === true) {
        await loadComponent(actualComponent, componentBox)
        await boxVisibility(true)
    }
    if (detail.title === "titleName" && detail.open === false) {
        await boxVisibility(false)
        componentBox.innerHTML = ""
    }
}