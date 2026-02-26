export const search = (string, dom = null) => { /* old */
    const root = dom || document
    console.log("deprecated use dom_helper find")
    if (string.startsWith("#")) return root.querySelector(string)
    if (string.startsWith(".")) return Array.from(root.querySelectorAll(string))
}

export const find = (dom, string) => { /* old */
    if (string.startsWith("#")) return dom.querySelector(string)
    if (string.startsWith(".")) return Array.from(dom.querySelectorAll(string))
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

/* events */

export const event = (name, detail) => {
    document.dispatchEvent(new CustomEvent(name, {"detail": detail}))
}