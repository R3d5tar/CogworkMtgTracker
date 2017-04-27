
var modals = new function () {
    var modal;
    var allModalContent;
    var closeButtons;
    var _this = this;

    this.init = function () {
        modal = document.querySelector('.modal');
        allModalContent = document.querySelectorAll('.modal-content');
        closeButtons = document.querySelectorAll('.close-modal');

        // set close modal behaviour
        for (var i = 0; i < closeButtons.length; ++i) {
            closeButtons[i].addEventListener('click', function() {
                _this.hideModals();
            });
        }

        // close modal if clicked outside content area
        document.querySelector('.modal-inner').addEventListener('click', function() {
            _this.hideModals();
        });

        // prevent modal inner from closing parent when clicked
        $(".modal-content").click(function(e) {
            e.stopPropagation();
        });
        // document.querySelector('.modal-content').addEventListener('click', function(e) {
        //     e.stopPropagation();
        // })
    }

    this.showModal = function(id)
    {
        modal.classList.add('modal-open');
        var modalContent = document.getElementById(id);
        if (modalContent != null)
        {
            modalContent.classList.add('modal-open');
        }
        else
        {
            _this.hideModals();
            console.warn("Couldn't find a modal with id: " + id);
        }
    }

    this.hideModals = function()
    {
        modal.classList.remove('modal-open');
        for (var i = 0; i < allModalContent.length; ++i)
        {
            allModalContent[i].classList.remove('modal-open');
        }
    }
}();

$(document).ready(function () {
    modals.init();
});

