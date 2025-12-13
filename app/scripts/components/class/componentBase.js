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

    isValidValue(value, defaultProp) {
        if (typeof (value) === typeof (defaultProp)) return true
        if (typeof (defaultProp) === "object" && defaultProp.includes(value)) return true
        return false
    }

    cssVar(obj, dom) {
        Object.entries(obj).forEach(([key, value]) => {
            dom.style.setProperty(`--${key}`, value)
        })
    }

    updateProp(css, prop, value, dom) {
        const valid = this.isValidProp(prop, css)
        if (valid) {
            css[prop] = value
            this.cssVar({ [prop]: value }, dom)
        } else {
            console.log({ prop }, "not valid")
        }
    }

    config = (defaultData, newData, type, dom = null) => {
        let out = this.#convertToObj(defaultData)
        if (Object.entries(newData).length) {
            Object.entries(newData).forEach(([key, value]) => {
                if (!this.isValidProp(key, defaultData)) {
                    console.log({ type }, key, "not valid", { dom })
                    return
                }
                if (!this.isValidValue(value, defaultData[key], type)) {
                    console.log({ type }, key, "value not valid using default")
                }
                out[key] = value
            })
        }
        return out
    }

    add(tag, box, classN = null, id = null) {
        const element = document.createElement(tag)
        classN && (element.className = classN)
        id && (element.id = id)
        box.appendChild(element)
        return element
    }

    addLinks(dom, links) {
        if (!links) return
        const loadedLinks = Array.from(document.head.querySelectorAll("link"))

        links.forEach(item => {
            if (item.type === "font") {
                const link = document.createElement("link")
                link.setAttribute("rel", "stylesheet")
                link.setAttribute("href", item.href)
                dom.appendChild(link)

                const previousLink = loadedLinks.some(item => item.getAttribute("href") === item.href)
                if (!previousLink) {
                    const globalLink = link.cloneNode()
                    document.head.appendChild(globalLink)
                }
            }
        })
    }

    addInput = (inputType, box, id = null, name = null, classNames = null) => {
        const input = this.add("input", box)
        input.setAttribute("type", inputType)
        id && (input.id = id)
        name && input.setAttribute("name", name)
        classNames && (input.className = classNames)
        box.appendChild(input)
        return input
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
        dom.dispatchEvent(new CustomEvent(eventName, { "detail": detail }))
    }
}