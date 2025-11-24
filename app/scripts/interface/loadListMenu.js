import * as element from "./../modules/element.js"
import * as json from "./../modules/json.js"

const magicBox = async (box) => {
    /* magic-box component */
    const component = await import("./../components/nano/magicBox.js")
    const dependency = (await import("./../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

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
        closeIconSize: "16px",
        closeColor: "rgb(60,60,60)",
        nodeBack: "transparent",
        bottomBar_H: "30px",
        bottomBarBack: "rgba(255, 255, 255, 0.5)",
        transition: getComputedStyle(document.documentElement).getPropertyValue("--panel_transition")
    }

    const logic = {
        panelSide: "right",
        panelSide: "left",
        title: "Components",
        titleFontHref: componentFont_Href,
        closeIcon: "menu",
    }

    const magicBox = element.add(component.tag, "panelMenu panelLeft")
    element.insert(magicBox, box, { "css": JSON.stringify(css), "logic": JSON.stringify(logic) }, props)
    magicBox.dependency = new dependency()
    return magicBox.node
}

const dynamicList = async (box) => {
    /* dynamic-list component */
    const component = await import("./../components/nano/dynamicList.js")
    const dependency = (await import("./../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const props = {

    }

    const css = {
        back: "transparent",
        backSelected1: "rgba(255, 255, 255, 0.6)",

        pointerSelected1: "rgba(27, 126, 139, 1)",

        colorSelected1: "rgb(60, 60, 60)",
        paddingHor: "4px",
        paddingVer: "0",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: "10px",
        borderRadius: "12px",
        listBorderWidth: "6px",
        sectionBack: "rgba(0, 0, 0, 0.6)",
        title_H: "30px",
        titleFont: "Anta",
        titleFontSize: "13px",
        titleColor: "rgb(200, 200, 200)",
        listItem_H: "24px",
        transition: "500ms ease-in-out"
    }

    const logic = {
        sectionTitle_fontHref: componentFont_Href,
    }

    const dynamicList = element.add(component.tag)
    element.insert(dynamicList, box, { "css": JSON.stringify(css) }, props)
    dynamicList.dependency = new dependency()

    const dataList = await json.get("./app/config/components/list.json")
    dynamicList.newData = dataList
}

export const init = async (box) => {
    const magicBoxNode = await magicBox(box)
    const list = await dynamicList(magicBoxNode)
}