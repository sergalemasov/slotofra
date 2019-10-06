(function (app) {
    function scrollToBottom() {
        window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    app.scrollToBottom = scrollToBottom;
})(app);
