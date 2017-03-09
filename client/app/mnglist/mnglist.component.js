'use strict';
import angular from 'angular';
import routing from './mnglist.routes';
import uiRouter from 'angular-ui-router';

export class mnglistComponent {
  properties = [];
  /*@ngInject*/
  constructor($http, $state, $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    if (this.$stateParams.cat == 'ALL' || this.$stateParams.cat == '' || this.$stateParams.cat == null) {
      this.$http.get('/api/properties')
        .then(response => {
          this.properties = response.data;
        });
      } else {
        this.$http.get('/api/properties/cat/' + this.$stateParams.cat)
          .then(response => {
            this.properties = response.data;
          })
      }
    
  }

  delete(id) {
    if(confirm("确认吗?")) {
      if (id != null && id != '') {
        this.$http.delete('/api/properties/' + id);
        this.$state.reload();
      }
    }
  }
}

export default angular.module('projectApp.mnglist', [uiRouter])
  .config(routing)
  .component('mnglist', {
    template: require('./mnglist.html'),
    controller: mnglistComponent
  })
  .name;
