var app = require('./app');

app.directive('flipper', function() {
	return {
		restrict: 'E',
		template: '<div ng-click="flip()" class="flipper" ng-transclude></div>',
		transclude: true,
    controller: function($scope) {
      var totalSides = 0;

      $scope.flipped = 1;

      $scope.flip = function() {
        if ($scope.flipped === totalSides) {
          $scope.flipped = 1;
        } else {
          $scope.flipped += 1;
        }

        $scope.$broadcast('flipper.side.flipped', $scope.flipped);
      };

      $scope.$on('flipper.side.added', function(event) {
        totalSides += 1;
      });
    }
	};
});

app.directive('flipperSide', function() {
	return {
		restrict: 'E',
		template: '<div class="flipper__side" style="-webkit-transform: {{ rotate }};transform: {{ rotate }};" ng-transclude></div>',
		transclude: true,
    scope: {}, // isolate scope
    link: function(scope, element, attrs) {
      scope.flipperSideClass = attrs.side;
      scope.$emit('flipper.side.added');

      // Initially flip the first side
      if (parseInt(attrs.side) === 1) {
        makeActive();
      } else {
        makeInactive();
      }

      scope.$on('flipper.side.flipped', function(event, side) {
        if (side === parseInt(attrs.side)) {
          makeActive();
        } else {
          makeInactive();
        }
      });

      function makeActive() {
        scope.rotate = 'rotateX(0deg)';
      }

      function makeInactive() {
        scope.rotate = 'rotateX(180deg)';
      }
    }
	};
});
