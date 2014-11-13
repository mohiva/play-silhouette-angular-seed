'use strict';

/**
 * The sign up controller.
 */
app.controller('SignUpCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  /**
   * The submit method.
   */
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: '/signup',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $('form').serialize()
    }).then(function() {
      $state.go('home');
    }, function(error) {
      switch(error.status) {
        case 400:
          console.log(data);
          break;
      }
    })
  };
}]);
