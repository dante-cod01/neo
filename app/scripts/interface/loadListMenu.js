import * as element from "./../modules/element.js"
import * as json from "./../modules/json.js"

const magicBox = async (box) => {
    /* magic-box component */
    const dependency = (await import("./../components/class/componentBase.js")).ComponentBase

    const props = {
        closeButtom: true,
        bottomBar: true,
    }

    const css = {
        panelWidth: getComputedStyle(document.documentElement).getPropertyValue("--panelList_width"),
        panelHeight: getComputedStyle(document.documentElement).getPropertyValue("--panelsHeight"),
        panelBorderRadius: "6px",
        topBar_H: "30px",
        topBarBack: "rgba(255, 255, 255, 0.5)",
        titleFont: "Anta",
        titleFontSize: "14px",
        titleColor: "rgb(60,60,60)",
        titleIndent: "20px",
        closeIconSize: "16px",
        closeColor: "rgb(60,60,60)",
        nodeBack: "transparent",
        bottomBar_H: "30px",
        bottomBarBack: "rgba(255, 255, 255, 0.5)",
        transition: getComputedStyle(document.documentElement).getPropertyValue("--panel_transition")
    }

    const logic = {
        panelSide: "left",
        title: "Components",
        titleFontHref: "https://fonts.googleapis.com/css2?family=Anta&display=swap",
        closeIcon: "menu",
    }

    await import("./../components/nano/magicBox.js")
    const magicBox = element.add("magic-box", "panelMenu panelLeft")
    element.insert(magicBox, box, { "css": JSON.stringify(css), "logic": JSON.stringify(logic) }, props)
    magicBox.dependency = new dependency()
    return magicBox.node
}

const dynamicList = async (box) => {
    /* dynamic-list component */
    const dependency = (await import("./../components/class/componentBase.js")).ComponentBase

    const props = {

    }
    
    const css = {
        back: "transparent",
        paddingHor: "4px",
        paddingVer: "0",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: "10px",
        borderRadius: "12px"
    }

    const logic = {

    }

    await import("./../components/nano/dynamicList.js")
    const dynamicList = element.add("dynamic-list")
    element.insert(dynamicList, box, {"css": JSON.stringify(css)}, props)

    const dataList = await json.get("./app/config/components/list.json")
    dynamicList.dependency = new dependency()
    dynamicList.dependency = new dependency()
    dynamicList.dependency = new dependency()
    dynamicList.data = dataList
}

export const init = async (box) => {
    const magicBoxNode = await magicBox(box)
/*     const list = await dynamicList(magicBoxNode)
 */}