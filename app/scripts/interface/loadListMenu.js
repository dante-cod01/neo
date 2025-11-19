import * as element from "./../modules/element.js"

export const init = async (box) => {
    /* magic-box component */
    const props = {
        closeButtom: true,
        topBar: true,
        bottomBar: true,
    }

    const config = {
        css: {
            ffff: "3333"
        },
        test: {}, 
        logic: {
            color: "red",
            side: "top"
        }
    }

    await import("./../components/nano/magicBox.js")
    const magicBox = document.createElement("magic-box")
    Object.entries(props).forEach(([prop, value]) => magicBox[prop] = value)
    magicBox.setAttribute("config", JSON.stringify(config))
    box.appendChild(magicBox)
}