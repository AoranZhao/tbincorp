'use strict';
import angular from 'angular';
import routing from './mngaboutme.routes';
import uiRouter from 'angular-ui-router';

export class mngaboutmeComponent {
  aboutme = {};

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/aboutmes')
      .then(response => {
        this.aboutme = response.data[0];
      });
  }

  save() {
    if (this.aboutme._id == null || this.aboutme._id == '') {
      this.$http.post('/api/aboutmes', {
        description_en: this.aboutme.description_en,
        description_zh: this.aboutme.description_zh,
        facebook: this.aboutme.facebook,
        twitter: this.aboutme.twitter,
        linkedin: this.aboutme.linkedin,
        email: this.aboutme.email
      }).then(response => {
        // this.aboutme = response.data[0];
        alert("保存成功");
      });
    } else {
      this.$http.put('/api/aboutmes/' + this.aboutme._id, {
        description_en: this.aboutme.description_en,
        description_zh: this.aboutme.description_zh,
        facebook: this.aboutme.facebook,
        twitter: this.aboutme.twitter,
        linkedin: this.aboutme.linkedin,
        email: this.aboutme.email
      }).then(response => {
        // this.aboutme = response.data[0];
        alert("保存成功");
      });
    }
  }

  reset() {
    // if (this.aboutme._id == null || this.aboutme._id == '') {
    //   this.aboutme = {};
    // } else {
      this.$http.get('/api/aboutmes')
        .then(response => {
          this.aboutme = response.data[0];
        });
    // }
  }
}

export default angular.module('projectApp.mngaboutme', [uiRouter])
  .config(routing)
  .component('mngaboutme', {
    template: require('./mngaboutme.html'),
    controller: mngaboutmeComponent
  })
  .name;
