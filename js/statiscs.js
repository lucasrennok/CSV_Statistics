let drop_area = document.querySelector('.droppable');
let upload_button = document.getElementById("upload");

FileList = undefined;
let file_names = [];
let csv_data = [];
upload_button.addEventListener("click",uploadFiles);

function callback(files) {
  let drop = document.getElementById("drop_f");
  let number = files.length+csv_data.length;
  for(let f of files){
    for(let nm of file_names){
      if(f.name==nm){
        number--;
        break;
      }
    }
  }
  drop.innerHTML = number+" Files Selected";
  FileList = files;
}
makeDroppable(drop_area, callback);

function uploadFiles(){
  console.log("Uploaded");
  for(let file of FileList){
    if(file.type=="application/vnd.ms-excel"){
      console.log("Okay, it's a CSV file:", file.name);
      let reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("loadend", function() {
        for(let nm of file_names){
          if(nm==file.name)
            return;
        }
        console.log("NEW FILE SAVED");
        file_names[file_names.length]=file.name;
        csv_data[csv_data.length]=reader.result;
      });
    }else{
      console.log("NOT A CSV FILE!")
    }
  }
}

