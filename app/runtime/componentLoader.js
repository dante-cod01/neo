const registeredComponents = {}
const registeredDependencies = {}

export const register = (type, module) => {
    const name = Object.keys(module)[0]
    const url = new URL(Object.values(module)[0], window.location.origin).href
    const registry = type === "component" ? registeredComponents : registeredDependencies

    if (registry[name]) {
        console.log("Component Name already registered")
        return
    }
    if (Object.values(registry).includes(url)) {
        console.log("Component class already registered")
        return
    }
    registry[name] = url
}

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

export const load = async (componentMod, dependencies = null, box, conf) => {
    /* register */
    register("component", componentMod)
    dependencies && register("dependencies", dependencies)
    /* instances */
    const importedMods = await importModules(componentMod, dependencies ? dependencies : null)
    const module = Object.values(importedMods.module)[0].default
    const modInstance = new module()
    const depsInstances = dependencies && createInstances(importedMods.dependencies)
    /*  */
    console.log(modInstance, depsInstances)






    
    /*     console.log(importedMods)
     */    /*     const uniqueDep = createInstances(module, deps)
        */    /*     if (!module.default) {
console.log(module, "default export not found")
return null
}
if (!module.tag) {
console.log(module, "not tag export found")
return null
}
const component = document.createElement(module.tag)
*/
    /*     cssClass.length && (component.classList = cssClass)
     */ /*    box.appendChild(component)
console.log(component) */

    /*     conf.links && (component.links = conf.links)
        conf.data && (component.newData = conf.data)
        conf.css && (component.newCss = conf.css)
        conf.logic && (component.newLogic = conf.logic)
        component.id = conf.id
        component.eventName = conf.events.eventName
        component.eventDom = conf.events.eventDom
     */
    /*     component.addDependency(await createUniqDep(conf.dependencies))
     *//*     conf.commands && conf.commands.forEach(command => command(component))
*/    /* return component */
}
