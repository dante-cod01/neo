export const pause = async (time) => {
    await new Promise(resolve => setTimeout(resolve, time))
}

