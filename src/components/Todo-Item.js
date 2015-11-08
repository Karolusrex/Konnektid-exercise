import React from 'react';

export default React.createClass({
    getInitialState: function(props) {
        return {
            complete: this.props.item.completed,
            text: this.props.item.text,
            date: this.props.item.date
        }
    },
  render() {
    return (
      <div className="todo-item">
        <input type="checkbox" defaultChecked={this.props.item.completed}/>{this.props.item.text}
      </div>
    );
  }
});
