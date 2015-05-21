
function MainCtrl($scope,MainService) {
	var vm = this;

	vm.listMax = MainService.getListLimit();
	vm.assetList = MainService.getList();

	$scope.$on("newPageLimit",function(e,limit){
		console.log("newPageLimit",limit);
		MainService.setListLimit($scope,limit);
		vm.listMax = limit;
		$scope.$apply();
	});
}

angular
  .module('AssetManager')
  .controller('MainCtrl', MainCtrl);
