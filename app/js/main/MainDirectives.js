
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
  