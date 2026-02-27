const loadModules = async (modules) => {
    const imports = []
    const imported = {}
    for (const [name, value] of Object.entries(modules)) {
        imported[name] = {}
        imports.push(import(value.path).then(mod => imported[name].init = mod.init))
        imports.push(import(value.control).then(mod => imported[name].control = mod.control))
    }
    await Promise.all(imports)
    return imported
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

const loadInterface = async (loadedModules) => {
    await loadedModules.panelMenu.init(document.body)
    loadedModules.panelMenu.control()
    await loadedModules.panelConfig.init(document.body)
    loadedModules.panelConfig.control()
}

/* runtime */
const loadRuntime = async (runtimeMods) => {
    const eventBusModule = await import(runtimeMods.eventBus)
    await eventBusModule.init()
}

/* main */
const main = async () => {
    const styles = [
        { id: "globalConf", rel: "stylesheet", href: "app/styles/globalConf.css" },
        { id: "mainBoxes", rel: "stylesheet", href: "app/styles/mainBoxes.css" }
    ]

    const modules = {
        panelMenu: {
            path: "../scripts/interface/components_composites/panelMenu.js",
            control: "../scripts/interface/components_controls/panelMenu_control.js"
        },
        panelConfig: {
            path: "../scripts/interface/components_composites/panelConfig.js",
            control: "../scripts/interface/components_controls/panelConfig_control.js"
        }
    }

    const runtimeMods = {
        eventBus: "./eventsBus.js"
    }

    await loadCss(styles) /* important contains vars - FIRST at load */
    const loadedModules = await loadModules(modules)
    loadInterface(loadedModules)

    /*     await loadRuntime(runtimeMods)
     */
    /* last load */
/*     import("../scripts/interface/loads/loadAutoStart.js")
 */ }

main()