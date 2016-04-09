(function() {
  (function($) {
    return $(function() {
      console.log('test');
      $('#info').animateCSS("fadeInDown", {
        duration: 2000
      });
      return $;
    });
  })(jQuery);

}).call(this);
