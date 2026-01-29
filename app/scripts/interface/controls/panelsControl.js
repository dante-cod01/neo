const delegateControl = async (openPanels, input) => {
    const menuPanel = document.getElementById("menuPanel")
    const menucloseInput = menuPanel.getInputButtom()
    const configPanel = document.getElementById("configPanel")
    const configcloseInput = configPanel.getInputButtom()

    if (input.id === "menuPanel") {
        menucloseInput.checked = !input.checked
        menuPanel.tooglePanel(!input.checked)
    }

    if (input.id === "configPanel") {
        configcloseInput.checked = !input.checked
        configPanel.tooglePanel(!input.checked)
    }

    if (input.id === "bothPanels") {
        menucloseInput.checked = !input.checked
        menuPanel.tooglePanel(!input.checked)
        configcloseInput.checked = !input.checked
        configPanel.tooglePanel(!input.checked)
    }
}

export const control = async (openPanels, detail) => {
/* console.log(detail)
 */    if (detail.input) {
        openPanels[detail.input.id] = !detail.input.checked


/*         inputsControl(openPanels, detail.input)
 */        delegateControl(openPanels, detail.input)
/*         console.log(openPanels)
 */    }


/*         
        const id = detail.input.id
        const checked = detail.input.checked
        await delegateControl(openPanels, id, checked)
 */

/*         inputsControl(openPanels, topBar)
 *//*         await panelControl(openPanels, topBar)
 */

/*     if (controlType === "delegate") {
        const id = detail.input.id
        const checked = detail.input.checked
        await delegateControl(openPanels, id, checked)
    }
 */}   