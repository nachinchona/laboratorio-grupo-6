const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
    const question = faq.querySelector(".pregunta");
    const answer = faq.querySelector(".respuesta");

    question.addEventListener("click", () => {
        if (faq.classList.contains("active")) {
            faq.classList.remove("active");
            answer.style.maxHeight = null;
        } else {

            faqs.forEach(otherFaq => {
                if (otherFaq.classList.contains("active")) {
                    otherFaq.classList.remove("active");
                    otherFaq.querySelector(".answer").style.maxHeight = null;
                }
            });

            faq.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});