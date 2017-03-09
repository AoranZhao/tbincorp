'use strict';

describe('Component: mngpropadd', function() {
  // load the component's module
  beforeEach(module('projectApp.mngpropadd'));

  var mngpropaddComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    mngpropaddComponent = $componentController('mngpropadd', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
