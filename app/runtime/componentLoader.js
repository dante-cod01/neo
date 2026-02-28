import * as dep from "./registerDeps.js"
import * as comp from "./registerComps.js"

const depInReg = async (name, path) => {
    const classExits = dep.get(name)
    if (classExits) {
        return classExits
    } else {
        return await dep.set(name, path)
    }
}

const compInReg = async (path) => {
    const classExits = comp.get(path)
    if (classExits) {
        return classExits
    } else {
        return await comp.set(path)
    }
}

const createUniqDep = async (dependencies) => {
    let uniqueDependency = {}
    for (const [key, value] of Object.entries(dependencies)) {
        const depClass = await depInReg(key, value)
        const instance = new depClass()
        uniqueDependency[key] = instance
    }
    return uniqueDependency
}

export const load = async (componentClass, conf, cssClass, box) => {
    const module = (await compInReg(componentClass))
    if (!module.default) {
        console.log(module, "default export not found")
        return null
    }
    if (!module.tag) {
        console.log(module, "not tag export found")
        return null
    }
    const component = document.createElement(module.tag)
    cssClass.length && (component.classList = cssClass)
    box.appendChild(component)

    conf.links && (component.links = conf.links)
    conf.data && (component.newData = conf.data)
    conf.css && (component.newCss = conf.css)
    conf.logic && (component.newLogic = conf.logic)
    component.id = conf.id
    component.eventName = conf.events.eventName
    component.eventDom = conf.events.eventDom

    component.addDependency(await createUniqDep(conf.dependencies))
    conf.commands && conf.commands.forEach(command => command(component))
    return component
}
