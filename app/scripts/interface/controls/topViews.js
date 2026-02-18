import * as css_helper from "../../modules/css.js"
import * as utils_helper from "../../modules/utils.js"

const calcBox = async (conf) => {
    let width
    let height
    let radius

    if (conf.view === "computer") {
        width = "100%"
        height = "100%"
        radius = "0"
    }
    if (conf.view === "tablet") {
        height = Math.floor(window.innerHeight * 0.8) + "px"
        width = Math.floor((window.innerHeight * 0.8) * 16 / 9) + "px"
        radius = "16px"
    }
    if (conf.view === "mobile") {
        height = conf.rotate
            ? Math.floor((window.innerHeight * 0.8) * 8 / 16) + "px"
            : Math.floor(window.innerHeight * 0.8) + "px"
        width = conf.rotate
            ? Math.floor(window.innerHeight * 0.8) + "px"
            : Math.floor((window.innerHeight * 0.8) * 8 / 16) + "px"
        radius = "16px"
    }
    return { "width": width, "height": height, "radius": radius }
}

const applyView = (calc) => {
    css_helper.setVar("componentContainer_width", calc.width, document.documentElement.style)
    css_helper.setVar("componentContainer_height", calc.height, document.documentElement.style)
    css_helper.setVar("componentContainer_radius", calc.radius, document.documentElement.style)
}

const activeRotateInput = (boolean, viewChanger) => {
    viewChanger.disableInput(viewChanger.inputs[3], !boolean)
}

const detectFullMode = () => {
    return document.fullscreenElement
}

const fullMode = async (fullDelay) => {
    detectFullMode()
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    await utils_helper.pause(fullDelay)
}

const fadeOut = async (delay) => {
    css_helper.setVar("componentContainer_scale", "0.1", document.documentElement.style)
    css_helper.setVar("componentContainer_opacity", "0", document.documentElement.style)
    await utils_helper.pause(delay)
}

const fadeIn = async (delay) => {
    css_helper.setVar("componentContainer_scale", "2", document.documentElement.style)
    css_helper.setVar("componentContainer_transition", "0s", document.documentElement.style)
    await utils_helper.pause(10) /* await for vars */

    css_helper.setVar("componentContainer_scale", "1", document.documentElement.style)
    css_helper.setVar("componentContainer_opacity", "1", document.documentElement.style)
    css_helper.setVar("componentContainer_transition", `${delay}ms`, document.documentElement.style)
    await utils_helper.pause(delay)
}

let conf = { view: "computer", rotate: false }

export const control = async (inputIndex) => {
    const viewChanger = document.getElementById("topBar").shadowRoot.getElementById("viewChanger")
    const delay = utils_helper.getTimeVarCss("componentContainer_transition")

    inputIndex === "computer" && (conf.view = "computer")
    inputIndex === "tablet" && (conf.view = "tablet")
    inputIndex === "mobile" && (conf.view = "mobile")
    inputIndex === "rotate" && (conf.rotate = viewChanger.inputs[3].checked)

    if (conf.view === "computer" || conf.view === "tablet") activeRotateInput(false, viewChanger)
    if (conf.view === "mobile") activeRotateInput(true, viewChanger)

    await fadeOut(delay)
    inputIndex === "fullscreen" && await fullMode(1000)/* manual time - need refactor */
    applyView(await calcBox(conf))
    await fadeIn(delay)
}