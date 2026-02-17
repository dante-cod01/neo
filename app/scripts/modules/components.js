export const load = (componentClass, componentConf, cssClass, eventDom, id, dependency, box) => {
    const component = document.createElement(componentClass.tag)
    cssClass.length && cssClass.forEach(item => component.classList.add(item))
    box.appendChild(component)


    console.log(componentConf)
    componentConf.css && (component.newCss = componentConf.css)
    componentConf.logic && (component.newLogic = componentConf.logic)
    component.eventDom = eventDom ? eventDom : document
    component.eventName = id
    component.id = id

    console.log("dependency before instantiation:", dependency)
    component.addDependency(new dependency())
    return component
}