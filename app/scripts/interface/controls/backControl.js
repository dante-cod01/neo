import { backs } from "./../preloadBacks.js"
import * as cssHelper from "./../../modules/css.js"

const changeBack = async (back) => {
    document.documentElement.style.setProperty("--componentBox_back", `url("${backs[back]}")`)
}

const changeBlur = async (par1, par2) => {
    const time = cssHelper.convertTransition(cssHelper.getVar("normal_transition"))
    document.documentElement.style.setProperty("--blurLayer_filter", par1)
    document.documentElement.style.setProperty("--blurLayer_opacity", par2)
    await new Promise(resolve => setTimeout(resolve, time))
}

const animationBack = async (input) => {
    await changeBlur("120px", 0)
    changeBack(input.detail.id)
    await changeBlur("0px", 1)
}

export const control = async (input) => {
    animationBack(input)
}