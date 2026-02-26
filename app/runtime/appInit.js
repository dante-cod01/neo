const loadModules = async (type, modules) => {
    const imports = []
    const imported = {}
    for (const [name, value] of Object.entries(modules)) {
        console.log(value)
        imports.push(import(value[type]).then(mod => imported[name] = mod))
    }
    await Promise.all(imports)
    return imported
}

/* controls */
const initControls = (loadedControls) => {
    loadedControls.configMenuPanel.control()
}

/* interface */
const loadCss = async (styles) => {
    return new Promise((resolve, reject) => {
        let cssLoaded = 0
        styles.forEach((style) => {
            const link = document.head.appendChild(document.createElement("link"))
            Object.entries(style).forEach(([key, value]) => { link.setAttribute(key, value) })

            link.onload = () => {
                cssLoaded++
                cssLoaded === styles.length && resolve()
            }
            link.onerror = reject
        })
    })
}

const loadInterface = (loadedModules) => {
    loadedModules.configMenuPanel.init(document.body)
}

/* runtime */
const loadRuntime = async (runtimeMods) => {
    const eventBusModule = await import(runtimeMods.eventBus)
    await eventBusModule.init()
}

/* main */
const main = async () => {
    const modules = {
        configMenuPanel: {
            path: "../scripts/interface/components/panel_config.js",
            control: "../scripts/interface/components_controls/panel_config_control.js"
        }
    }

    const styles = [
        { id: "globalConf", rel: "stylesheet", href: "app/styles/globalConf.css" },
        { id: "mainBoxes", rel: "stylesheet", href: "app/styles/mainBoxes.css" }
    ]

    const runtimeMods = {
        eventBus: "./eventsBus.js"
    }

    await loadCss(styles) /* important contains vars - FIRST at load */
    await loadRuntime(runtimeMods)

    const [loadedControls, loadedModules] = await Promise.all([
        loadModules("control", modules),
        loadModules("path", modules),
    ])

    initControls(loadedControls)
    loadInterface(loadedModules)

    /* last load */
/*     import("../scripts/interface/loads/loadAutoStart.js")
 */ }

main()