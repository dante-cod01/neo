export class ComponentBase {

    #convertToObj(defaultObj) {
        let newObj = {}
        Object.entries(defaultObj).forEach(([key, value]) => {
            newObj[key] = Array.isArray(defaultObj[key])
                ? defaultObj[key][0]
                : value
        })
        return newObj
    }

    isValidProp(prop, defaultData) {
        return prop in defaultData
    }

    isValidValue(value, defaultProp, type) {
        let result = false
        if (type === "css" || type === "props") { result = typeof (value) === typeof (defaultProp) ? true : false }
        if (type === "logic") result = typeof (value) === "string" ? true : false
        return result
    }

    #toCssVar(style, varCss, value) {
        style.setProperty(`--${varCss}`, value)
    }

    updateVar(varCss, value, dom) {
        dom.style.setProperty(`--${varCss}`, value)
    }

    config(defaultData, newData, type, style = null) {
        let checked = this.#convertToObj(defaultData)
        if (Object.entries(newData).length) {
            Object.entries(newData).forEach(([key, value]) => {
                if (!this.isValidProp(key, defaultData)) {
                    console.log({ type }, key, "not valid")
                    return
                }
                if (!this.isValidValue(value, defaultData[key], type)) console.log({ type }, key, "value not valid using default")
                if (type === "css") this.#toCssVar(style, key, value);
                checked[key] = value
            })
        }
        return checked
    }

    add(tag, box, classN = null, id = null) {
        const element = document.createElement(tag)
        classN && (element.className = classN)
        id && (element.id = id)
        box.appendChild(element)
        return element
    }

    addLink(dom, rel, href) {
        const link = document.createElement("link")
        link.setAttribute("rel", rel)
        link.setAttribute("href", href)
        dom.appendChild(link)

        const previousLink = Array.from(document.head.querySelectorAll("link")).some(item => item.getAttribute("href") === href)
        if (!previousLink) {
            const globalLink = link.cloneNode()
            document.head.appendChild(globalLink)
        }
    }

    getParentInfo(element) {
        const props = getComputedStyle(element)
        let info = {}
        info["width"] = props.width
        info["height"] = props.height
        return info
    }

    convertTransition(transition) {
        const stringTime = transition.split(" ")[0]
        return stringTime.endsWith("ms")
            ? parseFloat(stringTime)
            : parseFloat(stringTime) * 1000
    }

    async wait(time_ms) {
        await new Promise(resolve => setTimeout(resolve, time_ms))
    }

    setAttr(item, object) {
        Object.entries(object).forEach(([key, value]) => {
            item.setAttribute(key, value)
        })
    }
}