const listMenuEvents = () => {
    document.addEventListener("listMenu", (e) => {
        const type = e.detail.type
        const value = e.detail.value
        if (type === "close_H") {
            console.log("close_H", value)
        }
        if (type === "close_W") {
            console.log("close_W", value)
        }
        if( type === "select") {
            console.log("select", value)
        }
    })
}

export const loadListeners = () => {
    listMenuEvents()
}