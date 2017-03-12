'use strict';

describe('Component: detail', function() {
  // load the component's module
  beforeEach(module('projectApp.detail'));

  var detailComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    detailComponent = $componentController('detail', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
