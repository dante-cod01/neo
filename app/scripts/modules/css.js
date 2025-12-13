export const getVar = (_var) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${_var}`)
}