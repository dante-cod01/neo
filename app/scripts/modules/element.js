export const add = (tag, container, classNames = null, idName = null) => {
    const createdElement = document.createElement(tag)
    if (classNames) createdElement.className = classNames
    if (idName) createdElement.id = idName
    container.appendChild(createdElement)
    return createdElement
}
