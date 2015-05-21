angular.module('AssetManager', [
  'ngRoute'
]).config(function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
    $routeProvider
      .when('/', {
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

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


function deleteAsset ($timeout, MainService) {
  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {
      console.log("deleteAsset");
      element.on('click', function () {
        $('.content-list').eq(attrs.id).velocity(
          { 
            opacity: 0,
            height:0
          },
          { 
            duration: 500,
            easing: "easeOutSine",
            complete: function() { 
              MainService.removeAsset(attrs.id);
              scope.$apply();
            }
          });
      });

      var toggleBtn = function(){
        $(this).parent().toggleClass('warning');
      };

      element.on('mouseout', toggleBtn);
      element.on('mouseenter', toggleBtn);

    }
  };
}


function uploadAsset ($timeout, MainService) {
  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {

      var onUpload = function () {

        if($(element).hasClass('upload')) return false;

        var icon = $(this).children('.material-icon'),
            copy = $(this).children('.upload-copy');

        $(element).addClass('upload');
        icon.addClass('upload');
        copy.text("uploading");

        $timeout(function(){
          icon.addClass('fill');
        },1000);

        $timeout(function(){
          icon.removeClass('fill upload');
          $(element).removeClass('upload');
          copy.text("new image");
        },8000);

      };

      element.on('click', onUpload);
    }
  };
}

function perPage (MainService) {
  return {
    restrict:'EA',
    link: function (scope,element,attrs) {
      var updateListLimit = function(){
        $(element).find("#curLimit").text($(this).text());
        setLimit($(this).text());
      };

      var setLimit = function(limit) {
        scope.$emit("newPageLimit",limit);
      };

      $(element).find("li").on('click', updateListLimit);
    }
  };
}

angular
  .module('AssetManager')
  .directive('deleteAsset', deleteAsset)
  .directive('uploadAsset', uploadAsset)
  .directive('perPage', perPage);
  

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
