import React from 'react';
import Input from 'react-bootstrap/lib/Input';


export default React.createClass({
    getInitialState: function(props) {
        return {
            complete: this.props.item.completed,
            text: this.props.item.text,
            date: this.props.item.date
        }
    },
  render() {
      let todoTitle = (<h5> {this.props.item.text} </h5>);
    return (
      <div className="todo-item">
        <Input type="checkbox"  defaultChecked={this.props.item.completed} onClick={this.props.onClick} label={this.props.item.text}/>
      </div>
    );
  }
});
