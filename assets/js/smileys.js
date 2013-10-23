$(document).ready(function(){
    var emo_objects = { 
        ":v": "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\" class=\"emoticon\" />", 
        ":)": "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\" class=\"emoticon\" />", 
        ":(": "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\" class=\"emoticon\" />",
        ":D": "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\" class=\"emoticon\" />"
    };

    var post_content = $(".post-content").html();

    post_content = escape(post_content);

    $.each( emo_objects, function( key, value ) {
        post_content = post_content.replace(new RegExp(escape(key), "g"), emo_objects[key]);
    });

    post_content = unescape(post_content);

    $(".post-content").html(post_content);
});