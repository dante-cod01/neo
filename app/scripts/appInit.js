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

const main = async () => {
    const loads = {
        eventBus: "./eventsBus.js",
        styles: "./interface/loadStylesSheets.js",
        mainBox: "./interface/loadComponentBox.js",
        topBar: "./interface/loadTopBar.js",
        listMenuPanel: "./interface/loadListPanel.js",
        configMenuPanel: "./interface/loadconfigPanel.js",
        info: "./interface/loadInfo.js",
    }

    const modules = await loadModules(loads)
    await loadCss(modules)
    await loadInterface(modules)
    await loadBusEvent(modules)
    /* auto start mode from appConfig*/
    await import("./interface/loadAutoStart.js")
}

main()