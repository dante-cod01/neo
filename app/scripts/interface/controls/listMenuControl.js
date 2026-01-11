import * as element from "../../modules/element.js"
import * as cssHelper from "../../modules/css.js"

const close = async ( ) => {
    console.log("close")
}

const drawInfo = (info) => {

}

export const control = async (info, lastComponent) => {
    lastComponent.tag && await close()

    
    lastComponent.tag = info.tag
/*     if (lastComponent.name && info.name !== lastComponent.name) {
        await close( node, true)
    }
    if (info.name !== lastComponent.name) {
        drawInfo(info, node)
        await close( node, false)
    }

    lastComponent.name = info.name
 */}