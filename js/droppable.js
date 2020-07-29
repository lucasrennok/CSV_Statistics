// This function makes the 'element' an input area to drop files
// Callback is the function that is called when a file is dropped
function makeDroppable(element, callback) {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.setAttribute('accept', ".csv");
    input.style.display = 'none';

    input.addEventListener('change', triggerCallback);
    element.appendChild(input);

    element.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.add('dragover');
    });

    element.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
    });

    element.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
        triggerCallback(e);
    });

    element.addEventListener('click', function() {
        input.value = null;
        input.click();
    });

    function triggerCallback(e) {
        let files;
        if(e.dataTransfer) {
        files = e.dataTransfer.files;
        } else if(e.target) {
        files = e.target.files;
        }
        callback.call(null, files);
    }
}