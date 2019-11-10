$(function() {

  $("#dropdown1").on("click", function(e) {
    $(".dropdown-1").toggleClass("active");
  });

  $("#dropdown2").on("click", function(e) {
    $(".dropdown-2").toggleClass("active");
  });

  let menu_btn = $(".menu-btn");
  let menu_btn_active = $(".menu-btn_active");
  let menu = $(".menu");
  menu_btn.click(function(){
    menu_btn.toggleClass("menu-btn_active");
    menu.toggleClass("menu_active");
  });
  menu_btn_active.click(function(){
    menu_btn.removeClass("menu-btn_active");
  });

  $('.slider-wrapper').slick({
    arrows: false,
    dots: true,
  });


  var $carousel;
  var $slickCache;
  var previousFilter = '';
  var currentFilter = 'all';
  var filtered = 'false';
  
  $('.tourism').on('click', 'button', function(event){
      console.log(this, event.currentTarget.value);
      filterHandler(event.currentTarget.value);
  });
  
  /**
   * Filter function for carousel
   * @param  {String} [tag=''] filter string to be applied
   */
  filterHandler = function(tag) {
      var query = '[data-tags*="' + tag + '"]';
      var slick = $carousel[0].slick;
  
      // Removes filter state if cache is active ( indicates a filter is applied).
      // Work around for https://github.com/kenwheeler/slick/issues/3161
      if (slick.$slidesCache !== null) {
          slick.unload();
          slick.$slideTrack.children(slick.options.slide).remove();
          $slickCache.appendTo(slick.$slideTrack);
          slick.reinit();
          slick.goTo(0);
      }
  
      // Store a deep copy of the original carousel
      $slickCache = slick.$slides.clone(true, true);
  
      // Store the previous filter for reference
      previousFilter = currentFilter;
  
      // If the filter is being removed
      if (tag === '' || tag === 'all') {
  
          // Store useful properties. Log
          filtered = false;
          currentFilter = '';
  
      // A filter is being applied
      } else {
          // Pass custom function to slick to query UI for our target
          slick.filterSlides(function(index, element) {
              return $(element).find(query).length > 0;
          });
  
          // Reset slider position
          slick.goTo(0);
  
          // Store useful properties.
          filtered = true;
          currentFilter = tag;
      }
  
      return currentFilter;
  }
  
  
  
  /*----------  Carousel Slick ----------*/
  $carousel = $('.slick').slick({
    nextArrow: '<button type="button" class="slick-next"></button>', 
    prevArrow: '<button type="button" class="slick-prev"></button>', 
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    responsive:[
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 680,
        settings:{
          slidesToShow: 1
        }
      },
    ]
    
    
  });
  
  // $(".tourism li").on("click", function(e) {
  //   $("li").toggleClass("active");
  // });
  
});
