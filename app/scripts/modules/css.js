export const getVar = (_var) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${_var}`)
}

export const convertTransition = (transition) => {
    const stringTime = transition.split(" ")[0]
    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}