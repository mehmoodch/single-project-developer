$(document).ready(function(){
  
  var $window = $(window);
  var $introBox = $('#intro');
  var $rotationBox = $('#rotation');
  var $containerBox = $('#rotation .container');
  var $bags = $('#rotation .bag-angle');
  var blankHeight = 200;
  var index = -1;
  
  var $blankOpen = $('<div class="bag-blank"></div>');
  $blankOpen.height($window.height() + blankHeight).appendTo($('#bag-blank-space'));
  
  $bags.each(function(index){
    var $blank = $('<div class="bag-blank" rel="bag' + index + '"></div>');
    $blank.height(blankHeight).appendTo($('#bag-blank-space'));
  });
  
  $('.bag-blank:last').height(blankHeight/2);
  
  $window.bind('scroll', function(){
    var opacity = ($window.scrollTop()) / (($window.height()));
    if (opacity <= 1){
      if ($window.scrollTop() <= $introBox.height()){
        $rotationBox.css({opacity: opacity});
      }
    }else{
      $rotationBox.css({opacity: 1});
    }
    
    $('#bag-blank-space .bag-blank').each(function(i){   
      if ($window.scrollTop() > $(this).position().top){
        index = i;
      }   
    });
    
    if (index < $bags.length){
    
      var $toShow =  $('#rotation .bag-angle:eq(' + index + ')');
      var $toHide = $('#rotation .bag-angle.show');
    
      if (!$toShow.hasClass('show')){
        $toShow.addClass('show');
        $toHide.removeClass('show');

        var $popup = $('.popup .item#' + $toShow.attr('rel'));

        if ($popup.length > 0 && !$rotationBox.is(':animated') && $rotationBox.position().top >= 0){
          if (!$popup.hasClass('show') && !$rotationBox.hasClass('hide')){
              $('.popup .item.show').removeClass('show').stop(false,true).animate({opacity:0},'fast');
              if ($rotationBox.position().top >= 0){
                $popup.addClass('show').stop(false,true).animate({opacity:1},'fast');
              }
          }
        }else{
          $('.popup .item.show').removeClass('show').stop(false,true).animate({opacity:0},'fast');
        }

        $containerBox.css({left: -1 * index * $window.width()});
      }
      
      if ($rotationBox.hasClass('hide')){
        $rotationBox.removeClass('hide');
        $('#payoffs .payoff-item:not(:first)').css({opacity:0});
        $('#payoffs .payoff-item:first').addClass('show').animate({
          opacity:0
        },'slow', function(){
            $('.payoff-bg-text').css({opacity:0});
            $('.popup .item').stop().css({opacity:0}).show();
            $rotationBox.stop(true,true).animate({top: 0},'slow', 'easeInOutBack',function(){$('.popup .item.show').stop().animate({opacity:1})});
        });
      }
    }
    
    
  });
  
  $window.bind('resize', function(){

    $('.bag-blank:first').height($window.height() + blankHeight);
    $('.bag-blank:last').height(blankHeight/2);
    
    $bags.width($window.width());
    $bags.height($window.height());
    
    $containerBox.css({left: -1 * index * $window.width()});
  });
  
  $bags.width($window.width());
  $bags.height($window.height());
  
});

