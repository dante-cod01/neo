import * as element from "../../modules/element.js"
import * as cssHelper from "../../modules/css.js"
import * as utils from "../../modules/utils.js"

/* const close = async (infoSection, infoName) => {
    infoSection.erase()
    await infoName.erase()
    cssHelper.changeVar("relativeInfoBox_width", "0", document.documentElement.style)
    cssHelper.changeVar("relativeInfoBox_opacity", "0", document.documentElement.style)
    await utils.waiting(1200)
}

const draw = async (text, component) => {
    const textBox = await component.write(text)
    if (component.id === "infoSection") {
        cssHelper.changeVar("relativeInfoBox_width", component.width, document.documentElement.style)
        cssHelper.changeVar("relativeInfoBox_opacity", "1", document.documentElement.style)
    }
    await utils.waiting(cssHelper.convertTransition(cssHelper.getVar("normal_transition")))
    component.animate(textBox)
}
 */
const expandInfoBox = async (boolean) => {
    const time = utils.getTimeById("infoContainer")
    if (boolean) {
        cssHelper.changeVar("relativeInfoBox_width", "200px", document.documentElement.style)
        cssHelper.changeVar("relativeInfoBox_opacity", "1", document.documentElement.style)
    } else {
        cssHelper.changeVar("relativeInfoBox_width", "0", document.documentElement.style)
        cssHelper.changeVar("relativeInfoBox_opacity", "0", document.documentElement.style)
    }
    await utils.waiting(time)
}

const loadAnimatedText = (component, animation) => {

}

export const control = async (info, lastComponent) => {
    const infoSection = document.getElementById("infoSection")
    const infoName = document.getElementById("infoName")

    lastComponent && await expandInfoBox(false)
    expandInfoBox(true)
    loadAnimatedText(infoSection, "appearBlur")

    /*     lastComponent.tag && await close(infoSection, infoName)
        await draw(info.section, infoSection)
        await utils.waiting(900)
        await draw(info.config.name, infoName)
     */
    lastComponent.tag = info.config.tag
}