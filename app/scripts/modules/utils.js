export const waitingTime = async (time) => {
    await new Promise (resolve => setTimeout(resolve, time))
}