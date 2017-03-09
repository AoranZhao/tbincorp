'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

// custom design
import list from './list/list.component';
import sidebar from '../components/sidebar/sidebar.directive';
import detail from './detail/detail.component';
import mngsidebar from '../components/mngsidebar/mngsidebar.directive';
import mnglist from './mnglist/mnglist.component';
import mngpropadd from './mngpropadd/mngpropadd.component';
import mngpropedit from './mngpropedit/mngpropedit.component';
import aboutme from './aboutme/aboutme.component';
import mngaboutme from './mngaboutme/mngaboutme.component';

import './app.scss';

angular.module('projectApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, mngaboutme, aboutme, mngpropedit, mngpropadd, mnglist, mngsidebar, detail, sidebar, list, account, admin, navbar, footer, main, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['projectApp'], {
      strictDi: true
    });
  });
