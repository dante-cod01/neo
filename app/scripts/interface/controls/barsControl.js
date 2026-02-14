import * as dom_helper from "../../modules/dom.js"

const barExpand = async (panels, bar, direction) => {
    const openMenu = panels.menuPanel.state[direction]
    const openConfig = panels.configPanel.state[direction]

    if (openMenu && openConfig) bar.expand("all", false)
    if (!openMenu && openConfig) bar.expand("left", true)
    if (openMenu && !openConfig) bar.expand("right", true)
    if (!openMenu && !openConfig) bar.expand("all", true)
    await new Promise(resolve => setTimeout(resolve, 2444))
}

export const control = async (detail, panels) => {
    const topBar = dom_helper.search("#topBar", document)
    const bottomBar = dom_helper.search("#bottomBar", document)

    "ver" in detail && barExpand(panels, bottomBar, "ver")
    "hor" in detail && barExpand(panels, topBar, "hor")
}