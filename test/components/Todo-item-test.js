import jest from 'jest';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { expect } from 'chai';
import TodoItem from '../../src/components/Todo-item';


describe('Todo item', () => {
  

    let prepareItem = function(itemData){
        
        let renderedComponent = TestUtils.renderIntoDocument(
            <TodoItem item = {itemData}/>
        );
        
        let inputComponent = TestUtils.findRenderedDOMComponentWithTag(
            renderedComponent,
            'input'
            );
        return inputComponent;
    }

    
    
  it('should be marked if completed', () => {
        let uncompletedItemStruct = {
            completed: false,
            date: new Date(),
            text: "Do laundry"
        };
        let completedItemStruct = {
            completed: true,
            date: new Date(),
            text: "Do laundry"
        };
        
        expect(prepareItem(uncompletedItemStruct).checked).to.be.false;
        expect(prepareItem(completedItemStruct).checked).to.be.true;
  });

  
});
