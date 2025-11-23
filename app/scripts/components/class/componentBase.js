export class ComponentBase {

    loadConfig(attributes, defaultConf) {
        let config = structuredClone(defaultConf)

        Object.entries(attributes).forEach(([prop, attributeValue]) => {
            const propValid = prop in config
            const defaultValueArray = Array.isArray(config[prop])
            const attributeValid = typeof (attributeValue) === "string"

            if (!propValid || !attributeValid) {
                console.log({ attributeValue }, "not permited skipping")
                return
            }

            if (defaultValueArray) {
                const validValue = config[prop].includes(attributeValue)
                const defaultValue = config[prop][0]
                !validValue && console.log({ attributeValue }, "not valid value using default", { defaultValue })
                config[prop] = validValue ? attributeValue : config[prop][0]
            } else {
                config[prop] = attributeValue
            }
        })

        Object.entries(config).forEach(([prop, value]) => { if (Array.isArray(value)) config[prop] = value[0] })
        return config
    }

    toCssVar(style, obj) {
        Object.entries(obj).forEach(([prop, value]) => { style.setProperty(`--${prop}`, value) })
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
}