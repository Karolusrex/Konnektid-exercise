import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default React.createClass({
    /*getInitialState: function(props) {
        return {
            text: this.props.todoList.text,
            date: this.props.todoList.date
        }
    },*/
    render(){
        let btn = (<Button onClick={this.props.onDelete} bsStyle="danger" className="pull-right">-</Button>);
        let content = this.props.content;
                   
        return(<div className="present-delete"><div className="pull-left">{content}</div>{btn}</div>);
    }
});
