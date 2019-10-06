(function (app) {
    function Header() {}

    Header.prototype.init = function () {
        this.storeDomElements();
        this.addListeners();
    }

    Header.prototype.storeDomElements = function () {
        this.contactsNode = document.getElementById('header-nav__contacts');
        this.supportNode = document.getElementById('header-nav__support');
    }

    Header.prototype.addListeners = function () {
        console.log(this.contactsNode, this.supportNode);

        [this.contactsNode, this.supportNode]
            .forEach(function(node) {
                node.addEventListener('click', app.scrollToBottom);
            });
    }

    app.header = new Header();
})(app);
