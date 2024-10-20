!function(e, t, a) {
    var hearts = [];
    var speed = 4;
    var quantity = 50;

    function createHeart(x, y) {
        var heart = t.createElement("div");
        heart.className = "heart";
        hearts.push({
            el: heart,
            x: x - 10,
            y: y - 10,
            alpha: 1,
            color: '#ff0000'
        });
        t.body.appendChild(heart);
    }

    function animate() {
        for (var i = 0; i < hearts.length; i++) {
            if (hearts[i].y + 20 < 0) {
                t.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                i--;
            } else {
                hearts[i].y -= speed;
                hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha +
                    ";background:" + hearts[i].color + ";z-index:99999;";
            }
        }
        requestAnimationFrame(animate);
    }

    function handleMouseClick(e) {
        for (let i = 0; i < quantity; i++) {
            createHeart(e.clientX, e.clientY);
        }
    }

    function createHeartsAutomatically() {
        setInterval(function() {
            var randomX = Math.random() * window.innerWidth;
            var randomY = window.innerHeight;
            for (let i = 0; i < quantity; i++) {
                createHeart(randomX, randomY);
            }
        }, 300);
    }

    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e
        .mozRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
            setTimeout(e, 1e3 / 60);
        };

    e.onclick = handleMouseClick;
    createHeartsAutomatically();
    animate();
}(window, document);
