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
        containers: "./interface/loadContainers.js",
        listMenu: "./interface/loadListMenu.js"
    }

    let imports = {}
    for (const [key, value] of Object.entries(paths)) { imports[key] = await import(value) }

    const interfaceBoxes = imports.containers.init()
    imports.listMenu.init(interfaceBoxes.panelLeft)
}

const main = async () => {
    await loadStyles()
    loadInterface()
}

main()