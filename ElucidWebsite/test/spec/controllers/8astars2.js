'use strict';

describe('Controller: 8astars2Ctrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var 8astars2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    8astars2Ctrl = $controller('8astars2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
