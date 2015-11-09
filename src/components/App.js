import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavBrand from 'react-bootstrap/lib/NavBrand';
import Nav from 'react-bootstrap/lib/Nav';
import Grid from 'react-bootstrap/lib/Grid';
import NavItem from 'react-bootstrap/lib/NavItem';
import {IndexLinkContainer} from 'react-router-bootstrap';
import Home from './Home';

export default React.createClass({
  returnSomething(something) {
    //this is only for testing purposes. Check /test/components/App-test.js
    return something;
  },
    generateMenuItem(link,text,eventKey, query={}) {
        
        return (
            <IndexLinkContainer to={link} >
              <NavItem href="#" eventKey={eventKey}>{text}</NavItem>
            </IndexLinkContainer>
            );
    },
  render() {
      const childContent = this.props.children || (<Home/>);
    return (
        
      <div>
        
            
        <header>
        <Navbar>
            <NavBrand><a href="#">Todo or notodo</a></NavBrand>
            <Nav>
                {this.generateMenuItem("/","Home",1)}
                {this.generateMenuItem("about","About",2)}
                {this.generateMenuItem("poweredby","Powered by",3)}

            </Nav>
          </Navbar>
        
        </header>
        <Grid>
                {childContent}
        </Grid>
      </div>
    )
  }
});
