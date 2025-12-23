import { convertTransition } from "./../../modules/css.js"

/* default view */
const componentBox = document.getElementById("componentBox")
const viewChanger = document.getElementById("topBar").shadowRoot.getElementById("viewChanger")
const time = convertTransition(componentBox.css.main_transition)

let view = "computer"
let rotate = false
let rotateState = false
let full = false

const calcBox = () => {
    let width
    let height
    let radius

    if (view === "computer") {
        width = Math.floor(window.innerWidth) + "px"
        height = window.innerHeight + "px"
        radius = 0
    }
    if (view === "tablet") {
        height = Math.floor(window.innerHeight * 0.8) + "px"
        width = Math.floor((window.innerHeight * 0.8) * 16 / 9) + "px"
        radius = 16
    }
    if (view === "mobile") {
        height = Math.floor(window.innerHeight * 0.8) + "px"
        width = Math.floor((window.innerHeight * 0.8) * 9 / 16) + "px"
        radius = 16
    }
    return { "width": width, "height": height, "radius": radius }
}

const applyRotate = async () => {
    componentBox.classList.add("rotate_90")
    componentBox.classList.remove("rotate_0")
    rotateState = true
    await new Promise(resolve => setTimeout(resolve, time))
}

const undoRotate = async () => {
    componentBox.classList.add("rotate_0")
    componentBox.classList.remove("rotate_90")
    rotateState = false
    await new Promise(resolve => setTimeout(resolve, time))
}

const applyView = async (calculedView) => {
    componentBox.updateProp("box_width", calculedView.width)
    componentBox.updateProp("box_height", calculedView.height)
    componentBox.updateProp("box_radius", calculedView.radius + "px")
    await new Promise(resolve => setTimeout(resolve, time))
}

const disableRotate = (disable) => {
    disable
        ? viewChanger.disableInput(viewChanger.inputs[3], true)
        : viewChanger.disableInput(viewChanger.inputs[3], false)
}

const detectFullMode = () => {
    return document.fullscreenElement
}

const fullMode = () => {
    detectFullMode()
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
}

const getTime = () => {
    const time = convertTransition(componentBox.css.main_transition)
    return time
}

const fadeOut = async () => {
    componentBox.classList.add("fadeOut")
    await new Promise(resolve => setTimeout(resolve, time))
}

export const viewControl = async (e) => {
    const index = e.detail.id
    index === "computer" && (view = "computer")
    index === "tablet" && (view = "tablet")
    index === "mobile" && (view = "mobile")
    index === "rotate" && (rotate = e.detail.checked)
    index === "fullscreen" && (full = full === true ? false : true)

    if (index === "rotate") {
        rotate ? await applyRotate() : await undoRotate()
    }

    if (index === "computer" || index === "tablet" || index === "mobile") {

        if (index === "computer" || index === "tablet") {
            disableRotate(true)
            if (rotate) {
                rotateState && await undoRotate()
            }
        }

        await applyView(calcBox())

        if (index === "mobile") {
            disableRotate(false)
            if (rotate) {
                await applyRotate()
            }
        }
    }

/*     if (index === "input_3") {
        console.log(viewChanger.inputs[3])
        rotate
            ? applyRotate(true)
            : applyRotate(false)
    }
 */}