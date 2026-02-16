const loadModules = async (loads) => {
    let modules = {}
    for (const [key, value] of Object.entries(loads)) { modules[key] = await import(value) }
    return modules
}

const loadCss = async (modules) => { /* waiting fon style inject */
    await modules.styles.init()
}

const loadInterface = async (modules) => { /* waiting for components return */
    await modules.mainBox.init(document.body)
    await modules.listMenuPanel.init(document.body)
    await modules.configMenuPanel.init(document.body)
    await modules.topBar.init(document.body)
    await modules.bottomBar.init(document.body)
    await modules.titles.init(document.body)
}

const loadBusEvent = async (modules) => {
    modules.eventBus.init()
}

const main = async () => {
    const loads = {
        eventBus: "./eventsBus.js",
        styles: "./interface/loads/loadStylesSheets.js",
        mainBox: "./interface/loads/loadComponentBox.js",
        topBar: "./interface/loads/loadTopBar.js",
        listMenuPanel: "./interface/loads/loadListPanel.js",
        configMenuPanel: "./interface/loads/loadConfigPanel.js",
        bottomBar: "./interface/loads/loadBottomBar.js",
        titles: "./interface/loads/loadTitles.js",
    }

    const modules = await loadModules(loads)
    await loadCss(modules)
    await loadInterface(modules)
    await loadBusEvent(modules)
    /* auto start mode from appConfig*/
    await import("./interface/loads/loadAutoStart.js")
}

main()