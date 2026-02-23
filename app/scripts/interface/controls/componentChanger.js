import * as dom_helper from "./../../modules/dom.js"
import * as utils_helper from "./../../modules/utils.js"

const loadDependencies = async (parDependencies) => {
    const dependencies = {}
    for (const dependency of Object.entries(parDependencies)) {
        const parName = dependency[0]
        const parClass = dependency[1]
        const importedClass = await import(parClass)
        const importedName = importedClass.name
        dependencies[parName] = importedClass[importedName]
    }
    return dependencies
}

const loadComponent = async (par, box) => {
    const compClass = await import(par.conf.config.class)
    const dependencies = await loadDependencies(par.conf.config.dependencies)
    const index = "preset_0"
    const compPreset = (await import(par.conf.config.presets))[index]

    const component = dom_helper.add(compClass.tag, box, "", "componentInBox")
    component.eventDom = document
    component.eventName = component.id
    compPreset.css && (component.newCss = compPreset.css)
    compPreset.logic && (component.newLogic = compPreset.logic)
    component.addDependency(dependencies)
    compPreset.commands && compPreset.commands.forEach(command => command(component))
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