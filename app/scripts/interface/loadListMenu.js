import * as element from "./../modules/element.js"

export const init = async (box) => {
    /* magic-box component */
    const props = {
        closeButtom: true,
        topBar: true,
        bottomBar: true,
    }

    const css = {
        panelSide: "left",
        title_H: "40px",
    }

    const logic = {
        title: "Components"
    }

    await import("./../components/nano/magicBox.js")
    const magicBox = document.createElement("magic-box")
    Object.entries(props).forEach(([prop, value]) => magicBox[prop] = value)
    magicBox.setAttribute("css", JSON.stringify(css))
    magicBox.setAttribute("logic", JSON.stringify(logic))
    box.appendChild(magicBox)
}