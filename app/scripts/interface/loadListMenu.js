import * as element from "./../modules/element.js"
import * as json from "./../modules/json.js"

const magicBox = async (box) => {
    /* magic-box component */
    const component = await import("./../components/nano/magicBox.js")
    const dependency = (await import("./../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const configProps = {
        closeButtom: true,
        bottomBar: true,
    }

    const configCss = {
        panelWidth: getComputedStyle(document.documentElement).getPropertyValue("--panelList_width"),
        panelHeight: getComputedStyle(document.documentElement).getPropertyValue("--panelsHeight"),
        panelRadius: "6px",
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

    const configLogic = {
        panelSide: "right",
        panelSide: "left",
        title: "Components",
        titleFontHref: componentFont_Href,
        closeIcon: "menu",
    }

    const magicBox = element.add(component.tag, box, "panelMenu panelLeft")
    magicBox.entryProps = configProps
    magicBox.entryCss = configCss
    magicBox.entryLogic = configLogic
    magicBox.addDependency(new dependency())

/*     await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("configurando")
    magicBox.update("topBarBack", "red")
    return magicBox.node
 */}

const dynamicList = async (box) => {
    /* dynamic-list component */
    const component = await import("./../components/nano/dynamicList.js")
    const dependency = (await import("./../components/class/componentBase.js")).ComponentBase
    const componentFont_Href = "https://fonts.googleapis.com/css2?family=Anta&display=swap"

    const props = {

    }

    const css = {
        back: "transparent",
        backSelected1: "rgba(50, 173, 255, 0.4)",
        backSelected2: "rgba(37, 188, 196, 0.4)",
        backSelected3: "rgba(255, 255, 255, 0.4)",
        pointerColor: "rgba(30, 196, 218, 1)",
        colorDefault: "rgba(153, 153, 153, 1)",
        colorSelected1: "whitesmoke",
        colorSelected2: "whitesmoke",
        paddingHor: "4px",
        paddingVer: "0",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: "10px",
        borderRadius: "4px",
        sectionBack: "rgba(0, 0, 0, 0.6)",
        title_H: "26px",
        titleFont: "Anta",
        titleFontSize: "13px",
        titleColor: "rgb(200, 200, 200)",
        listItem_H: "24px",
        transition: "400ms ease-in-out",
    }

    const logic = {
        sectionTitle_fontHref: componentFont_Href,
    }

    const dynamicList = element.add(component.tag)
    element.insert(dynamicList, box, { "css": JSON.stringify(css) }, props)
    dynamicList.dependency = new dependency()

    const dataList = await json.get("./app/config/components/list.json")
    dynamicList.newData = dataList
    return dynamicList
}

export const init = async (box) => {
    const magicBoxNode = await magicBox(box)
    /*     const list = await dynamicList(magicBoxNode)
     */

}