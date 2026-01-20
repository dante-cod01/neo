import * as element from "../../modules/element.js"
import * as cssHelper from "../../modules/css.js"
import * as utils from "../../modules/utils.js"

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

export const control = async (info, lastComponent) => {
    const section = info.section
    const name = info.name

    lastComponent.tag = info.config.tag
}