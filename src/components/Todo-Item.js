import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import http from '../utils/HttpClient'
import {connect} from 'react-redux'
import {completeTodo} from '../actions';
import {Transition} from 'react-overlays';

let todoItem =  React.createClass({
    getInitialState: function(props) {
        return {
            item: this.props.item,
            show: false
        }
    },
    onSwitchCompleteTodo(){
        todoItem = this.state.item;
        todoItem.completed = !todoItem.completed;
        this.setState({item :todoItem});
        
        http.post('/modifyTodo',todoItem).then((result) => {
            this.props.dispatch(completeTodo(todoItem));
        });
    },
    componentDidMount: function(){
        setTimeout(() => this.setState({show:true}),10);
    },
  render() {
      let todoTitle = (<h5> {this.props.item.text} </h5>);
    return (
               <Transition
                  in={this.state.show}
                    timeout={4000}
                  className='fade'
                  enteredClassName='in'
                  enteringClassName='in'
                >
                      <div className="todo-item">
                        <Input type="checkbox"  defaultChecked={this.state.item.completed} onClick={() => this.onSwitchCompleteTodo()} label={this.props.item.text}/>
                      </div>
                   </Transition>
    );
  }
});


export default connect()(todoItem)
