import * as dep from "./dependenciesReg.js"

const classInReg = async (name, path) => {
    const classExits = dep.get(name)
    if (classExits) {
        return classExits
    } else {
        return await dep.set(name, path)
    }
}

const createUniqDep = async (dependencies) => {
    let uniqueDependency = {}
    for (const [key, value] of Object.entries(dependencies)) {
        const depClass = await classInReg(key, value)
        const instance = new depClass()
        uniqueDependency[key] = instance
    }
    return uniqueDependency
}

export const load = async (componentClass, conf, cssClass, box) => {
    const component = document.createElement(componentClass.tag)
    cssClass.length && (component.classList = cssClass)
    box.appendChild(component)

    conf.links && (component.links = conf.links)
    conf.data && (component.newData = conf.data)
    conf.css && (component.newCss = conf.css)
    conf.logic && (component.newLogic = conf.logic)
    component.id = conf.id
    component.eventName = conf.id
    component.eventDom = document

    component.addDependency(await createUniqDep(conf.dependencies))
    component.init()
    conf.commands && conf.commands.forEach(command => command(component))
    return component
}
