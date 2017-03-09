'use strict';
import angular from 'angular';
import routing from './list.routes';
import uiRouter from 'angular-ui-router';

export class listComponent {
  properties = [];
  category = 'ALL';

  /*@ngInject*/
  constructor($http, $scope, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    if (this.$stateParams.cat == "ALL" || this.$stateParams.cat == "" || this.$stateParams.cat == null) {
      this.$http.get('/api/properties')
        .then(response => {
          this.properties = response.data;
        });
        // this.$http.get('/api/categories')
        // .then(response => {
        //   this.category = response.data;
        // })
    } else {
      this.$http.get('/api/properties/cat/' + this.$stateParams.cat)
        .then(response => {
          this.properties = response.data;
        });
      // this.$http.get('/api/categories')
      //   .then(response => {
      //     this.category = response.data;
      //   })
    }
  }

}

export default angular.module('projectApp.list', [uiRouter])
  .config(routing)
  .component('list', {
    template: require('./list.html'),
    controller: listComponent
  })
  .name;
