'use strict';

describe('Component: mngaboutme', function() {
  // load the component's module
  beforeEach(module('projectApp.mngaboutme'));

  var mngaboutmeComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    mngaboutmeComponent = $componentController('mngaboutme', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
