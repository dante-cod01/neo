export const viewControl = (par) => {
    let view
    let fullState
    
    par === 1 && (view = "computer")
    par === 2 && (view = "tablet")
    par === 3 && (view = "mobile")
    par === 4 && (view = "rotate")
    par === 5 && (view = "full")

    let width
    let height
    let radius = 0

    if (view === "computer") {
        width = window.innerWidth + "px"
        height = window.innerHeight + "px"
        radius = 0
    }

    if (view === "tablet") {
        height = window.innerHeight * 0.8 + "px"
        width = (window.innerHeight * 0.8) * 16 / 9 + "px"
        radius = 16
    }

    if (view === "mobile") {
        height = window.innerHeight * 0.8 + "px"
        width = (window.innerHeight * 0.8) * 9 / 16 + "px"
        radius = 16
    }

    const componentBox = document.getElementById("componentBox")

    if (par >= 1 && par <= 3) {
        componentBox.updateProp("box_width", width)
        componentBox.updateProp("box_height", height)
        componentBox.updateProp("box_radius", radius + "px")
    }
}