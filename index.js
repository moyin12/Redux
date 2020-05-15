const todos = (state = [], action) => {
    if (action.type === 'ADD_TODO'){
        return state.concat([action.todo])
    }
    return state
}

const createStore = () => {

    // The state
    let state
    let listeners = []

    // Get the state
    const getState = () => state
    
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    return {
        getState
    }
}

