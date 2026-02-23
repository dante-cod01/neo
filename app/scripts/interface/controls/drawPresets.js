import * as dom_helper from "./../../modules/dom.js"

const drawPresets = async (detail, presetsBox) => {
    const presets = (await import(detail.conf.config.presets))

}

const tooglePresetsBox = async (boolean, sections) => {
    console.log("nnnnnn", boolean)
    if (boolean) {
        sections[0].classList.add("configSection_reduced")
        sections[1].classList.add("presetSection_open")
    } else {
        sections[0].classList.remove("configSection_reduced")
        sections[1].classList.remove("presetSection_open")
    }
}

export const control = async (detail, actualComponent) => {
    const configPanel = dom_helper.search("#configPanel")
    const configSection = dom_helper.search("#configSection", configPanel.nodes.node_0)
    const presetsSection = dom_helper.search("#presetsSection", configPanel.nodes.node_0)

    await tooglePresetsBox(detail.open, [configSection, presetsSection])

}