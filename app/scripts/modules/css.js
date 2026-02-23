export const getVar = (cssVar) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${cssVar}`)
}

export const setVar = (_var, value) => {
    document.documentElement.style.setProperty(`--${_var}`, value)
}

export const getProp = (element, prop) => {
    return getComputedStyle(element).getPropertyValue(`${prop}`)
}