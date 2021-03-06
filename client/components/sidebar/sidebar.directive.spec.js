'use strict';

describe('Directive: sidebar', function() {
  // load the directive's module and view
  beforeEach(module('directives.sidebar'));
  beforeEach(module('components/sidebar/sidebar.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<sidebar></sidebar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the sidebar directive');
  }));
});
