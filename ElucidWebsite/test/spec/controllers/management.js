'use strict';

describe('Controller: ManagementCtrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var ManagementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagementCtrl = $controller('ManagementCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
