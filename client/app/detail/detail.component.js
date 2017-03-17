'use strict';
import angular from 'angular';
import routing from './detail.routes';
import uiRouter from 'angular-ui-router';
import animate from 'angular-animate';

export class detailComponent {
  property = {};
  founded = false;

  myInterval = 5000;
  noWrapSlides = false;
  active = 0;

  /*@ngInject*/
  constructor($http, $stateParams, $sce) {
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.$sce = $sce;
  }

  $onInit() {
    this.$http.get('/api/properties/' + this.$stateParams.id)
      .then(response => {
        this.property = response.data;
        this.founded = true;
        console.log(this.property);
      });
  }

  trustSrc(src) {
    return this.$sce.trustAsResourceUrl(src);
  }
}

export default angular.module('projectApp.detail', [uiRouter, animate])
  .config(routing)
  .component('detail', {
    template: require('./detail.html'),
    controller: detailComponent
  })
  .name;
