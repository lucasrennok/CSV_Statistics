//this function will receive the data and create the graphs
const generateGraphs = (statistics) => {
    let keys = []
    let values = []
    console.log("Generating Graphics...");
    for(let [col,dat] of statistics){
        console.log("COLUMN NAME: ", col);
        for(let [col2,dat2] of dat){
            console.log(col2,dat2, "| PERCENT: ", (dat2/dat.size)," ==> ", dat.size);
            if(col=="Industry_code_NZSIOC"){
                keys[keys.length]=col2;
                values[values.length]=dat2;
            }
        }
    }
    let element = document.getElementById("myChart");
    element.style.width = "400px";
    element.style.height = "800px";
    let chart = new Chart(element, {
        type: 'pie',
        data: {
            datasets:[{
                data: values//,//values
                //backgroundColor: ['red','blue','black']//color...
            }],
            labels: keys//keys
        },
        option:{
            title: {
                text: 'Nome',
                display: true
            }
        }
    });

}

//This function will work with the data received to generate the statistics data
const generateStatistics = (data_matrix,column_vector) => {
    console.log(data_matrix);
    console.log(column_vector);
    //first: the graphics
    let line;
    let statistics = new Map();
    for(let i=0; i<column_vector.length; i++){
        line = new Map();
        for(let j=0; j<data_matrix.length; j++){
            let name_col = data_matrix[j][column_vector[i]];
            if(line.has(name_col)===false){
                line.set(name_col,1);
            }else{
                line.set(name_col,line.get(name_col)+1);
            }
        }
        statistics.set(column_vector[i], line);
    }

    console.log("OUTPUT: ", statistics);
    generateGraphs(statistics);
}

