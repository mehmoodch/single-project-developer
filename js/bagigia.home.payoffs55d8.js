$(document).ready(function(){
  
  var $window = $(window);
  var $rotationBox = $('#rotation');
  var $payoffItem = $('#payoffs .payoff-item');
  var $payoffBlank = $('<div class="payoff-blank" rel="payoff0"></div>');
  var payoffBlankHeight = 800;
  
  $payoffBlank.height(payoffBlankHeight/4).appendTo($('#payoffs-blank-space'));
  
  $payoffItem.each(function(index){
    $(this).css({opacity: 0});
    var $payoffBlank = $('<div class="payoff-blank" rel="payoff' + (index + 1) + '"></div>');
    $payoffBlank.height(payoffBlankHeight).appendTo($('#payoffs-blank-space'));
  });
  
  $window.bind('resize', function(){
    
    if ($rotationBox.hasClass('hide')){
      $rotationBox.css({top: -1 * $window.height()});
    }
    
    $('.payoff-bg').each(function(){
      resizeImages($(this));
    });
    
  });
  
  $window.bind('scroll', function(){
    
   var index = null;
    
    $('#payoffs-blank-space .payoff-blank').each(function(i){   
      if ($window.scrollTop() > $(this).position().top){
        index = i;
      }   
    });
    
    if (index != null && index < $('.payoff-blank').length){
      
      if (!$rotationBox.hasClass('hide')){
        $rotationBox.addClass('hide');
        $('.popup .item').stop().css({opacity:0}).hide();
        $rotationBox.stop(true,true).animate({
          top: -1 * $window.height()
        },'slow', 'easeInOutBack', function(){
          $('.payoff-bg-text').css({opacity:0});
          $('.payoff-bg-text:first').stop(true,false).delay(500).animate({opacity:1}, 'slow');
          $('#payoffs .payoff-item.show').stop(true,false).animate({opacity: 1},'slow');
        });
      }
    
      if (index > 0) {
        var $toShow =  $('#payoffs .payoff-item:eq(' + (index - 1) + ')');
        var $toHide = $('#payoffs .payoff-item.show');
    
        if (!$toShow.hasClass('show')){
          $toShow.addClass('show');
          $toHide.removeClass('show');
          var $payoffText = $toShow.find('.payoff-bg-text');
        
          $('.payoff-bg-text').stop().animate({opacity:0}, 'slow');
         
          $toShow.stop().animate({opacity: 1}, 'slow');
          $toHide.stop().animate({opacity: 0}, 'slow');
          $payoffText.stop().delay(500).animate({opacity:1}, 'slow');
        }
      }
    }
  });
  
  function resizeImages(images){
    
    var newWidth = $window.width();
    var newHeight = $window.height();

    images.each(function(){
      var $img = $(this);
      $img.width(newWidth);

      $img.css({
        'width' : 'auto'
      });

      $img.height(newHeight);

      if ($img.width() < newWidth){
        $img.css({
          'width' : '100%',
          'height' : 'auto'
        });
        
        if ($img.height() < newHeight){
          $img.height(newHeight);
        }
      }
    });
  }
  
  function loadImages(){
    var $images = $('.payoff-bg');
    
    $images.each(function(){
      var $img = $(this);
      var src = $img.attr('src');
      
      if ($img[0].complete){
        resizeImages($img);
      }else{
        $img.load(function(){
          resizeImages($img);
        }).attr('src', src);
      }
    });
  }
  
  loadImages();
  
  
});