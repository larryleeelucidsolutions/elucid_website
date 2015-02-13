'use strict';

describe('Controller: Schedule70Ctrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var Schedule70Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Schedule70Ctrl = $controller('Schedule70Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
