export class ComponentBase {

    /* CHECK PROPS */
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

    config(defaultData, newData, type, dom = null) {
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


    /* check conf NEW */
    #resumeValues(defaultObj) {
        let resumed = {}
        Object.entries(defaultObj).forEach(([key, value]) => {
            resumed[key] = Array.isArray(defaultObj[key]) ? defaultObj[key][0] : value
        })
        return resumed
    }

    generateConf(defaultConf, newConf, dom) {
        const resumedValues = this.#resumeValues(defaultConf)
        let validation = true
        Object.entries(newConf).forEach(([key, value]) => {
            if (validation) {
                if (!defaultConf[key]) { console.log([dom], [key], "PROP not valid"); validation = false }
                if (defaultConf[key] && typeof (value) !== "string") { console.log([dom], [key, value], "VALUE must be string"); validation = false }
            }
        })
        Object.entries(newConf).forEach(([key, value]) => {
            if (typeof (defaultConf[key]) === "string") resumedValues[key] = value
            if (typeof (defaultConf[key]) === "object") {
                defaultConf[key].includes(value)
                    ? resumedValues[key] = value
                    : console.log([this], [key, value], "VALUE not valid using DEFAULT", [key, resumedValues[key]])
            }
        })
        !validation && console.log(["VALIDATION FAIL"])
        return resumedValues
    }


    /* CONFIGURE CSS */
    toCssVar(obj, dom) { /* old */
        Object.entries(obj).forEach(([key, value]) => {
            dom.style.setProperty(`--${key}`, value)
        })
    }

    objToCssVar(obj, dom) { /* new */
        Object.entries(obj).forEach(([key, value]) => {
            dom.style.setProperty(`--${key}`, value)
        })
    }

    toCssVar2(prop, value, dom) {
        dom.style.setProperty(`--${prop}`, value)
    }

    /* CONFIGURE DOM */
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

    addInput(inputType, box, id = null, name = null, classNames = null) {
        const input = this.add("input", box)
        input.setAttribute("type", inputType)
        id && (input.id = id)
        name && input.setAttribute("name", name)
        classNames && (input.className = classNames)
        box.appendChild(input)
        return input
    }

    updateConf(prop, value, dom) {
        dom.conf[prop] = value
        dom.base.toCssVar2(prop, value, dom)
    }


    /* EVENTS */
    sendEvent(dom, eventName, detail) {
        dom.dispatchEvent(new CustomEvent(eventName, { "detail": detail }))
    }

    /* UTILS */
    getParentInfo(element) {
        const props = getComputedStyle(element)
        let info = {}
        info["width"] = props.width
        info["height"] = props.height
        return info
    }

    convertTransition(transition) { /* old */
        const stringTime = transition.split(" ")[0]
        return stringTime.endsWith("ms")
            ? parseFloat(stringTime)
            : parseFloat(stringTime) * 1000
    }

    transitionTime(transition) { /* new */
        const strings = transition.split(" ")
        const stringTime = strings.find(item => /\d/.test(item))
        return stringTime.endsWith("ms")
            ? parseFloat(stringTime)
            : parseFloat(stringTime) * 1000
    }

    transitionTimeById(id, dom) {
        return this.transitionTime(dom.querySelector(`#${id}`))
    }

    async wait(time_ms) { /* old */
        await new Promise(resolve => setTimeout(resolve, time_ms))
    }

    async time(time) { /* new */
        await new Promise(resolve => setTimeout(resolve, time))
    }

    setAttr(item, object) {
        Object.entries(object).forEach(([key, value]) => {
            item.setAttribute(key, value)
        })
    }

    getNodes(dom) {
        const nodes = Array.from(dom.querySelectorAll("[node]"))
        let obj = {}
        nodes.forEach(item => { obj[item.getAttribute("node")] = item })
        return obj
    }
}