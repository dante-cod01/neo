import * as dom_helper from "../../modules/dom.js"
import * as css_helper from "../../modules/css.js"
import * as utils_helper from "../../modules/utils.js"

const animate = async (sectionText, nameText, sectionBox, nameBox) => {
    const titlesBox = dom_helper.id("titlesBox", dom_helper.id("bottomBar").nodes.node_0)

    const [width1, width2] = await Promise.all([
        sectionBox.addText(sectionText),
        nameBox.addText(nameText)
    ])

    const resizeMax = Math.max(...[width1, width2]) + "px"
    titlesBox.updateProp("box_width", resizeMax)
    await sectionBox.animate(resizeMax)
    await nameBox.animate()
}

const animateRemove = async (sectionBox, nameBox) => {
    const titlesBox = dom_helper.id("titlesBox", dom_helper.id("bottomBar").nodes.node_0)
    const time = css_helper.convertTransition(nameBox.conf.textBox_transition)

    await Promise.all([
        await sectionBox.removeText(),
        nameBox.removeText()
    ])

    titlesBox.updateProp("box_width", "0px")
    await utils_helper.time(time)
}

export const control = async (detail, lastComponent) => {
    const titlesBox = dom_helper.id("titlesBox", dom_helper.id("bottomBar").nodes.node_0)
    const sectionBox = dom_helper.id("titleSection", titlesBox.nodes.node_0)
    const nameBox = dom_helper.id("titleName", titlesBox.nodes.node_1)
    const sectionText = detail.conf.section
    const nameText = detail.conf.config.name

    lastComponent.name && await animateRemove(sectionBox, nameBox)
    await animate(sectionText, nameText, sectionBox, nameBox)

    lastComponent.name = nameText
}