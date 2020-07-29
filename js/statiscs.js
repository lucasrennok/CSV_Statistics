let drop_area = document.querySelector('.droppable');
let upload_button = document.getElementById("upload");

// Read Files and Check
FileList = undefined;
let result = 0;
let file_names = [];
let csv_data = [];
upload_button.addEventListener("click", uploadFiles);

// Build Data
let column_vector = [];
let data_matrix = [];

// Receive the fileList of the drop area
function callback(files) {
  let drop = document.getElementById("drop_f");
  let number = files.length;
  drop.innerHTML = number + " Files Selected";
  FileList = files;
  console.log(files);
}
// Make the drop area droppable
makeDroppable(drop_area, callback);

// Check if the files are .csv and are compatible
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
        console.log("OUTPUT: NEW CSV FILE SAVED");
        file_names[file_names.length] = file.name;
        csv_data[csv_data.length] = reader.result;
        if(compatibleCSVs()==false){
          result=-1;
          return;
        }
        //console.log(csv_data[csv_data.length-1]);
      });
    } else {
      console.log("ERROR: NOT A CSV FILE!");
      window.alert("OUTPUT: Put only CSV files. Put the files again.");
      return -1;
    }
  }
  return 0;
}

// After clicking on "upload" button=> checkFiles and buildData
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
  
  const upload_div = document.getElementById("upload_div");
  const title_text = document.getElementById("title_text");
  const foot = document.getElementById("foot");
  const load = document.getElementById("loading");
  
  foot.style.display = "none";
  upload_div.style.display = "none";
  title_text.style.display = "none";
  load.style.display = "inline-block";

  // Maybe the FileList.size is better to use to set the timer
  let timer;
  if(FileList.length<=3)
    timer=FileList.length;
  else
    timer=5;

  //Wait fileReader to get the strings
  setTimeout(
    function(){
      load.style.display = "none";
      if(result==-1){
        title_text.style.display = "block";
        upload_div.style.display = "block";
        foot.style.display = "block";
        let drop = document.getElementById("drop_f");
        drop.innerHTML = "Put your files here.";
        window.alert("ERROR: The columns don't have the same names at the CSVs. Put the files again.");
        FileList = undefined;
        csv_data = [];
        file_names = [];
        result=0;
        return;
      }
      console.log("OUTPUT: _Uploaded Files_");

      title_text.style.display = "block";
      document.getElementById("div_stats").style.display = "block";
      foot.style.display = "block";

      //Build data of the csv
      buildData();
  },3000*(timer));
}

//Check if the csvs area compatible
function compatibleCSVs() {
  if(csv_data.length>1){
    //Check the last with the first
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
    console.log("OUTPUT: Compatibles!");
  }
  return true;
}

// Build the data
function buildData(){
  console.log("OUTPUT: Building Data...");
  let contador = 0;
  let aspas = false;
  let line_vector = []
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
        if(csv_data[i][j]=="\n"){
          line_vector[column_vector[contador]]=aux;
          aux = "";
          data_matrix[data_matrix.length]=line_vector;
          line_vector = []
          contador = 0;
        }else if(csv_data[i][j]=="," && aspas==false){
          line_vector[column_vector[contador]]=aux;
          contador++;
          aux = "";
        }else if(csv_data[i][j]!="\""){
          aux+=csv_data[i][j];
        }else{
          if(aspas==false)
          aspas = true;
          else
          aspas=false;
        }
      }
    }
  }
  console.log(data_matrix);
  return;
}