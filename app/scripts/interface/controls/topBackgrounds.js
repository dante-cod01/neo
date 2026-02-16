import { backs } from "./../loads/preloadBacks.js"
import * as cssHelper from "../../modules/css.js"

const changeBack = async (back) => {
    const image = backs[back]
    document.documentElement.style.setProperty("--backLayer_back", `url("${image}")`)
}

const changeBlur = async (blur, opacity) => {
    const time = cssHelper.convertTransition(cssHelper.getVar("normal_transition"))
    document.documentElement.style.setProperty("--blurLayer_filter", blur)
    document.documentElement.style.setProperty("--backLayer_opacity", opacity)
    await new Promise(resolve => setTimeout(resolve, time))
}

const animationBack = async (input) => {
    await changeBlur("50px", 0)
    changeBack(input)
    await changeBlur("0px", 1)
}

export const control = async (input) => {
    animationBack(input.id)
}