/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const ADD_TODOS = 'ADD_TODOS'
export const ADD_TODO_LIST = 'ADD_TODO_LIST'
export const ADD_TODO_LISTS = 'ADD_TODO_LISTS'
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST'
export const DELETE_TODO = 'DELETE_TODO'
export const DELETE_TODOS = 'DELETE_TODOS'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

//For convenience, some things can be done in plural (arrays) to make the code look a bit nicer at the other side
export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function addTodos(todos) {
  return { type: ADD_TODOS, todos }
}


export function completeTodo(todo) {
  return { type: COMPLETE_TODO, todo }
}

export function deleteTodo(todo) {
  return { type: DELETE_TODO, todo }
}
    
export function deleteTodos(todos) {
  return { type: DELETE_TODOS, todos }
}


    
    
export function addTodoList(todoList) {
    return { type: ADD_TODO_LIST, todoList }
}
    
export function addTodoLists(todoLists) {
    return { type: ADD_TODO_LISTS, todoLists }
}

    
export function deleteTodoList(todoList) {
    return { type: DELETE_TODO_LIST, todoList }
}
    

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
