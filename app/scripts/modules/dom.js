export const id = (par, dom = null) => {
    let result = null
    dom
        ? result = dom.querySelector(`#${par}`)
        : result = document.getElementById(par)
    return result
}

export const search = (string, dom) => {
    if (string.startsWith("#")) { return dom.getElementById(string.slice(1))}
    if (string.startsWith(".")) { return Array.from(dom.querySelectorAll(string))}
}