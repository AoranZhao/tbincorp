'use strict';

describe('Directive: mngsidebar', function() {
  // load the directive's module and view
  beforeEach(module('directives.mngsidebar'));
  beforeEach(module('components/mngsidebar/mngsidebar.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<mngsidebar></mngsidebar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the mngsidebar directive');
  }));
});
