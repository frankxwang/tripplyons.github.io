(function(window, $) {
    $(function() {

        function resize(e) {
            $("#grid").children().each(function() {
                $(this).offset({
                    left: $(this).data('x') * window.innerHeight / 6,
                    top: $(this).data('y') * window.innerHeight / 6
                });
            });
        }
        $(window).resize(resize);

        function Card(appId, x, y, width, height, background, textColor, icon) {
            var elem = $("<div class=\"card-container card-" + width.toString() + "-" + height.toString() + "\"><div class=\"card\"><i class=\"material-icons md-48\">"+icon+"</i></div></div>");
            elem.data('x', x);
            elem.data('y', y);
            elem.data('appId', appId);
            var inside = elem.children(".card");
            inside.css("background", background);
            inside.css("color", textColor);

			var contentFrame = $("#" + appId).detach();
			elem.append(contentFrame);
			inside.click(function(e) {
				inside.fadeOut();
			});
			contentFrame.click(function(e) {
				inside.fadeIn();
			})

            $("#grid").append(elem);
            resize();

            return elem;
        }

        new Card("settings", 0, 0, 3, 3, "#7F8C8D", "#FFFFFF", "settings");
        new Card("pong", 0, 3, 2, 2, "#2c3e50", "#FFFFFF", "videogame_asset");
        new Card("person1", 2, 3, 1, 1, "#e74c3c", "#FFFFFF", "face");
		new Card("person2", 2, 4, 1, 1, "#3498db", "#FFFFFF", "face");
		new Card("falling", 0, 5, 3, 1, "#2ecc71", "#2c3e50", "arrow_downward")
    });
})(window, jQuery);

window.onload = function() {}
