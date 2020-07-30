//This function will work with the data received to generate the statistics data
const generateStatistics = (data_matrix,column_vector,agrupate) => {
    console.log(data_matrix);
    console.log(column_vector);
    //first: the graphics
    let line;
    let statistics = new Map();
    for(let i=0; i<column_vector.length; i++){
        line = new Map();
        for(let j=0; j<data_matrix.length; j++){
            if(line.has([data_matrix[j][column_vector[i]]])==false){
                line.set([data_matrix[j][column_vector[i]]],1);
            }else{
                line.set([data_matrix[j][column_vector[i]]],line.get([data_matrix[j][column_vector[i]]])+1);
            }
        }
        statistics.set([column_vector[i]], line);
    }

    console.log(statistics);
    // for(let [col,dat] of statistics){
    //     console.log(col[0],dat);
    //     for(let [col2,dat2] of dat){
    //         console.log(col2[0],dat2);
    //     }
    // }
}

const generateTable = () => {
    ;
}
