const loadModules = async (loads) => {
    let modules = {}
    for (const [key, value] of Object.entries(loads)) { modules[key] = await import(value) }
    return modules
}

const loadCss = async (modules) => {
    await modules.styles.init()
}

const loadInterface = async (modules) => {
    await modules.mainBox.init(document.body)
    await modules.info.init(document.body)
    await modules.listMenuPanel.init(document.body)
    await modules.configMenuPanel.init(document.body)
    await modules.topBar.init(document.body)
}

const loadBusEvent = async (modules) => {
    modules.eventBus.init()
}

const defaultComponent = async () => {
    const listItems = document.getElementById("menuPanel").nodes.node_0.children[0]
    listItems.items.section_0.sectionInput.checked = true
    listItems.items.section_0.sectionInput.dispatchEvent(new CustomEvent("change"))
    await new Promise(resolve => setTimeout(resolve, 1000))
    listItems.items.section_0.itemsInput[0].checked = true
    listItems.items.section_0.itemsInput[0].dispatchEvent(new CustomEvent("change"))
}

const main = async () => {
    const loads = {
        eventBus: "./eventsBus.js",
        styles: "./interface/loadStylesSheets.js",
        mainBox: "./interface/loadComponentBox.js",
        topBar: "./interface/loadTopBar.js",
        listMenuPanel: "./interface/loadListPanel.js",
        configMenuPanel: "./interface/loadconfigPanel.js",
        info: "./interface/loadInfo.js"
    }

    const modules = await loadModules(loads)
    await loadCss(modules)
    await loadInterface(modules)
    await loadBusEvent(modules)
    await new Promise(resolve => { setTimeout(resolve, 1000) })
    defaultComponent()
}

main()