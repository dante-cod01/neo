export const getVar = (prop) => {
    console.log("css [getVar] module old - replace width: [getProp]")
    return getComputedStyle(document.documentElement).getPropertyValue(`--${prop}`)
}

export const getProp = (element, prop) => {
    return getComputedStyle(element).getPropertyValue(`${prop}`)
}

export const changeVar = (_var, value, dom) => {
    dom.setProperty(`--${_var}`, value)
}

export const convertTransition = (transition) => {
    const stringTime = transition.split(" ")[0]
    console.log("css [convertTransition] module old - replace width: [transitionTime]")

    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}

export const transitionTime = (element) => {
    const transition = getProp(element, "transition")
    const stringTime = transition.split(" ")[0]

    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}