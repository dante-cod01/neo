const delegateControl = async (input) => {
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
        menucloseInput.checked = input.checked ? true : false
        menuPanel.tooglePanel(input.checked)
        configcloseInput.checked = input.checked ? true : false
        configPanel.tooglePanel(input.checked)
    }
}

export const control = async (openPanels, detail) => {
    console.log(detail)
    if (detail.input) {
        openPanels[detail.input.id] = !detail.input.checked
        delegateControl(detail.input)
    }
}   