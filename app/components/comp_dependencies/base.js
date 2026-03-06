export default class Base {

    /* GENERATE CONF & LOGIC */
    #resumeValues(obj) {
        let resumed = {}
        Object.entries(obj).forEach(([key, value]) => {
            resumed[key] = Array.isArray(obj[key]) ? obj[key][0] : value
        })
        return resumed
    }

    #generateSimple(dom) {
        const resumedCss = this.#resumeValues(dom.defaultCss)
        Object.entries(dom.newCss).forEach(([key, value]) => {
            !dom.defaultCss[key] && console.error([dom], [key], "PROP not valid")
            if (dom.defaultCss[key] && typeof (value) !== "string") { console.error([dom], "VALUE must be string →", [key, value]) }
        })
        Object.entries(dom.newCss).forEach(([key, value]) => {
            if (typeof (dom.defaultCss[key]) === "string") resumedCss[key] = value
            if (typeof (dom.defaultCss[key]) === "object") {
                dom.defaultCss[key].includes(value)
                    ? resumedCss[key] = value
                    : console.error([this], [key, value], "VALUE not valid using DEFAULT", [key, resumedCss[key]])
            }
        })
        return resumedCss
    }

    #generateLogic(dom) {
        const resumedLogic = this.#resumeValues(dom.defaultLogic)
        if (dom.newLogic) {
            Object.keys(dom.newLogic).forEach(key => { !resumedLogic[key] && console.error([dom], [key], "PROP not valid") })
            Object.entries(dom.newLogic).forEach(([key, value]) => {
                dom.defaultLogic[key].includes(value) && (resumedLogic[key] = value)
                !dom.defaultLogic[key].includes(value) && console.error([dom], "\n", "LOGIC using default →", [key, resumedLogic[key]])
            })
        }
        return resumedLogic
    }

    generateConf(dom) {
        let finalConf = {}
        !dom.newCss && console.warn(dom, "no newCss using default")
        finalConf.css = !dom.newCss ? dom.defaultCss : this.#generateSimple(dom)
        this.objToCssVar(finalConf.css, dom)

        dom.defaultLogic && (finalConf.logic = this.#generateLogic(dom))
        return finalConf
    }

    /* CONFIGURE CSS */
    objToCssVar(obj, dom) { /* new */
        Object.entries(obj).forEach(([key, value]) => {
            dom.style.setProperty(`--${key}`, value)
        })
    }

/*     cssVar(cssVar, value, dom) {
        dom.style.setProperty(`--${cssVar}`, value)
    }
 */
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

    addLinks(links, dom) {
        links.forEach(item => {
            if (item.type === "font") {
                this.#createFontLink(item.href, dom)
                if (!document.head.querySelector(`link[rel="stylesheet"][href="${item.href}"]`))
                    this.#createFontLink(item.href, document.head)
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
            this.cssVar(prop, value, dom)
        }
/*         if (prop in dom.logic) {
            dom.logic[prop] = value
        }
 */    }

    /* EVENTS */
    sendEvent(dom, eventName, detail) {
        dom.dispatchEvent(new CustomEvent(eventName, { "detail": detail }))
    }

    /* UTILS */
    addHiddenInput(type, dom, classes = null, id = null) {
        const input = this.add("input", dom, classes || null, id || null)
        input.type = type === "radio" ? "radio" : "checkbox"
        return input
    }

/*     #transitionTime(transition) {
        const strings = transition.split(" ")
        const stringTime = strings.find(item => /\d/.test(item))
        return stringTime.endsWith("ms")
            ? [parseFloat(stringTime), "s"]
            : [parseFloat(stringTime) * 1000, "ms"]
    }

    #transitionTimeById(id, dom) {
        return this.#transitionTime(dom.querySelector(`#${id}`))
    }

    async pause(time) {
        await new Promise(resolve => setTimeout(resolve, time))
    }
 */}