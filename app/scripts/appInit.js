import { loadListeners } from "./eventsBus.js"

const loadStyles = async () => {
    const path = [
        { rel: "stylesheet", href: "app/styles/globalConf.css" },
        { rel: "stylesheet", href: "app/styles/mainBoxes.css" }
    ]
    return new Promise(resolve => {
        Object.entries(path).forEach((item, num) => {
            const link = document.createElement("link")
            link.setAttribute("rel", item[1].rel)
            link.setAttribute("href", item[1].href)
            document.head.appendChild(link)
            link.onload = () => { if (num === path.length - 1) resolve() }
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

    loadListeners()
    await loadStyles()
    await loadInterface()
}

main()