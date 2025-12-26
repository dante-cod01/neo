export const getVar = (_var) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${_var}`)
}

export const changeVar = (_var, value, dom) => {
    dom.setProperty(`--${_var}`, value)
}

export const convertTransition = (transition) => {
    const stringTime = transition.split(" ")[0]
    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}