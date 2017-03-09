'use strict';
const angular = require('angular');

export default angular.module('directives.mngsidebar', [])
  .directive('mngsidebar', function() {
    return {
      template: require('./mngsidebar.html'),
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
