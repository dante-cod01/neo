import * as appConfig from "./../../config/appConfig.js"
import * as element from "./../modules/element.js"

const startAutoMode = async () => {
    const listItems = document.getElementById("menuPanel").nodes.node_0.children[0]
    listItems.items.section_0.sectionInput.checked = true
    listItems.items.section_0.sectionInput.dispatchEvent(new CustomEvent("change"))
    await new Promise(resolve => setTimeout(resolve, 1000))
    listItems.items.section_0.itemsInput[0].checked = true
    listItems.items.section_0.itemsInput[0].dispatchEvent(new CustomEvent("change"))
}


const drawAutoStart = async () => {
    const menuPanel = document.getElementById("menuPanel").nodes.node_1
    const autoStartToogle = element.add("input", menuPanel, "", "toogleAutoStart")
    autoStartToogle.setAttribute("type", "checkbox")
    return autoStartToogle
}

const saveModeStatus = (boolean) => {
   localStorage.setItem("appAutoLoad", JSON.stringify(boolean))
}

const applyEvents = (input) => {
    input.addEventListener("change", (e) => {
        saveModeStatus(e.target.checked)
        e.target.checked && startAutoMode()
    })
}

const init = async () => {
    if (appConfig.autoLoad) {
        const toogle = await drawAutoStart()
        toogle.checked = JSON.parse(localStorage.getItem("appAutoLoad"))
        toogle.checked && startAutoMode()
        applyEvents(toogle)
    } else {
        localStorage.removeItem("appAutoLoad")
    }
}

init()