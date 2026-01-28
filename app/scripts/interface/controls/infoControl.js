import * as element from "../../modules/element.js"
import * as cssHelper from "../../modules/css.js"
import * as utils from "../../modules/utils.js"

const expandInfoBox = async (boolean, infoBox) => {
    await infoBox.expand("right", boolean)
}

const drawInfo = async (info, infoBox) => {
    const component = document.getElementById("infoBox")
    const time = cssHelper.convertTransition(getComputedStyle(component).getPropertyValue("transition"))
    const section = info.section.slice(0, 5).toUpperCase()
    const name = info.config.name


}

export const control = async (info, lastComponent) => {
    const infoBox = document.getElementById("infoBox")
    if (!lastComponent.tag) {
        console.log("component null")
        lastComponent.section = info.section
        lastComponent.tag = info.config.tag
        await expandInfoBox(true, infoBox)
        drawInfo(info, infoBox)
    } else {
        console.log("component valid")
        await expandInfoBox(false, infoBox)
        await drawInfo(info, infoBox)
        await expandInfoBox(true, infoBox)
    }
}