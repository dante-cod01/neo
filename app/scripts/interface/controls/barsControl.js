import * as dom_helper from "../../modules/dom.js"

const barExpand = (panels, bar, direction) => {
    const openMenu = panels.menuPanel[direction]
    const openConfig = panels.configPanel[direction]

    if (openMenu && openConfig)bar.expand()
    if (!openMenu && openConfig)bar.expand("left", true)
    if (openMenu && !openConfig)bar.expand("right", true)
    if (!openMenu && !openConfig)bar.expand("all", true)
}


export const control = async (detail, panels) => {
    const topBar = dom_helper.search("#topBar", document)
    const bottomBar = dom_helper.search("#bottomBar", document)

    detail.type === "ver" &&barExpand(panels, bottomBar, "ver")
    detail.type === "hor" &&barExpand(panels, topBar, "hor")
}