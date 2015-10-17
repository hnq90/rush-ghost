$(document).ready(function() {
    'use strict';

    var $scrol_up_ele = $('.scrollup');
    var $menu_ele = $('#menu');

    var add_weather_emo = function() {
        // rain, cloudy, sunny, cold
        var metaNodes = $('.post-meta'),
            weatherNodes = $('.post-weather'),
            weather_hash = {
                rain: 'wi wi-rain-mix',
                cloudy: 'wi wi-cloudy',
                sunny: 'wi wi-day-sunny',
                cold: 'wi wi-snow'
            },
            weather_arr = [],
            // happy, sad, okay
            emoNodes = $('.post-emoticon'),
            emo_arr = [];

        /* -- Add weather -- */
        metaNodes.each(function(index) {
            var matched_weather = $(this).text().match('rain|cloudy|sunny|cold');
            weather_arr.push((matched_weather == null ? 'sunny' : matched_weather).toString());
        });

        weatherNodes.each(function(index) {
            if ($(window).width() >= 500) {
                var $weather_ele = $("<i/>").addClass(weather_hash[weather_arr[index]]);
                $(this).html($weather_ele);
            }
        });

        /* -- Add mood -- */
        metaNodes.each(function(index) {
            var matched_mood = $(this).text().match('happy|sad|okay');
            emo_arr.push((matched_mood == null ? 'okay' : matched_mood).toString());
        });

        emoNodes.each(function(index) {
            if ($(window).width() >= 500) {
                $(this).addClass(emo_arr[index]);
            }
        });
    };

    //Function check menu opened
    var move_scroll_icon = function() {
        if (menu_open()) {
            $scrol_up_ele.removeClass('scroll-right');
            $scrol_up_ele.addClass('scroll-left');
        } else {
            $scrol_up_ele.removeClass('scroll-left');
            $scrol_up_ele.addClass('scroll-right');
        }
    };

    //Function generate background
    var getbg = function() {
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

    var menu_open = function() {
        return ($menu_ele.css('right') == '0px');
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
    $('.toggle-icon').click(function() {
        if (menu_open()) {
            $menu_ele.css('right', '-280px');
            $scrol_up_ele.removeClass('scroll-left');
            $scrol_up_ele.addClass('scroll-right');
        } else {
            $menu_ele.css('right', '0');
            $scrol_up_ele.removeClass('scroll-right');
            $scrol_up_ele.addClass('scroll-left');
        }
    });

    $(document).on('click', function() {
        if ($(event.target).parents().index($menu_ele) == -1) {
            if (menu_open()) {
                $menu_ele.css('right', '-280px');
                $scrol_up_ele.removeClass('scroll-left');
                $scrol_up_ele.addClass('scroll-right');
            }
        }
    });

    /* -- Change Background -- */
    $('body').css('background', 'url("/assets/imgs/bg/' + getbg() + '")');

    $(window).on('scroll', function() {
        /* -- Scroll to Top -- */
        if ($(this).scrollTop() > 100) {
            //Display it
            $scrol_up_ele.fadeIn();
        } else {
            $scrol_up_ele.fadeOut();
        }
    });

    $scrol_up_ele.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    add_weather_emo();

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});
