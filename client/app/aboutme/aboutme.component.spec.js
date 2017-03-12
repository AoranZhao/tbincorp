'use strict';

describe('Component: aboutme', function() {
  // load the component's module
  beforeEach(module('projectApp.aboutme'));

  var aboutmeComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    aboutmeComponent = $componentController('aboutme', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
