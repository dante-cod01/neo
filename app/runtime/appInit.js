const loadModules = async (loads) => {
    let modules = {}
    for (const [key, value] of Object.entries(loads)) { modules[key] = await import(value) }
    return modules
}

/* interface */
const loadCss = async (loadedInterface) => { /* waiting fon style inject */
    await loadedInterface.styles.init()
}

const loadInterface = async (loadedInterface) => { /* waiting for components return */
    await loadedInterface.mainBox.init(document.body)
    await loadedInterface.listMenuPanel.init(document.body)
    await loadedInterface.configMenuPanel.init(document.body)
    await loadedInterface.topBar.init(document.body)
    await loadedInterface.bottomBar.init(document.body)
    await loadedInterface.titles.init(document.body)
}

/* runtime */
const loadBusEvent = async (loadedRuntime) => {
    loadedRuntime.eventBus.init()
}

const main = async () => {
    const interfaceMods = {
        styles: "../scripts/interface/loads/loadStylesSheets.js",
        mainBox: "../scripts/interface/loads/loadComponentBox.js",
        topBar: "../scripts/interface/loads/loadTopBar.js",
        listMenuPanel: "../scripts/interface/loads/loadListPanel.js",
        configMenuPanel: "../scripts/interface/loads/loadConfigPanel.js",
        bottomBar: "../scripts/interface/loads/loadBottomBar.js",
        titles: "../scripts/interface/loads/loadTitles.js"
    }

    const runtimeMods = {
        eventBus: "./eventsBus.js"
    }

    const loadedInterface = await loadModules(interfaceMods)
    await loadCss(loadedInterface)
    await loadInterface(loadedInterface)

    const loadedRuntime = await loadModules(runtimeMods)
    await loadBusEvent(loadedRuntime)

    /* auto start mode from appConfig*/
    await import("../scripts/interface/loads/loadAutoStart.js")
}

main()