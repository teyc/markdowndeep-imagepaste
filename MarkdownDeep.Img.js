"use strict";

/**
 * Markdown image uploader
 */

function MarkdownImageUploader(el, options) {

    var self = this;

    function closeModal() {
        this.addEventListener('click',
            function (event) {
                $(event.target).parents(".mdd_modal").fadeOut("fast").remove();
            });
    }

    function showModal(dataUrl, okPrompt) {
        var container = $(this._el).parents('.mdd_editor_wrap').parent();
        var modalHtml =
            '<div class="mdd_modal">               \n' +
            ' <div class="mdd_modal_frame">        \n' +
            '   <div class="mdd_modal_button">     \n' +
            '      <a href="#">Close</a>           \n' +
            '   </div>                             \n' +
            '   <div class="mdd_modal_content">    \n' +
            '      <img src="" class="mdd_image" />\n' +
            '   </div>                             \n' +
            '   <button class="btn btn-primary">   \n' +
            '      OK                              \n' +
            '   </button>                          \n' +
            ' </div>                               \n' +
            '</div>                                \n';
        var modalElement = $(modalHtml);
        container.prepend(modalElement);
        modalElement.fadeIn("fast");
        modalElement.find(".mdd_modal_button").each(closeModal);
        modalElement.find("img").attr("src", dataUrl);

        return new Promise(function (resolve, reject) {
            modalElement.find("button.btn-primary")
                .html(okPrompt)
                .on("click", function () {
                    resolve();
                    modalElement.remove();
                });
        });
    }

    function onPaste(event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === "file" || item.type && item.type.indexOf("image") !== -1) {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    var dataUrl = event.target.result;
                    self.showModal(dataUrl, "Upload image").then(function () {
                        if (options.onPaste) {
                            options.onPaste(self._mdd, self._el, blob);
                        }
                    });
                };
                reader.readAsDataURL(blob);
            }
        }
    }

   function activate() {
        this._el = el;
        this._mdd = $(el).data("mdd");
        this.onPaste = onPaste;
        this.showModal = showModal;
        this._el.addEventListener('paste',  this.onPaste.bind(this));
    }

    activate.call(this);
}

$.fn.MarkdownDeepEnablePasteImage = function (options) {
    this.each(function () {
        var uploader = new MarkdownImageUploader(this, options || {});
    });
    return this;
}