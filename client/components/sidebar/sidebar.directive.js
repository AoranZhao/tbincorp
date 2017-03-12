'use strict';
const angular = require('angular');

export default angular.module('directives.sidebar', [])
  .directive('sidebar', function() {
    return {
      template: require('./sidebar.html'),
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
