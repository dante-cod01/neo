import * as dom_helper from "./../../modules/dom.js"

document.addEventListener("configPanel_title", (e) => {
    console.log(e.detail)
})


export  const control = () => {
    const configPanel = dom_helper.find(document, "#configPanel")
    console.log(configPanel)
}