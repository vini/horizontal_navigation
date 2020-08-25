var currentElement = $('.inicio');

var widthViewport = $(window).width();
var heightViewport = $(window).height();

var scrollIsRunning = false;

plbCurrentItem = $('#plb_planejamento');

function scrollToLeft(element) {
    
  currentElement = element;

  if(currentElement.hasClass('trabalhos-case')) {
    currentElement.closest('.section').css({
      'height': 'auto',
      'overflow': 'auto'
    });
  } else {
    $('.trabalhos-case').css({
      'height': '100%',
      'overflow': 'hidden'
    });
  }

  $('html, body').animate({
    scrollLeft: element.position().left,
  }, 1000, function() {
    scrollIsRunning = false;
    $('.dots li span').removeClass('active');
    $('.dots li span.dot-' + currentElement.attr('id')).addClass('active');

    $('second-section').hide();

    if(currentElement.attr('id') == 'inicio' || currentElement.attr('id') == 'contato') {
      $('.header').addClass('menu-transparent');
    } else {
      $('.header').removeClass('menu-transparent');
    }

  });

}

$(document).ready(function() {

  /* SET WIDTH FOR SCROLL ON DESKTOP */
  if(widthViewport > 768) {
    
    $('body').width(widthViewport * 12);
    $('.section').width(widthViewport);
    $('.section').height(heightViewport + 36);
    //$('.wrap-part-sections').height(heightViewport * 3);
    //$('#menu-desktop').height(heightViewport);

    scrollToLeft(currentElement);

    $('.logo-jambo').addClass('slideInFromLeft');  
  
    $('.header').animate({
      left: 0,
    }, 750);
  
  }

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

  $('.bt-ver-case').on('click', function (e) {
    e.preventDefault();

    if(widthViewport > 768) {
    
      scrollToLeft(currentElement.next());
    
    } else {

      $('html, body').animate({
        scrollTop: $('.trabalhos-case').offset().top
      }, 2000);
    
    }

  })

  /*
  $('.section.nosso-jeito h3 > span').on('click', function() {
    
    var target = $(this).attr('id');

    $('.section.nosso-jeito h3 span').removeClass('active');

      $('.section.nosso-jeito .plb-img').stop().fadeOut('slow', function() {

        $('#'+target).addClass('active')
        $('#'+target+'_img').stop().fadeIn('slow');
    
      });    

  });
  */

  $('#lk_contato').on('click', function(e) {
    scrollToLeft($('.contato'));
  });

  $('#lista_trabalhos li a').on('click', function(e) {
    e.preventDefault();

    $('#lista_trabalhos li').removeClass('active');

    $(this).parent().addClass('active');

    var target = $(this).attr('href').replace(/#/, "");

    $('.trabalhos-case .container-case').hide();
    $('.trabalhos-case .container-'+target).show();

    $('.box-case').fadeOut('fast', function() {
      $('#box_case_'+target).fadeIn();
    });

  });

  $('.bt-section-voltar').on('click', function(e) {
    e.preventDefault();

    /*
    var goto = $(this).data('goto');

    $('#'+goto).show();

    $('html, body').animate({
      scrollTop: $('#'+goto).offset().top
    }, 1000); 
    */

    scrollToLeft($('#trabalhos'));  

  });


  $('.bt-ir-para-contato').on('click', function(e) {
    e.preventDefault();

    scrollToLeft($('#contato'));  

  });


  $('.bt-section-continuar').on('click', function(e) {
    e.preventDefault();

    var goto = $(this).closest('.part-section').next('.part-section');

    $('html, body').animate({
      scrollTop: goto.offset().top
    }, 1000, function() {
    });

  });


});



if(widthViewport > 768) {

  $(window).on('wheel', function(event){

    // deltaY obviously records vertical scroll, deltaX and deltaZ exist too
    if(event.originalEvent.deltaY < 0){
      
      // wheeled up
      console.log('scroll up ;)');
      if(scrollIsRunning == false && !currentElement.hasClass('inicio')) {
        
        scrollIsRunning = true;

        if(currentElement.hasClass('contato')) {
          
          scrollToLeft($('.contato').prev());    
        
        } else {

          scrollToLeft(currentElement.prev());    
        
        }

      }

    } else {

      // wheeled down
      console.log('scroll down ;)');

      if(scrollIsRunning == false && !currentElement.hasClass('contato')) {
        
        scrollIsRunning = true;

          if(currentElement.hasClass('contato')) {
          
            scrollToLeft($('.inicio'));    
          
          } else {
            
            scrollToLeft(currentElement.next());    
          
          }

      }
      
    }

  });
}