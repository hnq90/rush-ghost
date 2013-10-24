(function ($) {
    "use strict";
    $(document).ready(function () {
        /* -- Detect IE -- */
        var browser = detect_browser();
        if (browser.msie == true) {
            var logo_text = $("#flash").text() + " " + $("#light").text();
            $("#box").html(logo_text);
        }

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

        $(".pagination").css("display", "none");

        $(window).scroll(function () {
            /* -- Scroll to Top -- */
            if ($(this).scrollTop() > 100) {
                //Display it
                $(".scrollup").fadeIn(function () {
                    //Hide after 10s
                    //setTimeout( "$('.scrollup').fadeOut();", 10000 );
                });
            } else {
                $(".scrollup").fadeOut();
            }

            /* -- Endless Scrolling -- */
            var next_page = $(".pagination a.older-posts");
            if (next_page.length > 0) {
                next_page = next_page.attr("href");
                if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    $('.endless').show();
                    $.ajax({
                        url: next_page,
                        success: function (html) {
                            if (html) {
                                var dom = $(html),
                                    posts = dom.find("article"),
                                    pagination = dom.find(".pagination");

                                $(".pagination").remove();
                                posts.each(function (index) {
                                    $(".content").append(posts[index]);
                                });

                                GetFeatureImage();
                                AddWeathernEmo();

                                $(".content").append(pagination);
                                $(".pagination").css("display", "none");
                                $('.endless').hide();
                            }
                        }
                    });
                }
            } else {
                $(".pagination").css("display", "block");
                $(".pagination").html("No more post -_-");
            }
        });

        $(".scrollup").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        });

        GetFeatureImage();
        AddWeathernEmo();
    });

    function GetFeatureImage() {
        var articles_links = $(".post-title a"),
            featured_parts = $(".featured"),
            list_links = [];
        /* -- Feature Images and Video per Post -- */
        if (articles_links.length > 0) {
            articles_links.each(function (index) {
                //Process script                 
                list_links.push(articles_links[index].href);
                //localStorage.setItem(articles_links[index].href, index);
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

    function AddWeathernEmo() {
        /* -- Add weather -- */
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
            /* -- Add mood -- */
            // happy, sad, okay
            emoNodes = $(".post-emoticon"),
            emo_hash = {
                "happy": "vui",
                "sad": "chan",
                "okay": "bt"
            },
            emo_arr = [];

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
        });
    }

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

    function detect_browser() {
        var browser = {
            chrome: false,
            mozilla: false,
            opera: false,
            msie: false,
            safari: false
        };
        var sBrowser, sUsrAg = navigator.userAgent;
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
}(jQuery));