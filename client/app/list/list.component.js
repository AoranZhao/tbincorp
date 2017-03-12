'use strict';
import angular from 'angular';
import routing from './list.routes';
import uiRouter from 'angular-ui-router';

export class listComponent {
  properties = [];
  show_properties = [];
  pagination = {};
  propertyLimit = 4;
  maxSize = 5;

  /*@ngInject*/
  constructor($http, $scope, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.refresh();
  }

  refresh() {
    if (this.$stateParams.cat == "ALL" || this.$stateParams.cat == "" || this.$stateParams.cat == null) {
      this.$http.get('/api/properties')
        .then(response => {
          this.properties = response.data.sort(this.sortArr);
          this.show_properties = this.properties.slice(0, this.propertyLimit);
          this.refreshPage();
        });
    } else {
      this.$http.get('/api/properties/cat/' + this.$stateParams.cat)
        .then(response => {
          this.properties = response.data.sort(this.sortArr);
          this.show_properties = this.properties.slice(0, this.propertyLimit);
          this.refreshPage();
        });
    }
  }

  sortArr(a, b) {
      var keyA = new Date(a.created_date), keyB = new Date(b.created_date);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
  }

  refreshPage() {
    this.pagination.totalItems = this.properties.length;
    this.pagination.itemsPerPage = this.propertyLimit;
    this.pagination.current = 1;
    this.pagination.maxSize = this.maxSize
  }

  changePage() {
    this.show_properties = this.properties.slice((this.pagination.current - 1) * this.propertyLimit, this.pagination.current * this.propertyLimit);
  }

}

export default angular.module('projectApp.list', [uiRouter])
  .config(routing)
  .component('list', {
    template: require('./list.html'),
    controller: listComponent
  })
  .name;
