const createStore = () => {

    // The state
    let state

    // Get the state
    const getState = () => state

    return {
        getState
    }
}