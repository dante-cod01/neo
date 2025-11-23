import * as element from "../modules/element.js"

export const init = () => {
    const mainBox = element.addAdnInsert("section", document.body, "mainBox", "mainBox")
    const componentBox = element.addAdnInsert("div", mainBox, "componentBox", "componentBox")
    const panelLeft = element.addAdnInsert("section", document.body, "panelLeft panelMenu", "panelLeft")
    const panelRight = element.addAdnInsert("section", document.body, "panelRight panelMenu", "panelRight")
    const controlsBox = element.addAdnInsert("section", document.body, "controlsBox", "controlsBox")
    const infoBox = element.addAdnInsert("section", document.body, "infoBox", "infoBox")

    return {
        "mainBox": mainBox,
        "componentBox": componentBox,
        "panelLeft": panelLeft,
        "panelRight": panelRight,
        "controlsBox": controlsBox,
        "infoBox": infoBox
    }
}