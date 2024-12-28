/*MENU*/
var $window = $(window);
var $header = $('#header');
var $footer = $('#footer');
var $inview = $('#header .inview');
var $navigation = $('#header .navigation');
var $absBox = $('.abs-container');
var $blankHeader = $('#blank-header');
var $blankFooter = $('#blank-footer');
var $standardBox = $('.standard');

var timer = null;

function mouseEnterAction(){
  if (timer == null){
    $inview.show();
    $navigation.show();
    showNavBar(true);
  }else{
    clearTimeout(timer);
    timer = null;
  }
}

function mouseLeaveAction(){
  $inview.show();
  $navigation.show();
  showNavBar(false);
  $header.one('mouseover', function(){
    mouseEnterAction();
  });
}

function showNavBar(show){
  if (show){
    $navigation.stop(false,true).delay(250).animate({
      marginTop: 0
    },'fast');
    $inview.stop(false,true).animate({
      marginTop: -1 * $header.height()
    },'slow', 'easeInOutBack');
  }else{
    $inview.stop(false,true).animate({
      marginTop: 0
    },'slow', 'easeInOutBack');
    $navigation.stop(false,true).animate({
      marginTop: -1 * $header.height()
    },'fast');
  }
}

function introMenuAnimation(){
  if (!$header.data('opened')){
    $header.data('opened', true);

    showNavBar(true);

    timer = setTimeout(function(){
      clearTimeout(timer);
      timer = null;
      $inview.show();
      $header.one('mouseover', function(){
        mouseEnterAction();
      });

      $header.bind('mouseleave', function(){
        mouseLeaveAction();
      });
      showNavBar(false);
    },2500);
  }

}

$(document).ready(function(){

  function centerAbsoluteContainer(){
    $absBox.each(function(){
      var $box = $(this);
      var minTop = parseInt($box.attr('min-top'));
      var centerTop = ($window.height()/2) - ($box.height()/2);

      centerTop = centerTop > minTop ? centerTop : minTop;
      $box.css({
        top:centerTop
      });
    });
  }

  function setStandardBoxHeight(){

    var newHeight = $window.height() - $header.height() - $footer.height();

    if (newHeight > $standardBox.children().height()){
      $standardBox.height(newHeight);
    }else{
      $standardBox.height($standardBox.children().height());
    }
  }

  $window.bind('resize', function(){
    centerAbsoluteContainer();
    setStandardBoxHeight();
  });

  $('#view-cart').click(function(e){
    e.preventDefault();
    $('#form-view-cart button').click();
  });

  $navigation.css({
    marginTop: -1 * $navigation.height()
  });
  $blankHeader.height($header.height() - 6);
  $blankFooter.height($footer.height());
  centerAbsoluteContainer();
  setStandardBoxHeight();
});

$(window).load(function(){
  introMenuAnimation();
});

// Init bica
if (!$('body').hasClass('home')) {
  bica.init({
    infoUrl: 'cookies-policy.php'
  });
}
