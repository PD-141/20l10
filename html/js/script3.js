var countdown = 6;
var countdownElement = document.getElementById('countdown');
var messageElement = document.getElementById("message");
var clickMessageElement = document.getElementById("click-message");
var neonButton = document.getElementById("neon-button");

// Bộ đếm ngược
var countdownInterval = setInterval(function () {
    countdownElement.textContent = countdown; // Cập nhật giá trị đếm
    countdown--;
    if (countdown < 0) {
        clearInterval(countdownInterval);
        countdownElement.style.display = 'none'; // Ẩn bộ đếm khi hết thời gian
    }
}, 1000); // Cập nhật mỗi giây

// Hiệu ứng mờ và hiển thị dòng chữ "Ấn vào nút này để biết anh yêu em nhiều như nào"
setTimeout(function () {
    messageElement.style.opacity = 0; // Mờ dần dòng chữ chính
    clickMessageElement.style.display = 'block'; // Hiện dòng chữ "Ấn vào nút này"
    neonButton.style.display = 'block'; // Hiện nút bấm
    setTimeout(function () {
        clickMessageElement.style.opacity = 1; // Dần hiện rõ sau 7 giây
    }, 1000); // Đợi 1 giây trước khi bắt đầu hiện
}, 7000); // Sau 6 giây
