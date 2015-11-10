import { combineReducers } from 'redux'
import { ADD_TODO_LIST, ADD_TODO_LISTS, ADD_TODOS, DELETE_TODO, DELETE_TODOS, DELETE_TODO_LIST, ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

/*function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          date: new Date()
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}*/
function todos(state = {}, action) {
  switch (action.type) {
    case ADD_TODO:
        state[action.todo._id] = action.todo;
        return state;
    case ADD_TODOS:
        action.todos.map((todo) => {
            state[todo._id] = todo;});
        return state;
    case COMPLETE_TODO:
        state[action.todo._id].completed=true;
        return state;
    case DELETE_TODO:
        delete state[action.todo._id];
        return state;
    case DELETE_TODOS:
        action.todos.map((todo) => {
            delete state[todo._id];});
        return state;
    default:
      return state
  }
}


function todoLists(state = {}, action) {
  switch (action.type) {
    case ADD_TODO_LIST:
        state[action.todoList._id] = action.todoList;
        return state;
    case ADD_TODO_LISTS:
        action.todoLists.map((todoList) => {
            state[todoList._id] = todoList;});
        return state;
    case DELETE_TODO_LIST:
        delete state[action.todoList._id];
          return state;
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  todoLists
})

export default todoApp;
