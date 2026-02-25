export default class Base {

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


    /* GENERATE CONF & LOGIC */
    #resumeValues(defaultObj) {
        let resumed = {}
        Object.entries(defaultObj).forEach(([key, value]) => {
            resumed[key] = Array.isArray(defaultObj[key]) ? defaultObj[key][0] : value
        })
        return resumed
    }

    generateConf(defaultConf, newConf, dom) {
        const resumedConf = this.#resumeValues(defaultConf)
        Object.entries(newConf).forEach(([key, value]) => {
            !defaultConf[key] && console.log([dom], [key], "PROP not valid")
            if (defaultConf[key] && typeof (value) !== "string") { console.log([dom], "VALUE must be string →", [key, value]) }
        })
        Object.entries(newConf).forEach(([key, value]) => {
            if (typeof (defaultConf[key]) === "string") resumedConf[key] = value
            if (typeof (defaultConf[key]) === "object") {
                defaultConf[key].includes(value)
                    ? resumedConf[key] = value
                    : console.log([this], [key, value], "VALUE not valid using DEFAULT", [key, resumedConf[key]])
            }
        })
        return resumedConf
    }

    generateLogic(defaultLogic, newLogic, dom) {
        const resumedLogic = this.#resumeValues(defaultLogic)
        Object.keys(newLogic).forEach(key => {
            if (!defaultLogic[key]) {
                console.log([dom], [key], "PROP not valid")
            }
        })
        Object.entries(newLogic).forEach(([key, value]) => {
            defaultLogic[key].includes(value)
                ? resumedLogic[key] = value
                : console.log([dom], "\n", "BOOLEAN using default →", [key, resumedLogic[key]])
        })
        return resumedLogic
    }


    /* CONFIGURE CSS */
    objToCssVar(obj, dom) { /* new */
        Object.entries(obj).forEach(([key, value]) => {
            dom.style.setProperty(`--${key}`, value)
        })
    }

    toCssVar(cssVar, value, dom) {
        dom.style.setProperty(`--${cssVar}`, value)
    }

    /* CONFIGURE DOM */
    add(tag, box, classN = null, id = null) {
        const element = document.createElement(tag)
        classN && (element.className = classN)
        id && (element.id = id)
        box.appendChild(element)
        return element
    }

    #createFontLink(href, dom) {
        const link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", href)
        dom.appendChild(link)
    }

    addLinks(dom, links) {
        if (!links) return

        links.forEach(item => {
            if (item.type === "font") {
                this.#createFontLink(item.href, dom)
                if (!document.head.querySelector(`link[rel="stylesheet"][href="${item.href}"]`)) this.#createFontLink(item.href, document.head)
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
        if (prop in dom.css) {
            dom.css[prop] = value
            dom.base.toCssVar2(prop, value, dom)
        }
        if (prop in dom.logic) {
            dom.logic[prop] = value
        }
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

    transitionTime2(transition) { /* renew */
        const strings = transition.split(" ")
        const stringTime = strings.find(item => /\d/.test(item))
        return stringTime.endsWith("ms")
            ? [parseFloat(stringTime), "s"]
            : [parseFloat(stringTime) * 1000, "ms"]
    }

    transitionTimeById(id, dom) {
        return this.transitionTime(dom.querySelector(`#${id}`))
    }

    async pause(time) { 
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