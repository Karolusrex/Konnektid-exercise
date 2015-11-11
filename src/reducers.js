import { combineReducers } from 'redux'
import { ADD_TODO_LIST, ADD_TODO_LISTS, ADD_TODOS, DELETE_TODO, DELETE_TODOS, DELETE_TODO_LIST, ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, LINK_TODO, UNLINK_TODO, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters
import _ from 'lodash';

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
    let additionState = {};
  switch (action.type) {
    case ADD_TODO:
        additionState[action.todo._id] = action.todo;
        return Object.assign({},state, additionState);
    case ADD_TODOS:
        action.todos.map((todo) => {
            additionState[todo._id] = todo;});
        return Object.assign({},state, additionState);
    case COMPLETE_TODO:
        additionState[action.todo._id] = state[action.todo._id];
        additionState[action.todo._id].completed=true;
        return Object.assign({},state, additionState);
    case DELETE_TODO:
        return _.omit(state,action.todo._id);
    case DELETE_TODOS:
        return _.omit(state,action.todos.map((todo) => todo._id.toString()));
    default:
      return state
  }
}


function todoLists(state = {}, action) {
    let additionState = {};
    switch (action.type) {
        case LINK_TODO:
            additionState[action.listId] = state[action.listId];
            additionState[action.listId].items.push(action.todoId);
            return Object.assign({},state, additionState);
        case UNLINK_TODO:
            additionState[action.listId] = state[action.listId];
            let removeIndex = additionState[action.listId].items.indexOf(action.todoId);
            //There should always be an index here...
            if(removeIndex > -1){
                additionState[action.listId].items.splice(removeIndex,1);
            }
            return Object.assign({},state, additionState);
        case ADD_TODO_LIST:
            additionState[action.todoList._id] = action.todoList;
            return Object.assign({},state, additionState);
        case ADD_TODO_LISTS:
            action.todoLists.map((todoList) => {
                additionState[todoList._id] = todoList;});
            return Object.assign({},state, additionState);
      case DELETE_TODO_LIST:
            return _.omit(state,action.todoList._id);
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
