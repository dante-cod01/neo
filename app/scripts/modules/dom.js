/* export const id = (par, dom = null) => {
    console.log("css [id] module old - replace width: [search]")
    console.trace()
    let result = null
    dom
        ? result = dom.querySelector(`#${par}`)
        : result = document.getElementById(par)
    return result
}
 */
export const search = (string, dom = null) => {
    const root = dom || document
    
    if (string.startsWith("#")) return root.querySelector(string)
    if (string.startsWith(".")) return Array.from(root.querySelectorAll(string))
}

export const add = (tag, box, classNames = null, idName = null, attr = null, props = null) => {
    const newTag = document.createElement(tag)
    classNames && (newTag.className = classNames)
    idName && (newTag.id = idName)
    attr && (Object.entries(attr).forEach(([key, value]) => newTag.setAttribute(key, value)))
    props && (Object.entries(props).forEach(([key, value]) => newTag[key] = value))
    box.appendChild(newTag)
    return newTag
}