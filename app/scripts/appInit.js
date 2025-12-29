import { loadListeners } from "./eventsBus.js"

const loadStyles = async () => {
    const path = [
        { id: "globalConf", rel: "stylesheet", href: "app/styles/globalConf.css" },
        { id: "mainBoxes", rel: "stylesheet", href: "app/styles/mainBoxes.css" }
    ]

    return new Promise(resolve => {
        let cssLoaded = 0

        path.forEach((style, num) => {
            const link = document.createElement("link")
            document.head.appendChild(link)

            Object.entries(style).forEach(([key, value]) => { link.setAttribute(key, value) })

            link.onload = () => {
                cssLoaded++
                cssLoaded === path.length && resolve()
            }
        })
    })
}

const loadInterface = async () => {
    const paths = {
        mainBox: "./interface/loadComponentBox.js",
        topPanel: "./interface/loadTopBar.js",
        listMenuPanel: "./interface/loadListPanel.js",
        configMenuPanel: "./interface/loadconfigPanel.js",
    }

    let componentsImported = {}
    for (const [key, value] of Object.entries(paths)) { componentsImported[key] = await import(value) }
    componentsImported.mainBox.init(document.body)
    componentsImported.listMenuPanel.init(document.body)
    componentsImported.configMenuPanel.init(document.body)
    componentsImported.topPanel.init(document.body)
}

const main = async () => {
    await loadListeners()

    await loadStyles()
    await loadInterface()

}

main()