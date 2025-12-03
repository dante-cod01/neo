const listMenuEvents = () => {
    document.addEventListener("listMenu", (e) => {
        const type = e.detail.type
        const value = e.detail.value

        if (type === "open_W") {
            const topBar = document.getElementById("topBar")
            topBar.expand(false)
        }
        if (type === "close_H") {
            const topBar = document.getElementById("topBar")
            topBar.expand(true, "left")
        }
        if (type === "select") {
            console.log("select", value)
        }
    })
}

export const loadListeners = () => {
    listMenuEvents()
}