'use strict';

describe('Component: list', function() {
  // load the component's module
  beforeEach(module('projectApp.list'));

  var listComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    listComponent = $componentController('list', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
