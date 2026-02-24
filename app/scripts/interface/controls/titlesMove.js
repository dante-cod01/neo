import * as dom_helper from "./../../modules/dom.js"

const moveTitlesBox = async (boolean) => {
    const titlesBox = dom_helper.search("#titlesBox")
    boolean ? titlesBox.classList.add("titlesBox_left") : titlesBox.classList.remove("titlesBox_left")
}

export const control = async (detail) => {
    detail.ver === false && await moveTitlesBox(true)
    detail.ver === true && await moveTitlesBox(false)
}