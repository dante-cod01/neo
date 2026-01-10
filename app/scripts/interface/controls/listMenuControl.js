import * as element from "../../modules/element.js"
import * as cssHelper from "../../modules/css.js"
import { FlashText } from "../../components/nano/flashTitles.js"

const close = async (infoBar, node, boolean) => {
    const time = cssHelper.convertTransition(cssHelper.getVar("normal_transition"))
    infoBar.updateProp("box_width", boolean ? "0px" : "500px")
    await new Promise(resolve => setTimeout(resolve, time))
    boolean && (node.innerHTML = "")
}

const drawInfo = (info, node) => {
/*     const nodeStyle = element.add("style", infoBar.shadowRoot)
    nodeStyle.textContent += `
        .titlesBox {
            width: 100%;
            height: 100%;
            overFlow: hidden;
            border: 1px solid red;

            .componentTitles {
                width: 100%;
                font-family: var(--componentTitles_fontFamily);
                color: red;
            }
        } 
    `
 */
    const titlesBox = element.add("div", node, "titlesBox", "titlesBox")

    const typeTitle = element.add(FlashText.tag, titlesBox)

    const title = element.add(FlashText.tag, titlesBox)

}

export const control = async (info, lastComponent) => {
    const infoBar = document.getElementById("infoBar")
    const node = infoBar.nodes.node_0

    if (lastComponent.name && info.name !== lastComponent.name) {
        await close(infoBar, node, true)
    }
    if (info.name !== lastComponent.name) {
        drawInfo(info, node)
        await close(infoBar, node, false)
    }

    lastComponent.name = info.name
}