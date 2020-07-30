//this function will receive the data and create the graphs
const generateGraphs = (statistics) => {
    console.log("Generating Graphics...");
    for(let [col,dat] of statistics){
        console.log("COLUMN NAME: ", col);
        for(let [col2,dat2] of dat){
            console.log(col2,dat2, "| PERCENT: ", (dat2/dat.size));
        }
    }
    let element = document.getElementById("myChart");
    let chart = new Chart(element, {
        type: 'pie',
        data: {
            datasets:[{
                label: 'padrao',//column names
                data: [10,20,30],//values
                backgroundColor: ['red','blue','black']//color...
            }],
            labels: ['try','oi','red']//keys
        },
        option:{

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
            if(line.has(name_col)==false){
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

