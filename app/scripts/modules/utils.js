export const pause = async (time) => {
    await new Promise(resolve => setTimeout(resolve, time))
}

export const sendEvent = (eventName, detail) => {
    document.dispatchEvent(new CustomEvent(eventName, { "detail": detail }))
}
