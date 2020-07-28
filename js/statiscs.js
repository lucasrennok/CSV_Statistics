let upload = document.getElementById("upload");

upload.addEventListener("click", uploadData);

function uploadData(){
    /* se nao tiver documento = window.alert
        se tiver 1 só documento: gera graficos e tabela
        se tiver 2 ou mais: verifica se tem os msms atributos:
                                se sim: gera graficos e tabela
                                senão: window.alert*/
    document.getElementById("upload_div").style.display = "none";
}
