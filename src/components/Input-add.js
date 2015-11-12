import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FontAwesome from 'react-fontawesome';
import TodoList from './Todo-list';
    
let InputAdd = React.createClass({
    getInitialState() {
        return {
            newText: ''
        };
      },
    handleChange() {
        this.setState({
          newText: this.refs.input.getValue()
        });
      },
    submit(event) {
        if(event){
            event.preventDefault();
        }
        if(this.state.newText == ''){
            return;
        }
        this.setState({
          newText: ''
        });
        this.props.onAdd(this.state.newText)
    },
  render() {
      const addButton = (
          <Button bsStyle="primary" onClick={() => this.submit()} >
            +
          </Button>
        );
    return (
    <form onSubmit={(event) => this.submit(event)} >
        <Input ref="input" onChange={this.handleChange} type="text" value={this.state.newText} buttonAfter={addButton} placeholder={this.props.placeHolder}/>
     </form>
    );
  }
});

export default InputAdd;

