(function(window, $) {
    $(function() {
        function resize(e) {
			var maxExtent = 0;
            $("#grid").children().each(function() {
                $(this).offset({
                    left: $(this).data('x') * window.innerHeight / 6,
                    top: $(this).data('y') * window.innerHeight / 6
                });
				if($(this).children().offset().left + $(this).width() > maxExtent) {
					maxExtent = $(this).children().offset().left + $(this).width();
				}
            });
			$("#grid").width(maxExtent+8);
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
			if (appId != "help")
				contentFrame.hide();
			elem.append(contentFrame);
			inside.click(function(e) {
				contentFrame.fadeIn();
			});
			contentFrame.click(function(e) {
				contentFrame.fadeOut();
			})

            $("#grid").append(elem);
            resize();

            return elem;
        }

        new Card("settings", 0, 0, 3, 3, "#7F8C8D", "#FFFFFF", "settings");
        new Card("pong", 0, 3, 2, 2, "#2C3E50", "#FFFFFF", "videogame_asset");
        new Card("person1", 2, 3, 1, 1, "#E74C3C", "#FFFFFF", "face");
		new Card("person2", 2, 4, 1, 1, "#3498DB", "#FFFFFF", "face");
		new Card("falling", 0, 5, 3, 1, "#2ECC71", "#2C3E50", "arrow_downward");
		new Card("copyright", 5, 5, 1, 1, "#F39C12", "#FFFFFF", "copyright");
		new Card("help", 3, 3, 2, 3, "#9B59B6", "#FFFFFF", "help");
		new Card("vote", 5, 3, 1, 2, "#1ABC9C", "#FFFFFF", "star");
		new Card("", 3, 1, 3, 2, "#F1C40F", "#FFFFFF", "")
    });
})(window, jQuery);

window.onload = function() {}
