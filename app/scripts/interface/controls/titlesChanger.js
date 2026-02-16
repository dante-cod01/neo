import * as dom_helper from "../../modules/dom.js"
import * as css_helper from "../../modules/css.js"
import * as utils_helper from "../../modules/utils.js"

const changeComponentConf = (customConf, boolean, sectionBox, nameBox) => {
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

    changeComponentConf(customConf, true, sectionBox, nameBox)
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

const animateRemove = async (titlesBox, sectionBox, nameBox, customConf) => {
    /* update this props before */
    sectionBox.updateProp("box_overflow", "hidden")
    await sectionBox.removeText()
    await nameBox.removeText()
    titlesBox.updateProp("box_width", "0px")
    /* update props after */
    changeComponentConf(customConf, false, sectionBox, nameBox)
    await utils_helper.time(css_helper.convertTransition(nameBox.conf.textBox_transition) * 2)
}

const moveTitlesBox = async (box) => {
    const pos = box.classList.contains("titlesBox_left")
    pos ? box.classList.remove("titlesBox_left") : box.classList.add("titlesBox_left")
}

export const control = async (detail, lastComponent) => {
    const titlesBox = dom_helper.id("titlesBox")

    if ("conf" in detail) {
        const sectionBox = dom_helper.id("titleSection", titlesBox.nodes.node_0)
        const nameBox = dom_helper.id("titleName", titlesBox.nodes.node_1)
        const customConf = { "section": { ...sectionBox.conf }, "name": { ...nameBox.conf } }

        lastComponent.name && await animateRemove(titlesBox, sectionBox, nameBox, customConf)
        await animate(detail, titlesBox, sectionBox, nameBox, customConf)
        lastComponent.name = detail.conf.config.name
    }
    if ("panel" in detail && "ver" in detail) {
        await moveTitlesBox(titlesBox)
    }
}