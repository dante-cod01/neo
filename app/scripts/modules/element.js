export const add = (tag, classNames = null, idName = null) => {
    console.log(tag)
    const createdElement = document.createElement(tag)
    if (classNames) createdElement.className = classNames
    if (idName) createdElement.id = idName
    return createdElement
}

export const insert = (item, box, attr = null, props = null) => {
    attr && (Object.entries(attr).forEach(([key, value]) => item.setAttribute(key, value)))
    props && (Object.entries(props).forEach(([key, value]) => item[key] = value))
    box.appendChild(item)
}

export const addAdnInsert = (tag, container, classNames = null, idName = null) => {
    const createdElement = document.createElement(tag)
    if (classNames) createdElement.className = classNames
    if (idName) createdElement.id = idName
    container.appendChild(createdElement)
    return createdElement
}