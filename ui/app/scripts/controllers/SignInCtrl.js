'use strict';

/**
 * The sign in controller.
 */
app.controller('SignInCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  /**
   * The submit method.
   */
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: '/authenticate',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $('form').serialize()
    }).then(function(data) {
      switch(data.status) {
        case 200:
          $state.go('home');
          break;
      }
    }, function(error) {
        switch (error.status) {
          case 400:
            console.log(error);
            break;

          case 401:
            console.log(error);
            break;

          case 403:
            $scope.form.$error.forbidden = true;
            console.log(error);
            break;
        }
      }
    )
  }
}]);
