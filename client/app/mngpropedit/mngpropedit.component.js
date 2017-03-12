'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './mngpropedit.routes';
import 'angular-file-upload';

export class mngpropeditComponent {
  property = {};

  /*@ngInject*/
  constructor($http, $stateParams, $state, FileUploader) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.uploader = new FileUploader({
      url: 'api/properties/upload/' + $stateParams.id,
      onCompleteAll: (() => {
        this.uploader.clearQueue();
        this.reset();
        alert("Save Successfully.");
      })
    });
  }

  $onInit() {
    this.reset();
    console.log(this.uploader);
  }

  reset() {
    this.$http.get('/api/properties/' + this.$stateParams.id)
      .then(response => {
        this.property = response.data;
      });
  }

  saveProperty() {
    if (this.property) {
      if (this.property.name_zh != null && this.property.name_zh != '' && this.property.property_type != null && this.property.property_type != '') {
        this.$http.put('/api/properties/' + this.$stateParams.id, {
          name_zh: this.property.name_zh,
          name_en: this.property.name_en,
          description_zh: this.property.description_zh,
          description_en: this.property.description_en,
          property_type: this.property.property_type
        }).then(response => {
          this.$state.go('mnglist', {cat: 'ALL'})
        });
      } else {
        alert("“中文名称”与“地产种类”是必填");
      }
    }
  }

  updateImage(photo) {
    this.$http.put('/api/properties/update/' + this.property._id + "/" + photo._id, photo)
      .then(response => {
        alert("update successfully.");
        this.reset();
      })
  }

  removeImage(photo) {
    this.$http.put('/api/properties/remove/' + this.property._id + "/" + photo._id, photo)
      .then(response => {
        alert("Image Remove.");
        this.reset();
      })
  }

  cancel() {
    this.$state.go('mnglist', {cat: 'ALL'});
  }

}

export default angular.module('projectApp.mngpropedit', [uiRouter, 'angularFileUpload'])
  .config(routing)
  .component('mngpropedit', {
    template: require('./mngpropedit.html'),
    controller: mngpropeditComponent
  })
  .name;
