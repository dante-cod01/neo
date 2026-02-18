import * as dom_helper from "./../../modules/dom.js"

export const init = async (box) => {
    const container = dom_helper.add("div", box, "componentContainer componentTransform max center relative", "componentContainer")
    const backLayer = dom_helper.add("div", container, "backLayer absolute max")
    const lightLayer = dom_helper.add("div", container, "lightLayer absolute max")
    const blurLayer = dom_helper.add("div", container, "blurLayer absolute max")
    const componentBox = dom_helper.add("div", container, "componentBox max absolute center", "componentBox")
} 