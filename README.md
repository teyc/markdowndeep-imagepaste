MarkdownDeep demo with pasting image from the clipboard
--------------------------------------------------------

## Live demo

See https://rawgit.com/teyc/markdowndeep-imagepaste/master/index.html

Note the live demo does not upload image to a server,
as you are looking at a static site.

You will have to run the program on your own machine
to see it work.

## Sample Usage


    <script src="./rangyinputs-jquery.js"></script>
    <script src="./MarkdownDeep.Img.js"></script>
    <script>
        function onPaste(mdd, textarea, file) {
            /* When user pastes an image from clipboard,
             * call our image upload endpoint and
             * insert the image url into the text area
             */
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            formData.append("file", file);
            xhr.open("POST", "/images", true);
            xhr.send(formData);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var imageUrl = xhr.getResponseHeader("Location");
                    var alttext = "Your description";
                    var str = "![" + alttext + "](" + imageUrl + ")";
                    $(textarea).replaceSelectedText(str);
                }
            }
        }

        $(function () {
            $("textarea")
                .MarkdownDeep()
                .MarkdownDeepEnablePasteImage({
                    onPaste: onPaste
                })
                .attr("contentEditable", "true")
                .attr("rows", 10);
            $(".mdd_preview").height("180px");
        })
    </script>
    
  ## Installation

Execute the following in the command line

    npm install
    npm start

and then browse to http://localhost:3000/

## Supported browsers

Chrome, Microsoft Edge

## Does not work

This demo does not work on Microsoft Internet Explorer 11
because the "paste" event does not fire when the clipboard
contains images, and the textarea is focussed.



