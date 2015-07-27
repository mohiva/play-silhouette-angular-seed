'use strict';

/**
 * The application.
 */
var app = angular.module('uiApp', [
  'ngResource',
  'ngMessages',
  'ngCookies',
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

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', { url: '/home', templateUrl: '/views/home.html', resolve: {
      authenticated: function($q, $location, $auth) {
        var deferred = $q.defer();

        if (!$auth.isAuthenticated()) {
          $location.path('/signIn');
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      }
    }})
    .state('signUp', { url: '/signUp', templateUrl: '/views/signUp.html' })
    .state('signIn', { url: '/signIn', templateUrl: '/views/signIn.html' })
    .state('signOut', { url: '/signOut', template: null,  controller: 'SignOutCtrl' });

  $httpProvider.interceptors.push(function($q, $injector) {
    return {
      request: function(request) {
        // Add auth token for Silhouette if user is authenticated
        var $auth = $injector.get('$auth');
        if ($auth.isAuthenticated()) {
          request.headers['X-Auth-Token'] = $auth.getToken();
        }

        // Add CSRF token for the Play CSRF filter
        var cookies = $injector.get('$cookies');
        var token = cookies.get('PLAY_CSRF_TOKEN');
        if (token) {
          // Play looks for a token with the name Csrf-Token
          // https://www.playframework.com/documentation/2.4.x/ScalaCsrf
          request.headers['Csrf-Token'] = token;
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
  $authProvider.platform = 'browser';
  $authProvider.storage = 'localStorage';

  // Facebook
  $authProvider.facebook({
    clientId: '1503078423241610',
    url: '/authenticate/facebook',
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
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 580, height: 400 }
  });

  // VK
  $authProvider.oauth2({
    clientId: '4782746',
    url: '/authenticate/vk',
    authorizationEndpoint: 'http://oauth.vk.com/authorize',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    name: 'vk',
    scope: 'email',
    scopeDelimiter: ' ',
    requiredUrlParams: ['display', 'scope'],
    display: 'popup',
    popupOptions: { width: 495, height: 400 }
  });

  // Twitter
  $authProvider.twitter({
    url: '/authenticate/twitter',
    type: '1.0',
    popupOptions: { width: 495, height: 645 }
  });

  // Xing
  $authProvider.oauth1({
    url: '/authenticate/xing',
    name: 'xing',
    popupOptions: { width: 495, height: 500 }
  });
});
