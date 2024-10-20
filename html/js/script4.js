var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,

    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1300;

var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;

var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
    var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
}

var Star = function () {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 8;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
}

Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
    new Star();
}

let blinkInterval = 500; // Thời gian giữa các lần nhấp nháy (ms)
let lastBlinkTime = 0; // Thời gian của lần nhấp nháy trước

function drawTextWithGlow(text, x, y, fontSize, currentTime) {
    ctx.font = fontSize + 'px "Dancing Script", cursive';
    ctx.textBaseline = 'middle';
    
    // Kiểm tra thời gian nhấp nháy
    if (currentTime - lastBlinkTime > blinkInterval) {
        lastBlinkTime = currentTime;
        // Chuyển đổi giữa hiển thị và ẩn chữ
        ctx.fillStyle = ctx.fillStyle === 'rgba(255, 255, 255, 0)' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)';
    }

    // Vẽ viền
    ctx.strokeStyle = 'rgba(255, 20, 147, 1)'; // Màu viền neon
    ctx.lineWidth = 0.9; // Độ dày viền
    ctx.shadowColor = 'rgba(255, 20, 147, 1)';
    ctx.shadowBlur = 20;
    ctx.strokeText(text, x, y); // Vẽ viền chữ

    ctx.shadowBlur = 0; // Tắt viền
    ctx.fillText(text, x, y); // Vẽ chữ
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.5; 
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    }

    let currentTime = performance.now(); // Lấy thời gian hiện tại
    // Vẽ văn bản
    drawTextWithGlow("I Love You 3000", w / 2 - ctx.measureText("I Love You 3000").width / 2, h / 2 - 50, 100, currentTime); // Tăng kích thước
    drawTextWithGlow("Ta đã yêu nhau tròn 60 ngày ❤", w / 2 - ctx.measureText("Ta đã yêu nhau tròn 60 ngày ❤").width / 2, h / 2 + 20, 50, currentTime); // Tăng kích thước

    window.requestAnimationFrame(animation);
}

// Event listener for the neon button
const neonButton = document.getElementById('neon-button');
neonButton.addEventListener('click', function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    document.body.classList.add('fade-out'); // Thêm lớp fade-out
    setTimeout(function () {
        window.location.href = neonButton.href; // Điều hướng đến trang 1.html sau khi hiệu ứng fade-out hoàn thành
    }, 2000); // Chờ 2 giây trước khi chuyển trang
});

animation();
