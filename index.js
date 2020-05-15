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
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO' :
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
            return state.map((todo) => todo.item !== action.id ? todo
            : Object.assign({}, todo, {complete: !todo.complete }))
        default :
            return state
    }
}

const goals = (state = [], action) => {
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

const app = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

const store = createStore(app)
store.subscribe(() => {
    console.log(`The new state is: ${store.getState()}`)
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
       id: 0,
       name: 'Learn Redux',
       complete: false, 
    }
})