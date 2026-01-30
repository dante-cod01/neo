import * as cssHelper from "../../modules/css.js"

/* default view */
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
    document.documentElement.style.setProperty("--componentContainer_width", calc.width)
    document.documentElement.style.setProperty("--componentContainer_height", calc.height)
    document.documentElement.style.setProperty("--componentContainer_radius", calc.radius)
}

const activeRotateInput = (boolean) => {
    boolean
        ? viewChanger.disableInput(viewChanger.inputs[3], false)
        : viewChanger.disableInput(viewChanger.inputs[3], true)
}

const detectFullMode = () => {
    return document.fullscreenElement
}

const fullMode = async (delay) => {
    console.log(window.innerHeight)
    detectFullMode()
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    await new Promise(resolve => setTimeout(resolve, delay))
    console.log(window.innerHeight)

}

const fadeOut = async () => {
    cssHelper.changeVar("componentContainer_scale", "0.1", document.documentElement.style)
    cssHelper.changeVar("componentContainer_opacity", "0", document.documentElement.style)
    await new Promise(resolve => setTimeout(resolve, time))
}

const fadeIn = async () => {
    cssHelper.changeVar("componentContainer_scale", "2", document.documentElement.style)
    cssHelper.changeVar("componentContainer_transition", "0s", document.documentElement.style)
    await new Promise(resolve => setTimeout(resolve, 100))

    cssHelper.changeVar("componentContainer_scale", "1", document.documentElement.style)
    cssHelper.changeVar("componentContainer_opacity", "1", document.documentElement.style)
    cssHelper.changeVar("componentContainer_transition", `${time}ms`, document.documentElement.style)
    await new Promise(resolve => setTimeout(resolve, time))
}

const viewChanger = document.getElementById("topBar").shadowRoot.getElementById("viewChanger")
const time = cssHelper.convertTransition(getComputedStyle(document.documentElement).getPropertyValue("--componentContainer_transition"))
let conf = { view: "computer", rotate: false }

export const control = async (inputIndex) => {
    inputIndex === "computer" && (conf.view = "computer")
    inputIndex === "tablet" && (conf.view = "tablet")
    inputIndex === "mobile" && (conf.view = "mobile")
    inputIndex === "rotate" && (conf.rotate = viewChanger.inputs[3].checked)

    if (conf.view === "computer" || conf.view === "tablet") activeRotateInput(false)
    if (conf.view === "mobile") activeRotateInput(true)

    await fadeOut()
    inputIndex === "fullscreen" && await fullMode(1000)/* manual time - need refactor */
    applyView(await calcBox(conf))
    await fadeIn()
}