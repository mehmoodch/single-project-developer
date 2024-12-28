$(document).ready(function(){
  var $window = $(window);
  var $document = $(this);
  
  var $footer = $('#footer');
  var $end = $('#end');
  var $zip = $('#zip');
  var $blankSpace = $('#end-blank-space');

  $footer.addClass('hide').css({opacity:0});
  $end.width($window.width());
  $end.height($window.height());

  $blankSpace.width($window.width());
  $blankSpace.height($window.height());

  $window.bind('resize', function(){
    $end.width($window.width());
    $end.height($window.height());

    $blankSpace.width($window.width());
    $blankSpace.height($window.height());

  });
  
  $window.bind('scroll', function(){

    if ($window.scrollTop() + $window.height() > $document.height() - 50){
        $footer.addClass('show').stop().animate({opacity:1},'slow');
    }else{
      
        if ($window.scrollTop() < $window.height()){   
          $zip.stop().animate({opacity: 0}, 'slow');
        }else{
          $zip.show();
          $zip.stop().animate({opacity:1},'slow');
        }
      
        $footer.removeClass('show').stop().animate({opacity:0},'slow');
    }
    
  });
});
