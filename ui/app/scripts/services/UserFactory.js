'use strict';

/*global app: false */

/**
 * The user factory.
 */
app.factory('UserFactory', function($http) {
  return {
    get: function() {
      return $http.get('/user');
    }
  };
});
