angular.module('AssetManager', [
  'ngRoute'
]).config(function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
    $routeProvider
      .when('/', {
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });