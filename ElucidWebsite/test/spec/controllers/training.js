'use strict';

describe('Controller: TrainingCtrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var TrainingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrainingCtrl = $controller('TrainingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
