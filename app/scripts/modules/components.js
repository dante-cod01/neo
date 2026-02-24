import * as dep from "./../../runtime/dependenciesReg.js"

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

export const load = async (componentClass, conf, cssClass, dependencies, box) => {
    const component = document.createElement(componentClass.tag)
    cssClass.length && cssClass.forEach(item => component.classList.add(item))
    box.appendChild(component)

    conf.data && (component.data = conf.data)
    conf.css && (component.newCss = conf.css)
    conf.logic && (component.newLogic = conf.logic)
    component.id = conf.id
    component.eventName = conf.id
    component.eventDom = conf.events?.dom ? conf.events.dom : document

    component.addDependency(await createUniqDep(dependencies))
    console.log(component.deps)
}
