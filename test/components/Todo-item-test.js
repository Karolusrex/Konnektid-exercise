import jest from 'jest';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { expect } from 'chai';
import TodoItem from '../../src/components/Todo-item';
import todoApp from '../../src/reducers';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

describe('Todo item', () => {
  

    let prepareItem = function(itemData){
        let store = createStore(todoApp);
        
        let renderedComponent = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoItem item = {itemData}/>
            </Provider>
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
