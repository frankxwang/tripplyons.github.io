(function(window, $) {
    $(function() {
        var $pong = $("#pong");
        var $pongPaddle = $("#pong-paddle");
        var $pongBall = $("#pong-ball");
        var pongRef;
        var pongDirX;
        var pongDirY;

        function pongListener(e) {
            $pongPaddle.offset({
                top: e.pageY,
                left: 12
            });
        }

        var last;

        function pongUpdate() {
            var timestamp = (new Date()).getTime();
            var change = timestamp - last;
            var pos = $pong.parent().offset();
            $pongBall.data("x", $pongBall.data("x") + pongDirX * change / 12);
            $pongBall.data("y", $pongBall.data("y") + pongDirY * change / 12);
            $pongBall.offset({
                top: $pongBall.data("y") + pos.top + 12,
                left: $pongBall.data("x") + pos.left + 12
            });
            if (collision($pongPaddle, $pongBall)) {
                pongDirX = -pongDirX;
            }
            if ($pongBall.data("y") < 2) {
                $pongBall.data("y", 2);
                pongDirY = -pongDirY;
            }
            if ($pongBall.data("y") >= $pong.parent().height() - 32) {
                $pongBall.data("y", $pong.parent().height() - 33);
                pongDirY = -pongDirY;
            }
            if ($pongBall.data("x") >= $pong.parent().width() - 32) {
                $pongBall.data("x", $pong.parent().width() - 33);
                pongDirX = -pongDirX;
            }
            if ($pongBall.data("x") < 0) {
                pongEnd();
                pongStart();
            } else {
                last = timestamp;
                requestAnimationFrame(pongUpdate);
            }
        }

        function pongStart() {
            pongDirY = 1;
            pongDirX = -1;
            last = (new Date()).getTime();
            $pongBall.data("y", 48);
            $pongBall.data("x", 48);
            requestAnimationFrame(pongUpdate);
            $pong.mousemove(pongListener);
        }

        function pongEnd() {
            $pong.off("mousemove");
        }

        function resize(e) {
            var maxExtent = 0;
            $("#grid").children().each(function() {
                $(this).offset({
                    left: $(this).data('x') * window.innerHeight / 6,
                    top: $(this).data('y') * window.innerHeight / 6
                });
                if ($(this).children().offset().left + $(this).width() > maxExtent) {
                    maxExtent = $(this).children().offset().left + $(this).width();
                }
            });
            $("#grid").width(maxExtent + 8);
        }
        $(window).resize(resize);

        function Card(appId, x, y, width, height, background, textColor, icon) {
            var elem = $("<div class=\"card-container card-" + width.toString() + "-" + height.toString() + "\"><div class=\"card\"><i class=\"material-icons md-48\">" + icon + "</i></div></div>");
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
                contentFrame.show();
                contentFrame.css({
                    "-webkit-animation-name": "fadeIn",
                    "animation-name": "fadeIn"
                });
                if (appId == "pong") {
                    pongStart();
                }
            });
            contentFrame.click(function(e) {
                contentFrame.css({
                    "-webkit-animation-name": "fadeOut",
                    "animation-name": "fadeOut"
                });
                setTimeout(function() {
                  contentFrame.hide();
                }, 1000);
                if (appId == "pong") {
                    pongEnd();
                }
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

        function collision($div1, $div2) {
            var x1 = $div1.offset().left;
            var y1 = $div1.offset().top;
            var h1 = $div1.outerHeight(true);
            var w1 = $div1.outerWidth(true);
            var b1 = y1 + h1;
            var r1 = x1 + w1;
            var x2 = $div2.offset().left;
            var y2 = $div2.offset().top;
            var h2 = $div2.outerHeight(true);
            var w2 = $div2.outerWidth(true);
            var b2 = y2 + h2;
            var r2 = x2 + w2;

            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
            return true;
        }
    });
})(window, jQuery);
