export const id = (par, dom = null) => {
    let result = null
    dom
        ? result = dom.querySelector(`#${par}`)
        : result = document.getElementById(par)
    return result
}