let drop_area = document.querySelector('.droppable');
let upload_button = document.getElementById("upload");

FileList = undefined;
upload_button.addEventListener("click",uploadFiles);

function callback(files) {
  let drop = document.getElementById("drop_f");
  drop.innerHTML = files.length+" Files Selected";
  FileList = files;
}

function uploadFiles(){
  console.log("Uploaded");
  for(let file of FileList){
    if(file.type=="application/vnd.ms-excel"){
      console.log("Okay, it's a CSV file:", file.name);
    }else{
      console.log("NOT A CSV FILE!")
    }
  }
}

makeDroppable(drop_area, callback);
