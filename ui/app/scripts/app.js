'use strict';

/**
 * The application.
 */
var app = angular.module('uiApp', [
  'ipCookie',
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

  $httpProvider.interceptors.push(function($q, $injector, CookieService) {
    return {
      request: function(request) {
        var token = CookieService.get('X-Auth-Token');
        if (token !== undefined) {
          request.headers['X-Auth-Token'] = token;
        }

        return request;
      },

      responseError: function(rejection) {
        if (rejection.status === 401) {
          $injector.get('$state').go('signin')
        }
        return $q.reject(rejection);
      }
    };
  });
});
