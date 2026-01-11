import * as element from "../modules/element.js"
const flashText = await import("./../components/nano/flashTitles.js")
const dependency = (await import("../components/class/componentBase.js")).ComponentBase

const drawInfoContainer = async (box) => {
    const infoContainer = element.add("section", box, "infoContainer absolute")
    const infoTypeBox = element.add("div", infoContainer, "infoTypeBox infoText")
    const infoTitleBox = element.add("div", infoContainer, "infoTitleBox infoText")
}

export const init = async (box, info = null) => {
    await drawInfoContainer(box, null)
}