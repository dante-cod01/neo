import * as cssHelper from "../../modules/css.js"
import { drawComponentBox } from "../loadComponentBox.js"

/* default view */
const componentContainer = document.getElementById("componentContainer")
let componentBox = null
const viewChanger = document.getElementById("topBar").shadowRoot.getElementById("viewChanger")
const time = cssHelper.convertTransition(getComputedStyle(document.documentElement).getPropertyValue("--componentBox_transition"))

let view = "computer"
let rotateInput = false
let full = false

const calcBox = () => {
    let width
    let height
    let radius
    let position

    if (view === "computer") {
        width = "110%"
        height = "110%"
        radius = "0"
        position = "center"
    }
    if (view === "tablet") {
        height = Math.floor(window.innerHeight * 0.8) + "px"
        width = Math.floor((window.innerHeight * 0.8) * 16 / 9) + "px"
        radius = "16px"
        position = "bottom"
    }
    if (view === "mobile") {
        height = Math.floor(window.innerHeight * 0.8) + "px"
        width = Math.floor((window.innerHeight * 0.8) * 8 / 16) + "px"
        radius = "16px"
        position = "left"
    }
    return { "width": width, "height": height, "radius": radius, "position": position }
}

const applyView = async (calculedView) => {
    document.documentElement.style.setProperty("--componentContainer_width", calculedView.width)
    document.documentElement.style.setProperty("--componentContainer_height", calculedView.height)
    document.documentElement.style.setProperty("--componentContainer_radius", calculedView.radius)
    document.documentElement.style.setProperty("--componentContainer_position", calculedView.position)
    componentBox.updateProp("box_radius", calculedView.radius)
    await new Promise(resolve => setTimeout(resolve, time))
}

const applyRotate = async (boolean) => {
    cssHelper.changeVar("componentBox_rotate", boolean ? "90deg" : "0deg", document.documentElement.style)
    await new Promise(resolve => setTimeout(resolve, time))
}

const disableRotateInput = (disable) => {
    disable
        ? viewChanger.disableInput(viewChanger.inputs[3], true)
        : viewChanger.disableInput(viewChanger.inputs[3], false)
}

const detectFullMode = () => {
    return document.fullscreenElement
}

const fullMode = async (delay) => {
    detectFullMode()
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    await new Promise(resolve => setTimeout(resolve, delay))
}

const fadeOut = async () => {
    cssHelper.changeVar("componentBox_scale", "0.1", document.documentElement.style)
    cssHelper.changeVar("componentBox_opacity", "0", document.documentElement.style)
    await new Promise(resolve => setTimeout(resolve, time))
    componentBox.remove()
}

const fadeIn = async () => {
    const calculedBox = calcBox()
    const width = calculedBox.width
    const height = calculedBox.height
    const radius = calculedBox.radius

    cssHelper.changeVar("componentBox_scale", "2", document.documentElement.style)
    cssHelper.changeVar("componentBox_opacity", "0", document.documentElement.style)
    componentBox = await drawComponentBox(componentContainer, width, height)
    componentBox.updateProp("box_radius", radius)
    await new Promise(resolve => setTimeout(resolve, 10))

    cssHelper.changeVar("componentBox_scale", "1", document.documentElement.style)
    cssHelper.changeVar("componentBox_opacity", "1", document.documentElement.style)
    await new Promise(resolve => setTimeout(resolve, time))
}

export const control = async (e) => {
    const index = e.detail.id
    index === "computer" && (view = "computer")
    index === "tablet" && (view = "tablet")
    index === "mobile" && (view = "mobile")
    index === "rotate" && (rotateInput = e.detail.checked)
    index === "fullscreen" && (full = full === true ? false : true)
    componentBox === null && (componentBox = document.getElementById("componentBox"))

    if (index === "rotate") {
        rotateInput ? await applyRotate(true) : await applyRotate(false)
    }

    if (index === "computer" || index === "tablet" || index === "mobile") {

        if (index === "computer" || index === "tablet") {
            disableRotateInput(true)
            rotateInput && await applyRotate(false)
            await applyView(calcBox())
        }


        if (index === "mobile") {
            await applyView(calcBox())
            disableRotateInput(false)
            rotateInput ? await applyRotate(true) : await applyRotate(false)
        }
    }

    if (index === "fullscreen") {
        const manualDelay = 500 /* event & check */
        await fadeOut()
        await fullMode(manualDelay)
        await fadeIn()
    }
}