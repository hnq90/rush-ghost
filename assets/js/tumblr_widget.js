if (tumblr_api_read) {
  var tumblr_widget = document.getElementById('htumblr-widget');
  var html = '';

  if (tumblr_api_read.posts.length > 0) {
    Array.prototype.forEach.call(tumblr_api_read.posts, function(post, i){
      html += '<a href="' + tumblr_api_read.posts[i]['url'] + '" target="_blank"><img border="0" style="margin:0" src="' + tumblr_api_read.posts[i]['photo-url-75'].replace('http:', '') + '"/></a>\n';
    });
    tumblr_widget.setAttribute('style', 'margin: 0 auto;max-width: 555px;width:80%');
    tumblr_widget.innerHTML = html;
  }
}
