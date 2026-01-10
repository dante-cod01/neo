const loadModules = async (loads) => {
    let modules = {}
    for (const [key, value] of Object.entries(loads)) { modules[key] = await import(value) }
    return modules
}

const loadCss = async (modules) => {
    await modules.styles.init()
}

const loadInterface = async (modules) => {
    modules.mainBox.init(document.body)
    modules.listMenuPanel.init(document.body)
    modules.configMenuPanel.init(document.body)
    modules.topBar.init(document.body)
    modules.infoBar.init(document.body)
}

const loadBusEvent = (modules) => {
    modules.eventBus.init()
}

const main = async () => {
    const loads = {
        eventBus: "./eventsBus.js",
        styles: "./interface/loadStylesSheets.js",
        mainBox: "./interface/loadComponentBox.js",
        topBar: "./interface/loadTopBar.js",
        listMenuPanel: "./interface/loadListPanel.js",
        configMenuPanel: "./interface/loadconfigPanel.js",
        infoBar: "./interface/loadINfoBar.js"
    }

    const modules = await loadModules(loads)
    await loadCss(modules)
    await loadInterface(modules)
    loadBusEvent(modules)
}

main()