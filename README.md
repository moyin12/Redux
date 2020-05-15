# Redux
A code along project to learn React and Redux from React Nanodegree.

# First thing to know is The Store

The store consists of the following.

1. the state tree.
2. a way to get the state tree.
3. a way to listen and respond to the state changing.
4. a way to update the state.

## First File is the index.js file
1. Created the store.
2. Created the state variable. local(private)
3. Created the get state function to access the state variable.(it returns an object)
4. Created a Listeners object
5. Update the state of the store
    --Rule to follow before updating the state
    1. Only an event can change the state of the store. 
    (The object created to keep track of the event taking place in redux application is called Action. When an event takes place an object is created. the object looks like the code below.
    `{
        type: "Add_TODO"
        todo: {
            id: 0,
            name: 'learn redux',
            complete: false
        }
    }`
    the object is called an Action. Every action must have a type property.
    )
    2. The function that returns the new state needs to be a pure function. the reason pure function is great is because its predictable ( The function need to pass this three requirements before it can be considered a pure function.
        They always return the same result if the same arg are passed in
        They depend solely on the arguement passed in
        Does not produce any side effect
    )

    The todos function is called a reducer because it takes in the state tree and action and reduces it into a new state.

    Create an updater function to update the state (
        `
            const dispatch = (action) => {
                state = reducer(state, action)
                listeners.forEach((listener) => listener())
            }
        `
    )

## What will you do if you have more than one reducer?
    Create a container function for the reducers(root reducer).
    Then pass in the name of the root reducer into the store as the main reducer.
    
