export const init = async () => {
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