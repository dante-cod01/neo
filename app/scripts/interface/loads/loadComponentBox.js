import * as element from "./../../modules/element.js"

export const init = async (box) => {
    const container = element.add("div", box, "componentContainer componentTransform max center relative", "componentContainer")
    const backLayer = element.add("div", container, "backLayer absolute max")
    const blurLayer = element.add("div", container, "blurLayer absolute max")
    const componentBox = element.add("div", box, "componentBox max absolute center", "componentBox")
} 