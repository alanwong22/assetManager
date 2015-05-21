
function MainService() {
	// console.log('MainService');
	var vm = this;
	var listLimit = 10;

	vm.removeAsset = function(index) {
		vm.assetList.splice(index, 1);
		console.log("length",vm.assetList.length);

	};

	vm.getListLimit = function() {
		return listLimit;
	};

	vm.setListLimit = function(scope,limit) {
		listLimit = limit;
	};

	vm.getList = function() {
		return vm.assetList;
	};

	vm.getListCount = function() {
		return vm.assetList.length;
	};

	// MOCK DATA - THIS SHOULD BE IN A DB
	vm.assetList = [
		{
			filename: 'tove-lo.jpg',
			image: 'img1.jpg',
		},
		{
			filename: 'the-civil-wars.jpg',
			image: 'img2.jpg'
		},
		{
			filename: 'st-vincent.jpg',
			image: 'img3.jpg'
		},
		{
			filename: 'st-vincent2.jpg',
			image: 'img4.jpg'
		},
		{
			filename: 'florence-and-the-machine.jpg',
			image: 'img5.jpg'
		},
		{
			filename: 'tove-lo.jpg',
			image: 'img1.jpg'
		},
		{
			filename: 'the-civil-wars.jpg',
			image: 'img2.jpg'
		},
		{
			filename: 'st-vincent.jpg',
			image: 'img3.jpg'
		},
		{
			filename: 'st-vincent2.jpg',
			image: 'img4.jpg'
		},
		{
			filename: 'florence-and-the-machine.png',
			image: 'img5.jpg'
		}
	];

	for(var i=0; i<26; i++){
		vm.assetList.push(
			{	
				filename: "TEST ENTRY"+i,
				image: 'img'+(i%5+1)+'.jpg'
			}
		);
	}
}

angular
  .module('AssetManager')
  .service('MainService', MainService);
