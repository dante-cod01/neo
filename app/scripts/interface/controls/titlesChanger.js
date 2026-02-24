import * as dom_helper from "../../modules/dom.js"
import * as utils_helper from "../../modules/utils.js"

const restoreConf = (customConf, boolean, sectionBox, nameBox) => {
    if (boolean) {
        sectionBox.updateProp("box_width", customConf.section.box_width)
        sectionBox.updateProp("box_opacity", customConf.section.box_opacity)
        sectionBox.updateProp("box_overflow", "visible")
        sectionBox.updateProp("textBox_padding", customConf.section.textBox_padding)

        nameBox.updateProp("box_width", customConf.section.box_width)
        nameBox.updateProp("textBox_padding", customConf.section.textBox_padding)
    } else {
        sectionBox.updateProp("box_width", "0px")
        sectionBox.updateProp("box_opacity", "0")
        sectionBox.updateProp("textBox_padding", "0px")

        nameBox.updateProp("box_width", "0px")
        nameBox.updateProp("textBox_padding", "0px")
    }
}

const animate = async (detail, titlesBox, sectionBox, nameBox, customConf) => {
    const sectionText = detail.conf.section
    const nameText = detail.conf.config.name

    restoreConf(customConf, true, sectionBox, nameBox)
    const [width1, width2] = await Promise.all([
        sectionBox.addText(sectionText),
        nameBox.addText(nameText)
    ])
    const resizeMax = Math.max(...[width1, width2]) + "px"
    titlesBox.updateProp("box_width", resizeMax)

    await sectionBox.expandBox(true, resizeMax)
    nameBox.expandBox(true)

    await sectionBox.animateText()
    await nameBox.animateText()
}

const animateRemove = async (titlesBox, sectionBox, nameBox) => {
    /* update this props before */
    sectionBox.updateProp("box_overflow", "hidden")
    await sectionBox.removeText()
    await nameBox.removeText()
    titlesBox.updateProp("box_width", "0px")
    sectionBox.updateProp("box_width", "0px")
}

export const control = async (boolean, actualComponent = null) => {
    const titlesBox = dom_helper.search("#titlesBox")
    const sectionBox = dom_helper.search("#titleSection", titlesBox.nodes.node_0)
    const nameBox = dom_helper.search("#titleName", titlesBox.nodes.node_1)
    const customConf = { "section": { ...sectionBox.conf }, "name": { ...nameBox.conf } }

    if (boolean) {
        await animate(actualComponent, titlesBox, sectionBox, nameBox, customConf)
    } else {
        await animateRemove(titlesBox, sectionBox, nameBox)
    }
}