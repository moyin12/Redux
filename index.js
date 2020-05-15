// Library code
const createStore = (reducer) => {

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

    //update the state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}
// App code
const todos = (state = [], action) => {
    if (action.type === 'ADD_TODO'){
        return state.concat([action.todo])
    }
    return state
}


