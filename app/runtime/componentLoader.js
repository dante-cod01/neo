const registeredComponents = {}
const registeredDependencies = {}

export const register = (type, module) => {
    const name = Object.keys(module)[0]
    const url = new URL(Object.values(module)[0], window.location.origin).href
    const registry = type === "component" ? registeredComponents : registeredDependencies

    const existName = registry[name] ? true : false
    const existUrl = Object.values(registry).includes(url)

    if (!existName && !existUrl) {
        registry[name] = url
    }
/*     else if (existName) { NO BORRAR PARA UASAR CON MODE VERBOSE DESDE CONF GLOBAL
        console.log("Component Name already registered")
    } else if (existUrl) {
        console.log("Component class already registered")
    }
 */}

const createUniqDep = (dependencies) => {
    let deps = []
    for (const [name, url] of Object.entries(dependencies)) { deps.push({ [name]: url }) }
    return deps
}

const importModules = async (module, dependencies = null) => {
    const promises = []
    let uniqueDep = dependencies
    dependencies && (uniqueDep = createUniqDep(dependencies))

    const modUrl = Object.values(module)[0]
    promises.push(import(modUrl))
    uniqueDep && uniqueDep.forEach(item => {
        const depUrl = Object.values(item)[0]
        promises.push(import(depUrl))
    })

    const imports = await Promise.all(promises)

    const importedModule = {}
    const modName = Object.keys(module)[0]
    importedModule[modName] = imports[0]
    const importedDependencies = {}
    uniqueDep.forEach((item, index) => { importedDependencies[Object.keys(item)[0]] = imports[index + 1].default })

    return { module: importedModule, dependencies: importedDependencies }
}

const createInstances = (importedMods) => {
    const instances = { ...importedMods }
    Object.entries(instances).forEach(([key, value]) => {
        instances[key] = new value()
    })
    return instances
}

const createComponent = (module, box) => {
    const component = document.createElement(module.tag)
    box.appendChild(component)
    return component
}

export const load = async (box, componentMod, dependencies, conf = null) => {
    /* register */
    register("component", componentMod)
    dependencies && register("dependencies", dependencies)
    /* instances */
    const importedMods = await importModules(componentMod, dependencies || null)
    const module = Object.values(importedMods.module)[0]
    const depsInstances = dependencies && createInstances(importedMods.dependencies)
    /* create component */
    const component = createComponent(module, box)
    /* apply conf */
    component.id = conf?.id || crypto.randomUUID()
    component.eventDom = conf?.eventDom || document
    component.eventName = component.id
    component.newCss = conf?.css || null
    component.newLogic = conf?.logic || null
    component.links = conf?.links || null
    component.data = conf?.data || null
    /* inject deps */
    component.addDependency(depsInstances)
    return component
}
