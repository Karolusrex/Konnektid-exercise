import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect, assert } from 'chai';
import App from '../../src/components/App';
import * as packageJSON from '../../package.json';
import todoApp from '../../src/reducers';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

describe('App', () => {
  let prepareElement = function(){
        let store = createStore(todoApp);
      
        let renderedComponent = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <App />
            </Provider>
        );
        
        let inputComponent = TestUtils.scryRenderedDOMComponentsWithTag(
            renderedComponent,
            'div'
            )[0];
        return inputComponent;
    };

  it('should contain all menu items', () => {
      let generatedHTML = prepareElement().outerHTML;
      assert.include(generatedHTML,'Home');
      assert.include(generatedHTML,'About');
      assert.include(generatedHTML,'Powered by');
  });
    
    it('should have a div as container', () => {
        let elementTag = prepareElement().tagName;
        assert(elementTag == 'div' || elementTag == 'DIV');
  });

  


});
