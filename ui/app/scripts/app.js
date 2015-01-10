'use strict';

/**
 * The application.
 */
var app = angular.module('uiApp', [
  'ngResource',
  'ngMessages',
  'ui.router',
  'mgcrea.ngStrap',
  'satellizer'
]);

/**
 * The run configuration.
 */
app.run(function($rootScope) {

  /**
   * The user data.
   *
   * @type {{}}
   */
  $rootScope.user = {};
});

/**
 * The application routing.
 */
app.config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider) {

  $urlRouterProvider
    .when('', 'signIn')
    .when('/', 'signIn');

  $stateProvider
    .state('home', { url: '/home', templateUrl: '/views/home.html' })
    .state('signUp', { url: '/signUp', templateUrl: '/views/signUp.html' })
    .state('signIn', { url: '/signIn', templateUrl: '/views/signIn.html' })
    .state('signOut', { url: '/signOut', template: null,  controller: 'SignOutCtrl' });

  $httpProvider.interceptors.push(function($q, $injector) {
    return {
      request: function(request) {
        var $auth = $injector.get('$auth');
        if ($auth.isAuthenticated()) {
          request.headers['X-Auth-Token'] = $auth.getToken();
        }

        return request;
      },

      responseError: function(rejection) {
        if (rejection.status === 401) {
          $injector.get('$state').go('signIn');
        }
        return $q.reject(rejection);
      }
    };
  });

  // Auth config
  $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
  $authProvider.loginOnSignup = true;
  $authProvider.loginRedirect = '/home';
  $authProvider.logoutRedirect = '/';
  $authProvider.signupRedirect = '/home';
  $authProvider.loginUrl = '/signIn';
  $authProvider.signupUrl = '/signUp';
  $authProvider.loginRoute = '/signIn';
  $authProvider.signupRoute = '/signUp';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
  $authProvider.authHeader = 'X-Auth-Token';

  // Facebook
  $authProvider.facebook({
    clientId: '1503078423241610',
    url: '/authenticate/facebook',
    authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
    scope: 'email',
    scopeDelimiter: ',',
    requiredUrlParams: ['display', 'scope'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 481, height: 269 }
  });

  // Google
  $authProvider.google({
    clientId: '526391676642-nbnoavs078shhti3ruk8jhl4nenv0g04.apps.googleusercontent.com',
    url: '/authenticate/google',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 580, height: 400 }
  });

  // Twitter
  $authProvider.twitter({
    url: '/authenticate/twitter',
    type: '1.0',
    popupOptions: { width: 495, height: 645 }
  });
});
