'use strict';

/**
 * The application.
 */
var app = angular.module('uiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
]);

/**
 * The application routing.
 */
app.config(function ($urlRouterProvider, $stateProvider, $httpProvider) {

  $urlRouterProvider
    .when('', 'signin')
    .when('/', 'signin');

  $stateProvider
    .state('home', { url: '/home', templateUrl: '/views/home.html' })
    .state('signup', { url: '/signup', templateUrl: '/views/signUp.html' })
    .state('signin', { url: '/signin', templateUrl: '/views/signIn.html' });

  $httpProvider.interceptors.push(function($q, $injector) {
    return {
      'responseError': function(rejection) {
        if (rejection.status === 401) {
          $injector.get('$state').go('signin')
        }
        return $q.reject(rejection);
      }
    };
  });
});
