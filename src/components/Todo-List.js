import React from 'react';
import {connect} from 'react-redux';
import {deleteTodoList, addTodo, linkTodo, unLinkTodo, deleteTodos, deleteTodo, completeTodo} from '../actions';
import TodoItem from './Todo-item';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Modal from 'react-bootstrap/lib/Modal';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import InputAdd from './Input-add';
import PresentDelete from './Present-delete';
import http from '../utils/HttpClient'

 
let todoList = React.createClass({
    getInitialState: function(props) {
        return {

            text: this.props.todoList.text,
            date: this.props.todoList.date
        }
    },

    addTodo(text) {
        http.post('/addTodo',{text:text, listId: this.props.todoList._id}).then((todo) => {
            this.props.dispatch(addTodo(todo));
            this.props.dispatch(linkTodo({listId:this.props.todoList._id,todoId:todo._id}));
        });
    },
    deleteTodo(todo){
        http.post('/deleteTodo',Object.assign({},todo,{listId:this.props.todoList._id})).then((result) => {
            this.props.dispatch(deleteTodo(todo));
            this.props.dispatch(unLinkTodo({listId:this.props.todoList._id,todoId:todo._id}));
        });
    },
    onSwitchCompleteTodo(todo){
        this.setState({completed:!this.state.completed});

        http.post('/modifyTodo',todo).then((result) => {
            this.props.dispatch(completeTodo(todo));
        });
    },
    deleteTodoList() {
        http.post('/deleteTodoList',this.props.todoList).then((result) => {
            this.props.dispatch(deleteTodoList(this.props.todoList));
            this.props.dispatch(deleteTodos(this.props.todos));
        });
    },
  render() {

        let headerTitle = (<h5><strong>{this.state.text}</strong></h5>);
        let header= (<PresentDelete onDelete={this.deleteTodoList} content={headerTitle}/>);
        let todoItems = this.props.todos.map((todo,index) => {
            let todoContent = (<TodoItem item={todo} onComplete={() => this.onSwitchCompleteTodo(todo)}/>);
            let onDelete = () => {
                return this.deleteTodo(todo);
            }
            return (<ListGroupItem key={todo._id}><PresentDelete onDelete={onDelete} content={todoContent}/></ListGroupItem>);
         });
        return (
    
            <div>
                <Panel className="todo-list" header={header}  >
                            <ListGroup fill>
                            {todoItems}
                    </ListGroup>
                </Panel>
                <div className="new-todo-container">
                    <InputAdd placeHolder={'Add todo item for list "' + this.state.text + '" ...'} onAdd={this.addTodo}/>
                </div>
            </div>
             
            );
        }
});

export default connect()(todoList)
