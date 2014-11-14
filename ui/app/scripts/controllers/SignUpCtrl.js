'use strict';

/**
 * The sign up controller.
 */
app.controller('SignUpCtrl', ['$scope', '$http', '$state', 'CookieService', function($scope, $http, $state, CookieService) {

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
    }).then(function(data) {

      CookieService.set('X-Auth-Token', data.headers('X-Auth-Token'));
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
