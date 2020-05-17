const generateId = () => {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// Library Code
const createStore = (reducer) => {
  
    //The state
    let state
    let listeners = []
  
    //Get the state
    const getState = () => state
  
    const subscribe = (listener) => {
      listeners.push(listener)
      return () => {
        listeners = listeners.filter((l) => l !== listener)
      }
    }
  
    // Update the state
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
  
  // App Code
  const ADD_TODO = 'ADD_TODO'
  const REMOVE_TODO = 'REMOVE_TODO'
  const TOGGLE_TODO = 'TOGGLE_TODO'
  const ADD_GOAL = 'ADD_GOAL'
  const REMOVE_GOAL = 'REMOVE_GOAL'
  
  const addTodoAction = (todo) => {
    return {
      type: ADD_TODO,
      todo,
    }
  }
  
  const removeTodoAction = (id) => {
    return {
      type: REMOVE_TODO,
      id,
    }
  }
  
  const toggleTodoAction = (id) => {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }
  
  const addGoalAction = (goal) => {
    return {
      type: ADD_GOAL,
      goal,
    }
  }
  
  const removeGoalAction = (id) => {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }
  
  const todos = (state = [], action) => {
    switch(action.type) {
      case ADD_TODO :
        return state.concat([action.todo])
      case REMOVE_TODO :
        return state.filter((todo) => todo.id !== action.id)
      case TOGGLE_TODO :
        return state.map((todo) => todo.id !== action.id ? todo :
          Object.assign({}, todo, { complete: !todo.complete }))
      default :
        return state
    }
  }
  
  const goals = (state = [], action) => {
    switch(action.type) {
      case ADD_GOAL :
        return state.concat([action.goal])
      case REMOVE_GOAL :
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
    const {goals , todos} = store.getState()

    document.getElementById('todos').innerHTML = ''
    document.getElementById('goals').innerHTML = ''
    
    goals.forEach(addGoalToDOM)
    todos.forEach(addTodoToDOM)
  })

  // DOM code
  const addTodo = () => {
      const input = document.getElementById('todo')
      const name = input.value 
      input.value = ''

      store.dispatch(addTodoAction({
        name,
        complete: false,
        id: generateId()
      }))
  }

  const addGoal = () => {
        const input = document.getElementById('goal')
        const name = input.value 
        input.value = ''

        store.dispatch(addGoalAction({
            name,
            id: generateId()
        }))
}

document.getElementById('todoBtn')
.addEventListener('click' , addTodo)

document.getElementById('goalBtn')
.addEventListener('click' , addGoal)
  
const addTodoToDOM =(todo) =>{
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)
    node.appendChild(text)
    node.style.textDecoration = todo.complete ? 'line-through' : 'none'
    node.addEventListener('click' , () => {
        store.dispatch(toggleTodoAction(todo.id))
    })

    document.getElementById('todos')
    .appendChild(node)
}

const addGoalToDOM =(goal) =>{
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)
    node.appendChild(text)
    

    document.getElementById('goals')
    .appendChild(node)
}

//   store.dispatch(addTodoAction({
//     id: 0,
//     name: 'Walk the dog',
//     complete: false,
//   }))
  
//   store.dispatch(addTodoAction({
//     id: 1,
//     name: 'Wash the car',
//     complete: false,
//   }))
  
//   store.dispatch(addTodoAction({
//     id: 2,
//     name: 'Go to the gym',
//     complete: true,
//   }))
  
//   store.dispatch(removeTodoAction(1))
  
//   store.dispatch(toggleTodoAction(0))
  
//   store.dispatch(addGoalAction({
//     id: 0,
//     name: 'Learn Redux'
//   }))
  
//   store.dispatch(addGoalAction({
//     id: 1,
//     name: 'Lose 20 pounds'
//   }))
  
//   store.dispatch(removeGoalAction(0))