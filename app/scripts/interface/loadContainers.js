import * as element from "../modules/element.js"

export const init = () => {
    const mainBox = element.add( "section", document.body, "mainBox", "mainBox")
    const componentBox = element.add("div", mainBox, "componentBox", "componentBox")
    const panelLeft = element.add( "section", document.body, "panelLeft panelMenu", "panelLeft")
    const panelRight = element.add( "section", document.body, "panelRight panelMenu", "panelRight")
    const controlsBox = element.add( "section", document.body, "controlsBox", "controlsBox")
    const infoBox = element.add( "section", document.body, "infoBox", "infoBox")

    return {
        "mainBox": mainBox,
        "componentBox": componentBox,
        "panelLeft": panelLeft,
        "panelRight": panelRight,
        "controlsBox": controlsBox,
        "infoBox": infoBox
    }
}