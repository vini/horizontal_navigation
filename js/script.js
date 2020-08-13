var currentElement = $('.inicio');

var widthViewport = $(window).width();
var heightViewport = $(window).height();

var scrollIsRunning = false;

plbCurrentItem = $('#plb_planejamento');

wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       false,       // default
  live:         true        // default
  }
                  )
  wow.init();

function scrollToLeft(element) {
  
  currentElement = element;
  console.log(currentElement.attr('class'));

  $('html, body').animate({
    scrollLeft: element.position().left,
  }, 1000, function() {
    scrollIsRunning = false;
    $('.dots li span').removeClass('active');
    $('.dots li span.dot-' + currentElement.attr('id')).addClass('active');

    //$(currentElement).find('.wow').removeClass('wow').addClass('animated fadeInUp');
    //new WOW().init();
    //AOS.refresh();
  });

}

$(document).ready(function() {

  scrollToLeft(currentElement);

  /* SET WIDTH FOR SCROLL ON DESKTOP */
  if(widthViewport > 768) {
    $('body').width(widthViewport * 4);
    $('.section').width(widthViewport);

    $('#menu-desktop').height(heightViewport);
  }
  /* */

  /* HAMB MENU */
  $('#hamb_text_menu').on('click', function() {
      
      $('#nav-icon3').toggleClass('open');

      if($('#nav-icon3').hasClass('open')) {


        $('#hamb_text_menu').animate(
          {
            'top': '-=90',
          }
        , 500, function() {
          $('#hamb_text_menu').css({
            'top': '25px',
            'left': '0px',
          });
            $('#hamb_text_menu strong').text('FECHAR');
        });

        var calcMenuHeight = $(window).outerHeight();
        $('#menu-mobile').css('height', calcMenuHeight + 'px');
      
        $('#overlay').fadeIn('fast', function() {

          $('.header').css({
            'width': '100%',
            'height': '100%'
          });
                
          $('#hamb_text_menu').animate({'left': '+=15'}, 200, function() {

            $('#menu-mobile').fadeIn('fast', function() {

              $('#menu-mobile li a').each(function(i) {
                var delay = 0;
                if(i > 0) {
                  delay = 100;
                }
                
                $(this).delay(delay*(i+1)).animate({'margin-left': '+=30'}, 100)
              });  

            });  
      
          });			  

        });
      
    } else {

      $('#hamb_text_menu').animate({'left': '-=15'}, 200, function() {

        $('#hamb_text_menu').animate({
          'top': '-=90',
          'left': '-=32',
        }, 300, function() {

          $('#menu-mobile li a').each(function(i) {
        
            var delay = 0;
            
            if(i > 0) {
              delay = 100;
            }
    
            $(this).delay(delay*(i+1)).animate({'margin-left': '-=30'}, 50)
          }).promise().done(function() {
    
            $('#menu-mobile').animate({"left": '-=580'}, 300, function() {
              
              $('#hamb_text_menu').css({'left': '0px'});
              
              $('#menu-mobile').fadeOut('fast', function() {

                $('.header').animate({
                  "width": '64px',
                  'height': '55px',
                }, 300, function() {

                  $('#overlay').fadeOut('fast', function() {
                    $('#hamb_text_menu').animate(
                      {'top': '+=64'}, 200, function() {

                        $('#menu-desktop').fadeIn('fast');  

                      });
                  });
    
                }); 
        
              });
        
            });
    
          });			
    
        });				

        $('#hamb_text_menu strong').text('MENU');
         
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

  $('.section.nosso-jeito-2 h3 > span').on('click', function() {
    
    var target = $(this).attr('id');

    $('.section.nosso-jeito-2 h3 span').removeClass('active');

      $('.section.nosso-jeito-2 .plb-img').stop().fadeOut('slow', function() {

        $('#'+target).addClass('active')
        $('#'+target+'_img').stop().fadeIn('slow');
    
      });    

  });

  $('#lk_contato').on('click', function(e) {
    scrollToLeft($('.contato'));
  });

});



if(widthViewport > 768) {

  /*
  $(window).keypress(function(e) {
    switch(e.keyCode) { 
        case 37:
            //left arrow pressed
            console.log('left arrow pressed');
            if(scrollIsRunning == false && !currentElement.hasClass('contato')) {
        
              scrollIsRunning = true;
      
                if(currentElement.hasClass('contato')) {
                
                  scrollToLeft($('.inicio'));    
                
                } else {
      
                  scrollToLeft(currentElement.next());    
                
                }
      
            }
      break;
        case 39:
            //right arrow pressed
            if(scrollIsRunning == false && !currentElement.hasClass('inicio')) {
        
              scrollIsRunning = true;
      
              if(currentElement.hasClass('contato')) {
                
                scrollToLeft($('.contato').prev());    
              
              } else {
      
                scrollToLeft(currentElement.prev());    
              
              }
      
            }
      
        break;
    }
  });
  */
  
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