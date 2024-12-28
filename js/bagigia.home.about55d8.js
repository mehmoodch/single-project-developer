$(document).ready(function(){
  
  var $window = $(window);
  var $aboutBox = $('#about');
  var $aboutContainer = $('#about .container');
  var $aboutItems = $('#about .container .about-item');
  var $aboutMenu = $('#about .about-menu');
  var $aboutAnchorDesigner = $('#about .about-menu #anchor-designer');
  var $aboutAnchorManufacture = $('#about .about-menu #anchor-manufacture');
  var $textDesign = $('#about .container .about-item#designer .block.design');
  var $textIdea = $('#about .container .about-item#designer .block.idea');
  
  var $aboutDesigner = $('#about .about-item#designer');
  var $aboutManufacture = $('#about .about-item#manufacture');
  
  var $aboutBlankHeight = 700;
  
  $('<div class="about-blank" rel="designer"></div>').height($aboutBlankHeight).appendTo($('#about-blank-space'));
  $('<div class="about-blank" rel="idea"></div>').height($aboutBlankHeight).appendTo($('#about-blank-space'));
  $('<div class="about-blank" rel="manufacture"></div>').height($aboutBlankHeight).appendTo($('#about-blank-space'));
  
  $aboutDesigner.width($window.width());
  $aboutDesigner.height($window.height());
  $aboutManufacture.width($window.width());
  $aboutManufacture.height($window.height());
  
  $window.bind('resize', function(){
  
    $aboutDesigner.width($window.width());
    $aboutDesigner.height($window.height());
    $aboutManufacture.width($window.width());
    $aboutManufacture.height($window.height());
    
    var left = $aboutItems.index($('.about-item.show'));
    if (left == 1){
      left = 0;
    }else if (left > 1){
      left = 1;
    }
    
    $aboutContainer.css({
      left: -1 * left * $window.width()
    });

    resizeImages($('.manufacture-bg img'));
    
  });
  
  $window.bind('scroll', function(){
    
    var index = null;
    
    $('#about-blank-space .about-blank').each(function(i){   
      if ($window.scrollTop() >= $(this).position().top){
        index = i;
      }
    });
    
    if (index != null && index < $('#about-blank-space .about-blank').length){
      
      if (!$aboutBox.hasClass('show')){
        $('#payoffs .payoff-item:not(:last)').css({opacity:0});
        $('#payoffs .payoff-item:last').addClass('show').stop(true,true).animate({opacity:0},'slow');
        $aboutMenu.show();
        $('.payoff-bg-text').stop(true,true).animate({opacity: 0}, 'slow');
        $aboutBox.addClass('show').stop(true,true).animate({opacity: 1}, 'slow');        
        $('.about-item.show').removeClass('show');
        $('.about-item:first').addClass('show');
      }
       
      var $toShow = $('#about .container .about-item:eq(' + index + ')');
      if (!$toShow.hasClass('show')){
        
        var offset = 1;
        
        $('#about .container .about-item.show').removeClass('show');
        $toShow.addClass('show');
        
        if ($toShow.attr('id') == 'designer'){
          $textDesign.stop(true,true).animate({opacity:1});
          $textIdea.stop(true,true).animate({opacity:0});
          offset = 0;
          $aboutAnchorDesigner.addClass('selected');
          $aboutAnchorManufacture.removeClass('selected');
        }else if ($toShow.attr('id') == 'idea'){
          $textDesign.stop(true,true).animate({opacity:0});
          $textIdea.stop(true,true).animate({opacity:1});
          offset = 0;
          $aboutAnchorDesigner.addClass('selected');
          $aboutAnchorManufacture.removeClass('selected');
        }else{
          $aboutAnchorDesigner.removeClass('selected');
          $aboutAnchorManufacture.addClass('selected');
        }
        
        $aboutContainer.stop(true,true).animate({
          left: -1 * offset * $window.width()
        }, 'slow', 'easeInOutExpo');    
      }
    }else{
      if ($aboutBox.hasClass('show')){
        $aboutBox.removeClass('show').stop(true,true).animate({opacity:0},'slow', function(){$aboutMenu.hide();});
        $('#payoffs .payoff-item:last').addClass('show').stop(true,true).animate({
          opacity:1
        },'slow');
        $('.payoff-bg-text:last').stop(true,true).delay(800).animate({opacity: 1}, 'slow');
      }
    }
  });
  
  $aboutBox.css({
    opacity:0
  });
  
  $textIdea.css({opacity:0});
  
  $aboutAnchorManufacture.click(function(e){
    e.preventDefault();
    if (!$(this).hasClass('selected')){
      //$('html,body').scrollTop($('.about-blank[rel=manufacture]').position().top);
      window.scrollTo(0, $('.about-blank[rel=manufacture]').position().top);
    }
  });
  
  $aboutAnchorDesigner.click(function(e){
    e.preventDefault();
    if (!$(this).hasClass('selected')){
      //$('html,body').scrollTop($('.about-blank[rel=designer]').position().top);
      window.scrollTo(0, $('.about-blank[rel=designer]').position().top);
    }
  });

  /*MANUFACTURE*/

  $(".manufacture-bg img.show").css({opacity:1});

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
    var $images = $(".manufacture-bg img")

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
  $('#manufacture .bg-switcher .button:not(:first)').css({opacity: 0.5});

  $('#manufacture .bg-switcher .button').hover(function(){
    var $el = $(this);

    if (!$el.hasClass('selected')){
      $('#manufacture .bg-switcher .button').not($el).stop(true,false).animate({opacity:0.5});
      $el.stop(true,true).animate({opacity:1});
    }

  }, function(){
    var $currentSelected = $('#manufacture .bg-switcher .button.selected');
    $('#manufacture .bg-switcher .button').not($currentSelected).stop(true,true).animate({opacity:0.5});
    $currentSelected.stop(true,false).animate({opacity:1});
  });

  $('#manufacture .bg-switcher .button').click(function(e){
    e.preventDefault();
    var $clicked = $(this);

    if (!$clicked.hasClass('selected')){
      var $currentSelected = $('#manufacture .bg-switcher .button.selected');
      $currentSelected.removeClass('selected');
      $clicked.addClass('selected');

      var $bgToShow = $($clicked.attr('href'));
      var $bgToHide = $(".manufacture-bg img.show");

      $bgToHide.removeClass('show').stop(true,true).animate({opacity:0},'slow');
      $bgToShow.addClass('show').stop(true,true).animate({opacity:1},'slow');

      if ($clicked.hasClass('reset')){
        $('#manufacture .text').stop(true,true).animate({opacity:1});
      }else{
        $('#manufacture .text').stop(true,true).animate({opacity:0});
      }

  }


  });

});

