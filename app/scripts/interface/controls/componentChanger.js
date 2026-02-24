import * as dom_helper from "./../../modules/dom.js"
import * as utils_helper from "./../../modules/utils.js"
import * as comp_helper from "./../../modules/components.js"

/* const loadDependencies = async (parDependencies) => {
    const dependencies = {}
    for (const dependency of Object.entries(parDependencies)) {
        const className = dependency[0]
        const classPath = dependency[1]

        console.log(className, classPath)
        dependencies[className] = (await import(classPath)).default
    }
    return dependencies
}
 */
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
    const component = comp_helper.load(compClass, config, "", dependencies, box )

/*     const component = dom_helper.add(compClass.tag, box, "", "componentInBox")
    component.eventDom = document
    component.eventName = component.id
    compPreset.css && (component.newCss = compPreset.css)
    compPreset.logic && (component.newLogic = compPreset.logic)
 */
/*     component.addDependency(dependencies)
    compPreset.commands && compPreset.commands.forEach(command => command(component))
 */}

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
    console.log("--", actualComponent)

    if (boolean) {
        await loadComponent(actualComponent, componentBox)
        await boxVisibility(true)
    } else {
        await boxVisibility(false)
        componentBox.innerHTML = ""
    }
}