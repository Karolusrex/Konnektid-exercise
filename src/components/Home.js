import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import FontAwesome from 'react-fontawesome';
import { addTodo, addTodoList, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'

import TodoListComponent from './Todo-list';
import InputAdd from './Input-add';
import request from 'request-json'
import http from '../utils/HttpClient'

    
let todoApp = React.createClass({
    getInitialState() {
        let filterTexts = {};
        filterTexts[VisibilityFilters.SHOW_ALL] = "Show all todos";
        filterTexts[VisibilityFilters.SHOW_COMPLETED] = "Show complete todos";
        filterTexts[VisibilityFilters.SHOW_ACTIVE] = "Show active todos";
        return {
            newTodoListTitle: '',
            filterTexts,
            filterText: filterTexts[VisibilityFilters.SHOW_ALL],
        };
      },
    
    addNewTodoList(newTodoListTitle) {
        http.post('/addTodoList',{text:newTodoListTitle}).then((result) => {
            this.props.dispatch(addTodoList(result));
        });
    },
    onFilterChange(newFilter) {
        this.setState({ filterText: this.state.filterTexts[newFilter] });
        this.props.dispatch(setVisibilityFilter(newFilter));
    },
    render() {
        let filterButtons = Object.keys(this.state.filterTexts).map((filterOption,index) => {
            return (
                <MenuItem key={index} eventKey={index}
                    onClick={() => this.onFilterChange(filterOption)} >
                    {this.state.filterTexts[filterOption]}
                </MenuItem>)
        })
                                                                
                                                                    
                                                                    
        let todoLists = this.props.todoLists.map((todoList,index) => {
            let todos = this.props.visibleTodos.filter(todo => todoList.items.indexOf(todo._id) != -1);
            
            let transitionOn = false;
            
            return (
                    <TodoListComponent key={todoList._id}  onTodoAdd={addTodo} todoList={todoList}
                     todos={todos}/>
                );
    });
    return (
      <div>
        <Row>
        <PageHeader>Home</PageHeader>
        </Row>
        <Row>
        <div className="pull-left filter-container">
        <SplitButton bsStyle="default" id="split-button-filter" title={this.state.filterText}>
            {filterButtons}
        </SplitButton>
        </div>
            <Col className="pull-right" md={9}>
                                <InputAdd placeHolder="New todo list..." onAdd={this.addNewTodoList}/>
        <PanelGroup activeKey={this.state.activeKey} accordion>
                  {todoLists}
                
              </PanelGroup>
   </Col>
        </Row>
        <Row>
            <Col mdOffset={3} md={9}>
                    
              
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
    let allTodos = objToArray(todos);
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
          break;
        case VisibilityFilters.SHOW_COMPLETED:
          allTodos = allTodos.filter(todo => todo.completed);
            break;
        case VisibilityFilters.SHOW_ACTIVE:
          allTodos = allTodos.filter(todo => !todo.completed);
            break;
    }
    if(allTodos === undefined){
        return allTodos = [];
    }
    return allTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function select(state) {
  return {
    todoLists: objToArray(state.todoLists).sort((a, b) => new Date(a.date) - new Date(b.date)),
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}



// Wrap the component to inject dispatch and state into it
export default connect(select)(todoApp);
