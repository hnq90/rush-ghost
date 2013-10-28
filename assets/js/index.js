(function ($) {
    "use strict";

    function get_feature_image() {
        var articles_links = $(".post-title a"),
            featured_parts = $(".featured"),
            list_links = [];

        /* -- Feature Images and Video per Post -- */
        if (articles_links.length > 0) {
            
            if ( Modernizr.localstorage ) {
                localStorage.clear();
            }
            
            articles_links.each(function (index) {
                //Process script                 
                list_links.push(articles_links[index].href);
                /* -- Next and Prev Post -- */
                if ( Modernizr.localstorage ) {
                localStorage.setItem(articles_links[index].href,
                    JSON.stringify({"prev": (articles_links[index - 1] != null ? articles_links[index - 1].href : "none"),
                                    "next": (articles_links[index + 1] != null ? articles_links[index + 1].href : "none")}));
                }
            });
        }

        if (list_links.length > 0) {
            list_links.forEach(function (element, index, array) {
                $.get(list_links[index], function (data) {
                    var html = $(data),
                        article = html.find("article"),
                        img = article.find("img:first"),
                        video = article.find("iframe:first"),
                        featured = featured_parts[index];

                    if (img.length > 0 && video.length > 0) {
                        $(featured).html(img[0]);
                    } else {
                        if (img.length > 0) {
                            $(featured).html(img[0]);
                        } else if (video.length > 0) {
                            $(featured).html(video[0].outerHTML);
                        }
                    }
                    $(".post").fitVids();
                });
            });
        }
    }

    function add_weather_emo() {
        // rain, cloudy, sunny, cold
        var metaNodes = $(".post-meta"),
            weatherNodes = $(".post-weather"),
            weather_hash = {
                "rain": "wi-rain",
                "cloudy": "wi-cloudy",
                "sunny": "wi-day-sunny",
                "cold": "wi-snow"
            },
            weather_arr = [],
            // happy, sad, okay
            emoNodes = $(".post-emoticon"),
            emo_arr = [];
            /*emo_hash = {
                "happy": "vui",
                "sad": "chan",
                "okay": "bt"
            },*/

        /* -- Add weather -- */
        metaNodes.each(function (index) {
            var matched_weather = $(this).text().match("rain|cloudy|sunny|cold");
            weather_arr.push((matched_weather == null ? "sunny" : matched_weather).toString());
        });

        weatherNodes.each(function (index) {
            if ($(window).width() >= 500) {
                $(this).html("<i class=\"" + weather_hash[weather_arr[index]] + "\">");
            }
        });

        /* -- Add mood -- */
        metaNodes.each(function (index) {
            var matched_mood = $(this).text().match("happy|sad|okay");
            emo_arr.push((matched_mood == null ? "okay" : matched_mood).toString());
        });

        emoNodes.each(function (index) {
            if ($(window).width() >= 500) {
                $(this).addClass(emo_arr[index]);
            }
        });
    }

    //Function check menu opened
    function move_scroll_icon() {
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
        return ($("#menu").css("right") == "0px");
    }

    function detect_browser() {
        var browser = {
            chrome: false,
            mozilla: false,
            opera: false,
            msie: false,
            safari: false
        },
            sBrowser, sUsrAg = navigator.userAgent;

        if (sUsrAg.indexOf("Chrome") > -1) {
            browser.chrome = true;
        } else if (sUsrAg.indexOf("Safari") > -1) {
            browser.safari = true;
        } else if (sUsrAg.indexOf("Opera") > -1) {
            browser.opera = true;
        } else if (sUsrAg.indexOf("Firefox") > -1) {
            browser.mozilla = true;
        } else if (sUsrAg.indexOf("MSIE") > -1 || sUsrAg.indexOf("Trident") > -1) {
            browser.msie = true;
        }
        return browser;
    }

    function prev_next() {
        if ( Modernizr.localstorage ) {
            if (localStorage.getItem(window.location.href) != null && window.location.href != (window.location.origin + "/")) {
                var relations = localStorage.getItem(window.location.href);
                return JSON.parse(relations);
            }
        } else {
            return false;
        }
    }
        

    $(document).ready(function () {
        
        /* -- Detect IE -- */
        var browser = detect_browser(),
            logo_text = $("#flash").text() + " " + $("#light").text(),
            is_many_page = $(".pagination a.older-posts").length,
            rel_links = prev_next();
        
        /* -- Fallback text logo for IE -- */
        if (browser.msie == true) {
            $("#box").html(logo_text);
        }
        
        /* -- Hide pagination for infinite scrolling  -- */
        $(".pagination").css("display", is_many_page == 0 ? "none":"block" );
        
        /* -- Code Highlight -- */
        $("pre").addClass("prettyprint");

        /* -- Responsive Text and Video -- */
        $("#box").fitText(1.2, {
            minFontSize: "40px",
            maxFontSize: "90px"
        });
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
            if ($(event.target).parents().index($("#menu")) == -1) {
                if (menu_open()) {
                    $("#menu").css("right", "-280px");
                    $(".scrollup").removeClass("scroll-left");
                    $(".scrollup").addClass("scroll-right");
                }
            }
        });

        /* -- Change Background -- */
        $("body").css("background", "url(\"/assets/imgs/bg/" + getbg() + "\")");
        $(".pagination").css("display", "none");
        
        $(window).scroll(function () {
            /* -- Scroll to Top -- */
            if ($(this).scrollTop() > 100) {
                //Display it
                $(".scrollup").fadeIn();
            } else {
                $(".scrollup").fadeOut();
            }

            /* -- Endless Scrolling -- */
            var next_page = $(".pagination a.older-posts");
            if (next_page.length > 0) {
                next_page = next_page.attr("href");
                if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
                    $(".endless").show();
                    $.ajax({
                        url: next_page,
                        success: function (html) {
                            if (html) {
                                var dom = $(html),
                                    posts = dom.find("article"),
                                    pagination = dom.find(".pagination"),
                                    endless = dom.find(".endless");

                                $(".pagination").remove();

                                $(".endless").remove();
                                posts.each(function (index) {
                                    $(posts[index]).appendTo(".content").addClass("animated fadeInUp");
                                });

                                //Callback when create new article
                                get_feature_image();
                                add_weather_emo();

                                $(".content").append(endless);
                                $(".content").append(pagination);
                                $(".pagination").css("display", "none");
                                $(".endless").hide();
                            }
                        }
                    });
                } else {
                    if ($(".pagination").css("display") == "block") {
                        $(".no-more").removeClass("animated shake");
                        $(".no-more").addClass("animated shake");
                    }
                }
            } else {
                $(".pagination").css("display", "block");
                $(".pagination").html("<span class=\"button no-more\">''-_-</span>");
                $(".no-more").removeClass("animated shake");
                $(".no-more").addClass("animated shake");
            }
        });

        $(".scrollup").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        });

        get_feature_image();
        add_weather_emo();
                    
        if (rel_links != null && Modernizr.localstorage && rel_links != false) {
            $(document).keydown(function (event) {
                if (event.which == 37 && rel_links.prev != "none") {
                    event.preventDefault();
                    window.location.href = rel_links.prev;
                }
                if (event.which == 39 && rel_links.next != "none") {
                    event.preventDefault();
                    window.location.href = rel_links.next;
                }
            });
        }
    });

}(jQuery));