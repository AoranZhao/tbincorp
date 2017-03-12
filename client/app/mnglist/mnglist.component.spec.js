'use strict';

describe('Component: mnglist', function() {
  // load the component's module
  beforeEach(module('projectApp.mnglist'));

  var mnglistComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    mnglistComponent = $componentController('mnglist', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
