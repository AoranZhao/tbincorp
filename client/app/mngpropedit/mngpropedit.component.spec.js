'use strict';

describe('Component: mngpropedit', function() {
  // load the component's module
  beforeEach(module('projectApp.mngpropedit'));

  var mngpropeditComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    mngpropeditComponent = $componentController('mngpropedit', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
