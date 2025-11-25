export const add = (tag, box, classNames = null, idName = null, attr = null, props = null) => {
    const newTag = document.createElement(tag)
    classNames && (newTag.className = classNames)
    idName && (newTag.id = idName)
    attr && (Object.entries(attr).forEach(([key, value]) => newTag.setAttribute(key, value)))
    props && (Object.entries(props).forEach(([key, value]) => newTag[key] = value))
    box.appendChild(newTag)
    return newTag
}
