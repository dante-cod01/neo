export const waiting = async (time) => {
    await new Promise (resolve => setTimeout(resolve, time))
}

export const getTimeById = (id) => {
    const transition = window.getComputedStyle(document.getElementById(id)).transition
    const time = transition.split(" ")[0]
    return time.endsWith("ms") ? parseFloat(time) : parseFloat(time) * 1000
}