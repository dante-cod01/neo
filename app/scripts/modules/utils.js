import * as css_helper from "./css.js"

export const pause = async (time) => {
    await new Promise(resolve => setTimeout(resolve, time))
}

/* export const sendEvent = (eventName, detail) => {
    document.dispatchEvent(new CustomEvent(eventName, { "detail": detail }))
}
 */
export const getTime = (jsVar) => {
    const stringTime = jsVar.split(" ")[0]

    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}

export const getTimePropCss = (element) => {
    const transition = css_helper.getProp(element, "transition")
    const stringTime = transition.split(" ")[0]

    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}

export const getTimeVarCss = (cssVar) => {
    const transition = css_helper.getVar(cssVar)
    const stringTime = transition.split(" ")[0]

    return stringTime.endsWith("ms")
        ? parseFloat(stringTime)
        : parseFloat(stringTime) * 1000
}