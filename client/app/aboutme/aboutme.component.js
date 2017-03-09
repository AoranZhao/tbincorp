'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './aboutme.routes';

export class aboutmeComponent {
  aboutme = {};

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/aboutmes')
      .then(response => {
        if(response.data.length > 0) {
          this.aboutme = response.data[0];
        }
      });
  }

}

export default angular.module('projectApp.aboutme', [uiRouter])
  .config(routing)
  .component('aboutme', {
    template: require('./aboutme.html'),
    controller: aboutmeComponent
  })
  .name;
