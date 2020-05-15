const createStore = () => {

    // The state
    let state
    let listeners = []

    // Get the state
    const getState = () => state
    
    // Listening to the state changes
    const subscibe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    return {
        getState
    }
}