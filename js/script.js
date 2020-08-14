var currentElement = $('.inicio');

var widthViewport = $(window).width();
var heightViewport = $(window).height();

var scrollIsRunning = false;

plbCurrentItem = $('#plb_planejamento');

function scrollToLeft(element) {
  
  currentElement = element;
  console.log(currentElement.attr('class'));

  $('html, body').animate({
    scrollLeft: element.position().left,
  }, 1000, function() {
    scrollIsRunning = false;
    $('.dots li span').removeClass('active');
    $('.dots li span.dot-' + currentElement.attr('id')).addClass('active');

    //AOS.refresh();
  });

}

$(document).ready(function() {

  scrollToLeft(currentElement);

  /* SET WIDTH FOR SCROLL ON DESKTOP */
  if(widthViewport > 768) {
    $('body').width(widthViewport * 5);
    $('.section').width(widthViewport);

    $('#menu-desktop').height(heightViewport);
  }
  /* */

  /* HAMB MENU */
  $('#hamb_text_menu').on('click', function() {
      
    $('#nav-icon3').toggleClass('open');

    if($('#nav-icon3').hasClass('open')) {

      $('#hamb_text_menu').animate({
        'top': '-=90',
      }, 500, function() {

        $('#hamb_text_menu').css({
          'top': '25px',
          'left': '0px',
        });

      });

      var calcMenuHeight = $(window).outerHeight();
      $('#menu-mobile').css('height', calcMenuHeight + 'px');
    
      $('#overlay').fadeIn('fast', function() {

        $('.header').css({
          'width': '100%',
          'height': '100%'
        });
              
        $('#hamb_text_menu').animate({'left': '+=15'}, 200, function() {

          $('#menu-mobile').fadeIn('fast');

        });			  

      });
      
    } else {

      $('#hamb_text_menu').animate({
        'left': '-=15'
      }, 200, function() {

        $('#hamb_text_menu').animate({
          'top': '-=90',
          'left': '-=32',
        }, 300, function() {
    
          $('#menu-mobile').animate({"left": '-=580'}, 300, function() {
            
            $('#hamb_text_menu').css({'left': '0px'});
            
            $('#menu-mobile').fadeOut('fast', function() {

              $('.header').animate({
                "width": '64px',
                'height': '55px',
              }, 300, function() {

                $('#overlay').fadeOut('fast', function() {
                  
                  $('#hamb_text_menu').animate({
                    'top': '+=64'
                  }, 200, function() {

                      $('#menu-desktop').fadeIn('fast');  

                  });

                });
  
              }); 
      
            });
    
          });			
    
        });				
         
      }); 

    }
  });
  
  $('#overlay').on('click', function() {
		if($('#nav-icon3').hasClass('open')) {
			$('#hamb_text_menu').trigger('click');
		}
	});	
  /* */

  

  $('ul.pages li a').on('click', function(e) {
    
    e.preventDefault();

    $('#hamb_text_menu #nav-icon3.open').trigger('click');

    var goto = $(this).data('goto');

    console.log(goto);

    if(widthViewport > 768) {
      scrollToLeft($('.' + goto));
    } else {
      $('html, body').animate({
        scrollTop: $('.' + goto).offset().top
    }, 2000);
    }

  });

  $('.section.nosso-jeito h3 > span').on('click', function() {
    
    var target = $(this).attr('id');

    $('.section.nosso-jeito h3 span').removeClass('active');

      $('.section.nosso-jeito .plb-img').stop().fadeOut('slow', function() {

        $('#'+target).addClass('active')
        $('#'+target+'_img').stop().fadeIn('slow');
    
      });    

  });

  $('#lk_contato').on('click', function(e) {
    scrollToLeft($('.contato'));
  });

});



if(widthViewport > 768) {

  
  $(window).on('wheel', function(event){

    // deltaY obviously records vertical scroll, deltaX and deltaZ exist too
    if(event.originalEvent.deltaY < 0){
      // wheeled up
      console.log('scroll up ;)');

      if(scrollIsRunning == false && !currentElement.hasClass('contato')) {
        
        scrollIsRunning = true;

          if(currentElement.hasClass('contato')) {
          
            scrollToLeft($('.inicio'));    
          
          } else {

            scrollToLeft(currentElement.next());    
          
          }

      }

    } else {

      // wheeled down
      console.log('scroll down ;)');

      if(scrollIsRunning == false && !currentElement.hasClass('inicio')) {
        
        scrollIsRunning = true;

        if(currentElement.hasClass('contato')) {
          
          scrollToLeft($('.contato').prev());    
        
        } else {

          scrollToLeft(currentElement.prev());    
        
        }

      }
      
    }

  });
}