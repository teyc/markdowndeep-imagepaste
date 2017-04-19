MarkdownDeep demo with pasting image from the clipboard
--------------------------------------------------------

## Live demo

See https://rawgit.com/teyc/markdowndeep-imagepaste/master/index.html

Note the live demo does not upload image to a server,
as you are looking at a static site.

You will have to run the program on your own machine
to see it work.

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



