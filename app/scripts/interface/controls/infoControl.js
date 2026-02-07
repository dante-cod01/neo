import * as dom from "../../modules/dom.js"

const animate = async (name) => {
    const nameBar = dom.id("nameBar")
    await nameBar.addText(name)
}

const animateRemove = async () => {
    const nameBar = dom.id("nameBar")
    await nameBar.removeText()
}

export const control = async (detail, lastComponent) => {
    const section = detail.conf.section
    const name = detail.conf.config.name

    lastComponent.name && await animateRemove()
    await animate(name)

    lastComponent.name = name
}