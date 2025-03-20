// Dữ liệu câu hỏi cho từng danh mục
const faqData = {
    common: [
        { question: "Cách đăng ký tài khoản như thế nào?", answer: "Bạn có thể đăng ký tài khoản bằng cách..." },
        { question: "Làm sao để đổi mật khẩu?", answer: "Vào cài đặt tài khoản, chọn đổi mật khẩu..." }
    ],
    install: [
        { question: "Cách cài đặt phần mềm?", answer: "Tải về và chạy file Setup..." },
        { question: "Cách gỡ cài đặt?", answer: "Vào Control Panel > Chọn phần mềm > Uninstall." }
    ],
    use: [
        { question: "Cách sử dụng phần mềm?", answer: "Mở phần mềm, đăng nhập và làm theo hướng dẫn..." }
    ],
    buy: [
        { question: "Cách mua phần mềm?", answer: "Bạn có thể mua phần mềm trên trang web chính thức..." }
    ],
    security: [
        { question: "Phần mềm có an toàn không?", answer: "Phần mềm được bảo mật với tiêu chuẩn cao..." }
    ]
};

// Hàm lấy tham số từ URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Hàm hiển thị câu hỏi theo danh mục
function showQuestions(category, title) {
    const faqContainer = document.getElementById("faq-container");
    const faqTitle = document.getElementById("faq-title");

    // Cập nhật tiêu đề danh mục
    faqTitle.innerText = title;

    // Xóa nội dung cũ
    faqContainer.innerHTML = "";

    // Kiểm tra xem danh mục có tồn tại không
    if (!faqData[category]) {
        faqContainer.innerHTML = "<p>Không tìm thấy danh mục này.</p>";
        return;
    }

    // Thêm câu hỏi mới
    faqData[category].forEach((item, index) => {
        const questionId = `${category}-${index}`; // Định danh câu hỏi theo category
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");
        faqItem.onclick = () => toggleAnswer(questionId);

        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerText = item.question;

        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.id = questionId;
        answerDiv.style.display = "none";
        answerDiv.innerText = item.answer;

        faqItem.appendChild(questionDiv);
        faqItem.appendChild(answerDiv);
        faqContainer.appendChild(faqItem);
    });

    // Nếu có chỉ số câu hỏi, tự động mở câu hỏi đó
    const questionIndex = getQueryParam("questionIndex");
    if (questionIndex !== null) {
        setTimeout(() => {
            toggleAnswer(`${category}-${questionIndex}`);
        }, 300);
    }
}

// Hàm mở câu trả lời
function toggleAnswer(id) {
    var element = document.getElementById(id);
    if (element) {
        element.style.display = (element.style.display === "none" || element.style.display === "") ? "block" : "none";
    }
}

// Khi trang tải xong, kiểm tra tham số URL và hiển thị danh mục phù hợp
window.onload = function () {
    const category = getQueryParam("category") || "common"; // Mặc định là "common"
    const title = getQueryParam("title") || "Câu hỏi chung";
    showQuestions(category, title);
};
