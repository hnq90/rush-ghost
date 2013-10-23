(function ($) {
    "use strict";
    $(document).ready(function () {
        /* -- Cide Highlight -- */
        $("pre").addClass("prettyprint");
        
        /* -- Responsive Text and Video -- */
        $("#box").fitText(1.2, { minFontSize: "40px", maxFontSize: "90px" });
        $(".post").fitVids();
        
        /* -- Handle menu event -- */
        $(".toggle-icon").click(function () {
            if (menu_open()) {
                $("#menu").css("right", "-280px");
                $(".scrollup").removeClass("scroll-left");
                $(".scrollup").addClass("scroll-right");
            } else {
                $("#menu").css("right", "0");
                $(".scrollup").removeClass("scroll-right");
                $(".scrollup").addClass("scroll-left");
            }
        });
        
        $(document).click(function (event) {
            if ($(event.target).parents().index($("#menu")) === -1) {
                if (menu_open()) {
                    $("#menu").css("right", "-280px");
                    $(".scrollup").removeClass("scroll-left");
                    $(".scrollup").addClass("scroll-right");
                }
            }
        });
        
        /* -- Change Background -- */
		$("body").css("background", "url(\"/assets/imgs/bg/" + getbg() + "\")");
        
        /* -- Scroll to Top -- */
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                //Display it
                $(".scrollup").fadeIn(function () {
                    //Hide after 10s
                    //setTimeout( "$('.scrollup').fadeOut();", 10000 );
                });
            } else {
                $(".scrollup").fadeOut();
            }
        });
 
        $(".scrollup").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
                
        /* -- Add weather -- */
        // rain, cloudy, sunny, cold
        var metaNodes = $(".post-meta"),
            weatherNodes = $(".post-weather"),
            weather_hash = {"rain": "wi-rain", "cloudy": "wi-cloudy", "sunny": "wi-day-sunny", "cold": "wi-strong-wind"},
            weather_arr = [],
            /* -- Add mood -- */
            // happy, sad, okay
            emoNodes = $(".post-emoticon"),
            emo_hash = {"happy": "vui", "sad": "chan", "okay": "bt"},
            emo_arr = [],
            articles_links = $(".post-title a"),
            list_links = [];
        
        metaNodes.each(function (index) {
            var matched_weather = $(this).text().match("rain|cloudy|sunny|cold");
            weather_arr.push((matched_weather === null ? "sunny" : matched_weather).toString());
        });
        
        weatherNodes.each(function (index) {
            if ($(window).width() >= 500) {
                $(this).html("<i class=\"" + weather_hash[weather_arr[index]] + "\">");
            }
        });
        
        metaNodes.each(function (index) {
            var matched_mood = $(this).text().match("happy|sad|okay"); 
            emo_arr.push((matched_mood === null ? "okay" : matched_mood).toString());
        });
        
        emoNodes.each(function (index) {
            if ($(window).width() >= 500) {
                $(this).addClass(emo_arr[index]);
            }
            //$(this).css("background","url('/assets/imgs/mood/"+emo_hash[emo_arr[index]]+".png')");
        });
        
        /* -- Feature Images per Post -- */
        
        
        if (articles_links.length > 0) {
            articles_links.each(function (index) {
                //Process script                 
                list_links.push(articles_links[index].href);
                //localStorage.setItem(articles_links[index].href, index);
            });
        }
        
        if (list_links.length > 0) {
            list_links.forEach(function (element, index, array) {
                //console.log(list_links[index]);
                $.get(list_links[index], function (data) {
                    var imgTagsRegex = /<img.+?src=\"(.*?)\".+?>/ig;
                    console.log(imgTagsRegex.exec(data));
                });
            });
        }
    });
    
    //FUCK YOU, BITCH
    
    //Function check menu opened
    function MoveScrollIcon() {
        if (menu_open()) {
            $(".scrollup").removeClass("scroll-right");
            $(".scrollup").addClass("scroll-left");
        } else {
            $(".scrollup").removeClass("scroll-left");
            $(".scrollup").addClass("scroll-right");
        }
    }
    //Function generate background
    function getbg() {
        var d = new Date(),
            today = parseInt(d.getDate(), 10),
            bg = "1.png";
        
        if (today <= 5) {
            bg = "6.png";
        } else if (today <= 10) {
			bg = "5.png";
        } else if (today <= 15) {
			bg = "4.png";
        } else if (today <= 20) {
			bg = "3.png";
        } else if (today <= 25) {
			bg = "2.png";
        } else {
			bg = "1.png";
        }
		return bg;
    }
    
    function menu_open() {
        return ($("#menu").css("right") === "0px");
    }
}(jQuery));