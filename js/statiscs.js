var element = document.querySelector('.droppable');
function callback(files) {
  console.log(files);
}
makeDroppable(element, callback);



let upload = document.getElementById("upload");
let drop_files = document.getElementById("drop");

upload.addEventListener("click", uploadData);
drop_files.addEventListener("change", printData);

function uploadData(){
    /* se nao tiver documento = window.alert
        se tiver 1 só documento: gera graficos e tabela
        se tiver 2 ou mais: verifica se tem os msms atributos:
                                se sim: gera graficos e tabela
                                senão: window.alert*/
    document.getElementById("upload_div").style.display = "none";
}

function printData(){
    let files = document.getElementById("drop");
    console.log(files.value);
}

function makeDroppable(element, callback) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
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
        var files;
        if(e.dataTransfer) {
        files = e.dataTransfer.files;
        } else if(e.target) {
        files = e.target.files;
        }
        callback.call(null, files);
    }
}