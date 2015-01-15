'use strict';

/*global app: false */

/**
 * The navigation controller.
 */
app.controller('NavigationCtrl', ['$scope', '$auth', function($scope, $auth) {

  /**
   * Indicates if the user is authenticated or not.
   *
   * @returns {boolean} True if the user is authenticated, false otherwise.
   */
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
}]);
