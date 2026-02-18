import { backs } from "./../loads/preloadBacks.js"
import * as utils_helper from "../../modules/utils.js"
import * as css_helper from "../../modules/css.js"

const changeBack = async (back) => {
    const image = backs[back]
    css_helper.setVar("backLayer_back", `url("${image}")`, document.documentElement.style)
}

const changeBlur = async (blur, opacity) => {
    const delay = utils_helper.getTimeVarCss("normal_transition")
    css_helper.setVar("blurLayer_filter", blur, document.documentElement.style)
    css_helper.setVar("backLayer_opacity", opacity, document.documentElement.style)
    await utils_helper.pause(delay)
}

const animationBack = async (input) => {
    await changeBlur("50px", 0)
    changeBack(input)
    await changeBlur("0px", 1)
}

export const control = async (input) => {
    animationBack(input.id)
}