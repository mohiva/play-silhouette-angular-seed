'use strict';

/**
 * The navigation controller.
 */
app.controller('NavigationCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  /**
   * Logs out the user.
   */
  $scope.logout = function() {
    $http({
      method: 'GET',
      url: '/signout'
    }).then(function() {
      $state.go('signin');
    });
  };
}]);
