'use strict';

describe('Controller: Ciosp3Ctrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var Ciosp3Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Ciosp3Ctrl = $controller('Ciosp3Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
