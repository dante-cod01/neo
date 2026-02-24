export const load = async (componentClass, conf, cssClass, dependencies, box) => {
    const component = document.createElement(componentClass.tag)
    cssClass.length && cssClass.forEach(item => component.classList.add(item))
    box.appendChild(component)

    conf.data && (component.data = conf.data)
    conf.css && (component.newCss = conf.css)
    conf.logic && (component.newLogic = conf.logic)
    conf.id && (component.id = conf.id)

    component.eventDom = conf.events?.dom ? conf.events.dom : document
    component.eventName = conf.id

    console.log(dependencies)
    let uniqueDependency = {}
    /* dependency register in runtime */
    for (const [key, value] of Object.entries(dependencies)) {
        const instance = new ((await import(value)).default)()
        uniqueDependency[key] = instance
    }
    console.log(uniqueDependency)
}