let drop_area = document.querySelector('.droppable');
let upload_button = document.getElementById("upload");

FileList = undefined;
let result = 0;
let file_names = [];
let csv_data = [];
upload_button.addEventListener("click", uploadFiles);

function callback(files) {
  let drop = document.getElementById("drop_f");
  let number = files.length;
  drop.innerHTML = number + " Files Selected";
  FileList = files;
}

const checkFiles = (FileList) => {
  for (let file of FileList) {
    let extension = "" + file.name[file.name.length - 4] + file.name[file.name.length - 3] + file.name[file.name.length - 2] + file.name[file.name.length - 1];
    if (file.type == "application/vnd.ms-excel" || extension == ".csv") {
      console.log("OUTPUT: Okay, it's a CSV file:", file.name);
      let reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("loadend", function () {
        for (let nm of file_names) {
          if (nm == file.name){
            console.log("ERROR: FILES WITH THE SAME NAMES!");
            window.alert("OUTPUT: There are some files with the same names. Put the files again.")
            result=-1;
            return;
          }
        }
        console.log("OUTPUT: NEW FILE SAVED");
        file_names[file_names.length] = file.name;
        csv_data[csv_data.length] = reader.result;
        if(compatibleCSVs()==false){
          result=-1;
          return;
        }
        console.log(csv_data[csv_data.length-1]);
      });
    } else {
      console.log("ERROR: NOT A CSV FILE!");
      window.alert("OUTPUT: Put only CSV files. Put the files again.");
      return -1;
    }
  }
  return 0;
}

makeDroppable(drop_area, callback);

function uploadFiles() {
  if (FileList == undefined) {
    window.alert("No Files");
    return;
  }
  else if(checkFiles(FileList)==-1){
    let drop = document.getElementById("drop_f");
    drop.innerHTML = "Put your files here.";
    FileList = undefined;
    csv_data = [];
    file_names = [];
    return;
  }
  setTimeout(
    function(){
      window.alert("Wait some seconds...");
      if(result==-1){
        let drop = document.getElementById("drop_f");
        drop.innerHTML = "Put your files here.";
        window.alert("ERROR: The columns don't have the same names at the CSVs. Put the files again.");
        FileList = undefined;
        csv_data = [];
        file_names = [];
        result=0;
        return;
      }
      console.log("Uploaded");
      
      const upload_div = document.getElementById("upload_div");
      
      upload_div.style.display = "none";
      //monta os dados num vetor
      buildData();
  },2000);
}

//confere compatibilidade dos csvs
function compatibleCSVs() {
  if(csv_data.length>1){
    //compara ultimo com primeiro
    let column1="", column2="";
    for(let word of csv_data[0]){
      if(word=="\n")
        break;
      column1+=word;
    }
    for(let word of csv_data[csv_data.length-1]){
      if(word=="\n")
        break;
      column2+=word;
    }
    if(column1!=column2){
      console.log("ERROR: ", column1, column2);
      return false;
    }
  }
  return true;
}

function buildData(){
  let aspas = false;
  let column_vector = [];
  let line_vector = []
  let data_matrix = []
  let aux = "", column_generated = false;
  for(let i=0; i<csv_data.length; i++){
    for(let j=0; j<csv_data[i].length; j++){
      if(column_generated==false){
        if(csv_data[i][j]=="\n"){
          column_vector[column_vector.length]=aux;
          aux = "";
          column_generated=true;
        }else if(csv_data[i][j]=="," && aspas==false){
          column_vector[column_vector.length]=aux;
          aux = "";
        }else if(csv_data[i][j]!="\""){
          aux+=csv_data[i][j];
        }else{
          if(aspas==false)
          aspas = true;
          else
          aspas=false;
        }
      }else{
        
        console.log(column_vector);
        return;
      }
      //csv_data[i][j];
    }
  }
  return;
}