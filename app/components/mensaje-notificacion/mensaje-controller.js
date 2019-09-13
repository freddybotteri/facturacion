'use strict'
/*const MensajeController = ['$scope','$timeout', function($scope,$timeout){
	console.log("dddddd")
	$scope.visible;
	$scope.init = (time)=> {
		console.log("tiempo:")
			 $timeout(function () {
				$scope.visible = false
			}, time);	
		}
	}];
export default MensajeController*/

class MensajeController {
	constructor ($scope,$timeout) {
		this.visible ='h'
		this.$scope = $scope
		this.$timeout = $timeout
	}
	init (time){
		console.log("fffffff")
		 this.$timeout(function () {
				this.visible = false
			}, time);
	}


}
export default MensajeController
