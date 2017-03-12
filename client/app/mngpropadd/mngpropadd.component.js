'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './mngpropadd.routes';

export class mngpropaddComponent {
  newProperty = {};

  /*@ngInject*/
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  addProperty() {
    if(this.newProperty) {
      if (this.newProperty.name_zh != null && this.newProperty.name_zh != '' && this.newProperty.property_type != null && this.newProperty.property_type != '') {
        this.$http.post('/api/properties', {
          name_zh: this.newProperty.name_zh,
          name_en: this.newProperty.name_en,
          description_zh: this.newProperty.description_zh,
          description_en: this.newProperty.description_en,
          property_type: this.newProperty.property_type
        }).then(response => {
          this.$state.go("mnglist", {cat: 'ALL'});
        });
      } else {
        alert("“中文名称”与“地产种类”是必填");
      }
    }
  }

  clear() {
    this.newProperty = {};
  }

  cancel() {
    this.$state.go('mnglist', {cat: 'ALL'});
  }
}

export default angular.module('projectApp.mngpropadd', [uiRouter])
  .config(routing)
  .component('mngpropadd', {
    template: require('./mngpropadd.html'),
    controller: mngpropaddComponent
  })
  .name;
