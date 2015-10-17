$(document).ready(function () {
  'use strict';

  var add_weather_emo = function() {
      // rain, cloudy, sunny, cold
      var metaNodes = $('.post-meta'),
      weatherNodes = $('.post-weather'),
      weather_hash = {
        rain: 'wi-rain',
        cloudy: 'wi-cloudy',
        sunny: 'wi-day-sunny',
        cold: 'wi-snow'
      },
      weather_arr = [],
          // happy, sad, okay
          emoNodes = $('.post-emoticon'),
          emo_arr = [];

          /* -- Add weather -- */
          metaNodes.each(function (index) {
            var matched_weather = $(this).text().match('rain|cloudy|sunny|cold');
            weather_arr.push((matched_weather == null ? 'sunny' : matched_weather).toString());
          });

          weatherNodes.each(function (index) {
            if ($(window).width() >= 500) {
              var $weather_ele = $("<i/>").addClass(weather_hash[weather_arr[index]]);
              $(this).html($weather_ele);
            }
          });

          /* -- Add mood -- */
          metaNodes.each(function (index) {
            var matched_mood = $(this).text().match('happy|sad|okay');
            emo_arr.push((matched_mood == null ? 'okay' : matched_mood).toString());
          });

          emoNodes.each(function (index) {
            if ($(window).width() >= 500) {
              $(this).addClass(emo_arr[index]);
            }
          });
        };

  //Function check menu opened
  function move_scroll_icon() {
    if (menu_open()) {
      $('.scrollup').removeClass('scroll-right');
      $('.scrollup').addClass('scroll-left');
    } else {
      $('.scrollup').removeClass('scroll-left');
      $('.scrollup').addClass('scroll-right');
    }
  };

  //Function generate background
  function getbg() {
    var d = new Date(),
    today = parseInt(d.getDate(), 10),
    bg = '1.png';

    if (today <= 5) {
      bg = '6.png';
    } else if (today <= 10) {
      bg = '5.png';
    } else if (today <= 15) {
      bg = '4.png';
    } else if (today <= 20) {
      bg = '3.png';
    } else if (today <= 25) {
      bg = '2.png';
    } else {
      bg = '1.png';
    }
    return bg;
  };

  function menu_open() {
    return ($('#menu').css('right') == '0px');
  };
  /* -- Responsive Text and Video -- */
  $('#box').fitText(1.2, {
    minFontSize: '40px',
    maxFontSize: '90px'
  });
  $('.post-title').fitText(1.2, {
    minFontSize: '20px',
    maxFontSize: '40px'
  });
  $('.post').fitVids();

  /* -- Handle menu event -- */
  $('.toggle-icon').click(function () {
    if (menu_open()) {
      $('#menu').css('right', '-280px');
      $('.scrollup').removeClass('scroll-left');
      $('.scrollup').addClass('scroll-right');
    } else {
      $('#menu').css('right', '0');
      $('.scrollup').removeClass('scroll-right');
      $('.scrollup').addClass('scroll-left');
    }
  });

  $(document).click(function (event) {
    if ($(event.target).parents().index($('#menu')) == -1) {
      if (menu_open()) {
        $('#menu').css('right', '-280px');
        $('.scrollup').removeClass('scroll-left');
        $('.scrollup').addClass('scroll-right');
      }
    }
  });

  /* -- Change Background -- */
  $('body').css('background', 'url("/assets/imgs/bg/"' + getbg() + '")');

  $(window).scroll(function () {
    /* -- Scroll to Top -- */
    if ($(this).scrollTop() > 100) {
            //Display it
            $('.scrollup').fadeIn();
          } else {
            $('.scrollup').fadeOut();
          }
        });

  $('.scrollup').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

    //get_feature_image();
    add_weather_emo();
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
