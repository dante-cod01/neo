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
        topPanel: "./interface/loadTopBar.js",
        listMenuPanel: "./interface/loadListPanel.js",
        configMenuPanel: "./interface/loadconfigPanel.js",
    }
    let imports = {}
    for (const [key, value] of Object.entries(paths)) { imports[key] = await import(value) }

    imports.listMenuPanel.init(document.body)
    imports.configMenuPanel.init(document.body)
    imports.topPanel.init(document.body)
}

const main = async () => {
    loadListeners()
    await loadStyles()
    await loadInterface()
}

main()