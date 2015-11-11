import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

import FontAwesome from 'react-fontawesome';
import { addTodo, addTodoList, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'

import TodoListComponent from './Todo-list';
import InputAdd from './Input-add';
import request from 'request-json'
import http from '../utils/HttpClient'
    
let todoApp = React.createClass({
    getInitialState() {
        return {
          activeKey: 1,
            newTodoListTitle: ''
        };
      },
    handleChange() {
        console.log("handling select!");
        this.setState({
          newTodoListTitle: this.refs.input.getValue()
        });
      },
    
      handleSelect(activeKey) {
        this.setState({ activeKey });
      },
    addNewTodoList(newTodoListTitle) {
        http.post('/addTodoList',{text:newTodoListTitle}).then((result) => {
            this.props.dispatch(addTodoList(result));
        });
    },
    
    deleteTodoList(todoList) {
        console.log("Deleting here");
        http.post('/deleteTodoList',todoList).then((result) => {
            console.log(this.props.todoLists);
            this.props.dispatch(deleteTodoList(todoList));
            console.log(this.props.todoLists);
        });
    },
  render() {
       const { dispatch, visibleTodos, visibilityFilter } = this.props;
      console.log("Home rerender");
      console.log(this.props.visibleTodos.length);
    let todoLists = this.props.todoLists.map((todoList,index) => {
        let todos = this.props.visibleTodos.filter(todo => todoList.items.indexOf(todo._id) != -1);
        
        let addTodo = (text) => {
            http.post('/addTodo',{text:text, listId: todoList._id}).then((todo) => {
                this.props.dispatch(addTodo(todo));
            });
        }
        return (<TodoListComponent key={index} onTodoAdd={addTodo} todoList={todoList}
             todos={todos}/>);
    });
    return (
      <div>
        <Row>
        <PageHeader>Home</PageHeader>
        </Row>
        <Row>
            <Col mdOffset={2} md={8}>
                                <InputAdd placeHolder="New todo list..." onAdd={this.addNewTodoList}/>
   </Col>
        </Row>
        <Row>
            <Col mdOffset={2} md={8}>
                    
              <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                  {todoLists}
                
              </PanelGroup>
            </Col>
        </Row>
      </div>
    );
  }
});


todoApp.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        date: PropTypes.object.isRequred,
        _id: PropTypes.any.isRequired
    })),
    todoLists: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        date: PropTypes.object.isRequred,
        _id: PropTypes.any.isRequired
    })),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}


let objToArray = (obj) => Object.keys(obj).map((k) => obj[k]);

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
          return objToArray(todos);
        case VisibilityFilters.SHOW_COMPLETED:
          return objToArray(todos).filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
          return objToArray(todos).filter(todo => !todo.completed)
  }
}

function select(state) {
    console.log("Updated info!");
  return {
    todoLists: objToArray(state.todoLists),
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(todoApp);
