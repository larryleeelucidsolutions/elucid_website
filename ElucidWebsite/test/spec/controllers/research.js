'use strict';

describe('Controller: ResearchCtrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var ResearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResearchCtrl = $controller('ResearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
