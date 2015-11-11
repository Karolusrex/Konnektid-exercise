import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavBrand from 'react-bootstrap/lib/NavBrand';
import Nav from 'react-bootstrap/lib/Nav';
import Grid from 'react-bootstrap/lib/Grid';
import NavItem from 'react-bootstrap/lib/NavItem';
import {IndexLinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';
import Home from './Home';
import { connect } from 'react-redux';

export default React.createClass({
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
            <NavBrand><Link to="/">Todo app</Link></NavBrand>
            <Nav>
                {this.generateMenuItem("/","Home",1)}
                {this.generateMenuItem("about","About",2)}
                {this.generateMenuItem("poweredby","Powered by",3)}

            </Nav>
          </Navbar>
        
        </header>
        <Grid key="main-content">
                {childContent}
        </Grid>
      </div>
    )
  }
});
