var widthViewport = $(window).width();
var heightViewport = $(window).height();

var scrollIsRunning = false;
var currentElement = $('.inicio');

plbCurrentItem = $('#plb_planejamento');

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

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

    currentElement.find('.has-animation').addClass(currentElement.find('.has-animation').data('animation'));

    if(currentElement.hasClass('trabalhos')) {
      
      $('.trabalhos-case').hide();

    }

    if(currentElement.attr('id') == 'inicio' || currentElement.attr('id') == 'contato') {

      $('.header').addClass('menu-transparent');
    
    } else {
    
      $('.header').removeClass('menu-transparent');
    
    }

  });

}

$(window).on('load', function() {
  $('#loading').fadeOut('slow', function() {
    //animateCSS('.logo-jambo', 'fadeInTopLeft').then((message) => {
      // Do something after the animation
    //});
  });
});

$(document).ready(function() {

  /* SET WIDTH FOR SCROLL ON DESKTOP */
  if(widthViewport > 768) {
    
    $('body').width(widthViewport * 12);
    $('.section').width(widthViewport);
    $('.section').height(heightViewport + 36);

    //scrollToLeft(currentElement);
  
  } else {

    $('.nosso-jeito .has-animation').addClass('animation-line-through');

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

    var target = $(this).data('case');

    if(widthViewport > 768) {
    
      $('.trabalhos-case').show(0, function() {
        $('.container-case').hide(0, function() {
          $('.container-'+target).show(0, function() {
            scrollToLeft($('.trabalhos-case'));
          });
        });
      });

    } else {

      $('html, body').animate({
        scrollTop: $('.trabalhos-case').offset().top
      }, 2000);
    
    }

  });

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
      $('.container-case').removeClass('active');
      $('.container-'+target).addClass('active');

      if(widthViewport < 768) {
        $('.container-case').hide();
        $('.container-'+target).show();
      }

    });

  });

  $('.bt-navigation-case').on('click', function(e) {
    
    e.preventDefault();
    var decision = $(this).data('decision');

    if(decision == 'continue') {

      var currentTarget = currentElement.find('.container-case.active .part-section.active');
      var nextTarget = currentTarget.next(); 

      $('html, body').animate({ scrollTop: nextTarget.offset().top }, 1000, function() {
      
        currentTarget.removeClass('active');
        nextTarget.addClass('active');
        scrollIsRunning = false;

      });
    
    } else {

      if(decision == 'back') {
        
        scrollToLeft($('.trabalhos'));    
        $('.container-case').removeClass('active');
        $('.container-case .part-section').removeClass('active');
        $('.container-case .part-section.first-section').addClass('active');  
        var targetCase = $('#lista_trabalhos li.active a').attr('href').replace(/#/, "");
        $('.container-'+targetCase).addClass('active');   

      }

    }

  });


});

isInLastSection = false;

if(widthViewport > 768) {

  $(window).on('wheel', function(event){

    // deltaY obviously records vertical scroll, deltaX and deltaZ exist too
    if(event.originalEvent.deltaY < 0){
      
      // wheeled up
      console.log('scroll up ;)');

      if(scrollIsRunning == false && !currentElement.hasClass('inicio')) {
        
        scrollIsRunning = true;

        if(currentElement.hasClass('contato')) {
          
          scrollToLeft($('.trabalhos'));    
        
        } else {

          if(currentElement.hasClass('trabalhos-case')) {

            console.log('tem trabalhos-case');
            
            var currentTarget = currentElement.find('.container-case.active .part-section.active');
            var nextTarget = currentTarget.prev(); 

            if(nextTarget.length) {

              $('html, body').animate({ scrollTop: nextTarget.offset().top }, 1000, function() {
              
                currentTarget.removeClass('active');
                nextTarget.addClass('active');
                scrollIsRunning = false;

              });

            } else {

              scrollToLeft($('.trabalhos'));    
              $('.container-case').removeClass('active');
              $('.container-case .part-section').removeClass('active');
              $('.container-case .part-section.first-section').addClass('active');  
              var targetCase = $('#lista_trabalhos li.active a').attr('href').replace(/#/, "");
              $('.container-'+targetCase).addClass('active');   

            }

          } else {
          
            scrollToLeft(currentElement.prev()); 
            $('.container-case').removeClass('active');
            $('.container-case .part-section').removeClass('active');
            $('.container-case .part-section.first-section').addClass('active');  
            var targetCase = $('#lista_trabalhos li.active a').attr('href').replace(/#/, "");
            $('.container-'+targetCase).addClass('active'); 
            
          }

        }

      }

    } else {

      // wheeled down
      console.log('scroll down ;)');

      if(scrollIsRunning == false && !currentElement.hasClass('contato')) {
        
        scrollIsRunning = true;

        if(currentElement.hasClass('inicio')) {
          animateCSS('.logo-jambo', 'fadeOutBottomLeft').then((message) => {
            // Do something after the animation
          });
        }      

          if(currentElement.hasClass('trabalhos')) {
            
            scrollToLeft($('.contato'));
          
          } else {     
            
              if(currentElement.hasClass('contato')) {
              
                scrollToLeft($('.inicio'));    
              
              } else {

                if(currentElement.hasClass('trabalhos-case')) {
                  
                  var currentTarget = currentElement.find('.container-case.active .part-section.active');
                  var nextTarget = currentTarget.next(); 

                  if(nextTarget.length) {
      
                    $('html, body').animate({ scrollTop: nextTarget.offset().top }, 1000, function() {
                    
                      currentTarget.removeClass('active');
                      nextTarget.addClass('active');

                      if(nextTarget.hasClass('last-section')) {
                        isInLastSection = true;
                      } else {
                        isInLastSection = false;
                      }

                      scrollIsRunning = false;
        
                    });

                  } else {

                    scrollToLeft($('.trabalhos'));    
                    $('.container-case').removeClass('active');
                    $('.container-case .part-section').removeClass('active');
                    $('.container-case .part-section.first-section').addClass('active');  
                    var targetCase = $('#lista_trabalhos li.active a').attr('href').replace(/#/, "");
                    $('.container-'+targetCase).addClass('active');   

                  }
      
                } else {
      
                  scrollToLeft(currentElement.next());    
                  $('.container-case').removeClass('active');
                  $('.container-case .part-section').removeClass('active');
                  $('.container-case .part-section.first-section').addClass('active');  
                  var targetCase = $('#lista_trabalhos li.active a').attr('href').replace(/#/, "");
                  $('.container-'+targetCase).addClass('active'); 
                             
                }                      
              
              }

            //}

          }

      }
      
    }

  });
}