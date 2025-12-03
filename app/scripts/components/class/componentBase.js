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
        if (type === "config" || type === "css") { result = typeof (value) === typeof (defaultProp) ? true : false }
        if (type === "logic") result = typeof (value) === "string" ? true : false
        return result
    }

    addCssVars(obj, dom) {
        Object.entries(obj).forEach(([key, value]) => {
            dom.style.setProperty(`--${key}`, value)
        })
    }

    update(dom, prop, value, objects, types) {
        let obj
        let objType
        const index = objects.findIndex(item => this.isValidProp(prop, item))
        obj = index < 0 ? false : objects[index]

        if (!obj) {
            console.log({ prop }, "not valid")
            return
        }

        objType = types[index]

        if (this.isValidValue(value, obj[prop], objType)) {
            obj[prop] = value
            objType === "css" && (this.addCssVars({[prop]: value}, dom))
        } else {
            console.log("update not valid value", { prop })
        }
    }

    config(defaultData, newData, type, dom = null) {
        let checked = this.#convertToObj(defaultData)

        if (Object.entries(newData).length) {
            Object.entries(newData).forEach(([key, value]) => {
                if (!this.isValidProp(key, defaultData)) {
                    console.log({ type }, key, "not valid", {dom})
                    return
                }
                if (!this.isValidValue(value, defaultData[key], type)) {
                    console.log({ type }, key, "value not valid using default")
                }
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

    getNodes = (dom) => {
        const nodes = Array.from(dom.querySelectorAll("[node]"))
        let obj = {}
        nodes.forEach(item => { obj[item.getAttribute("node")] = item })
        return obj
    }

    sendEvent(dom, eventName, detail) {
        dom.dispatchEvent(new CustomEvent(eventName, {"detail": detail}))
    }
}