// ==UserScript==
// @name           Meetup: HTML5 multiple-file upload for photos
// @namespace      http://samat.org/
// @copyright			 2011+, Samat Jain (http://samat.org)
// @version        1.0
// @description    Converts Meetup.com's old HTML upload page to use HTML5 multiple file upload. No more Adobe Flash!
// @include        http://www.meetup.com/*/photos/upload/*
// @include        http://meetup.com/*/photos/upload/*
// @license        GPL version 2 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

function hideUnneededElements()
{
  function generateNames()
  {
    yield 'Description_1';
    for (var i=2; i <= 10; ++i) {
      yield 'FileName_' + i;
      yield 'Description_' + i;
    }
  }

  for each (var itemName in generateNames()) {
    input_element = document.getElementsByName(itemName)[0];
    if (!input_element) continue;
    
    input_element.style.display = 'none';
  }
}

function populateFileList()
{
  var input_element = document.getElementsByName('FileName_1')[0];
  if (!input_element) return;

  var file_list = input_element.files;

  var ul = document.getElementById('ul-file-list');

  // Create list if it doesn't exist
  if (!ul) {
    ul = document.createElement('ul');
    ul.setAttribute('id', 'ul-file-list');

    var desc_p = document.createElement('p');
    desc_p.appendChild(
      document.createTextNode('The following files will be uploaded:'));
    input_element.parentNode.insertBefore(ul, input_element.nextSibling);
    input_element.parentNode.insertBefore(desc_p, ul);
  }

  var items = []
  for (var i=0, l=file_list.length; i<l; ++i) {
    items.push("<li>" + file_list[i].name + "</li>");
//    li = document.createElement('li');
//    li.appendChild(document.createTextNode(file_list[i].name));
//    ul.appendChild(li);
  }
  ul.innerHTML = items.join('');
}

function addMultipleFileUploadAttributes()
{
  var elm = document.getElementsByName('FileName_1')[0];
  elm.accept = 'image/*';
  elm.multiple = 'multiple';
  elm.onchange = populateFileList;
}

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript;version=1.8");
    script.setAttribute("src",
        "data:,"+escape("var __PAGE_SCOPE_RUN__ = true;\n" + my_src));

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
} else {
  // We're running in page scope
  addMultipleFileUploadAttributes();
  hideUnneededElements();
}

