import * as element from "../../modules/element.js"
import * as cssHelper from "../../modules/css.js"
import * as utils from "./../../modules/utils.js"

const close = async () => {
    console.log("close")
}

const open = async () => {
    console.log("open")
}

const drawInfo = async (text, component) => {
    component.updateText(text)/* metodo de componente */
}

export const control = async (info, lastComponent) => {
    const infoSection = document.getElementById("infoSection")
    const infoName = document.getElementById("infoName")

    lastComponent.tag && await close()
    await open()
    await drawInfo(info.section, infoSection)
    await utils.waitingTime(900)
    await drawInfo(info.config.name, infoName)

    lastComponent.tag = info.config.tag
}