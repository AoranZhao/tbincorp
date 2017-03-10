'use strict';

export default class AdminController {
	users = {};
	new_user = {};

  /*@ngInject*/
  constructor(User, Auth, $state) {
    // Use the User $resource to fetch all users
    this.User = User;
    this.Auth = Auth;
    this.$state = $state;
  }

  $onInit() {
  	this.refresh();
  }

  refresh() {
  	this.users = this.User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  add(form) {
  	this.submitted = true;

  	if(form.$valid) {
  		return this.Auth.createUserByAdmin({
  			name: this.new_user.name,
  			email: this.new_user.email,
  			password: this.new_user.password
  		})
  			.then(() => {
  				this.$state.reload();
  			})
  			.catch(err => {
  				err = err.data;
  				this.errors = {};

  				angular.forEach(err.errors, (error, field) => {
  					form[field].$setValidity('mongoose', false);
  					this.errors[field] = error.message;
  				});
  			});
  	}
  }
}
