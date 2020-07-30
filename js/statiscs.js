//this function will receive the data and create the graphs
const generateGraphs = (statistics) => {
    let keys = []
    let values = []
    let col_history = ""
    console.log("Generating Graphics...");
    for(let [col,dat] of statistics){
        console.log("COLUMN NAME: ", col);
        for(let [col2,dat2] of dat){
            //console.log(col2,dat2, "| PERCENT: ", (dat2/dat.size)," ==> ", dat.size);
            if(col!=col_history){  //criar chart no html e armazenar dados appendChild
                let new_chart = document.createElement("canvas")
                let div_stats = document.getElementById("div_stats")
                new_chart.setAttribute("width", "40%");
                new_chart.setAttribute("height", "40%");
                new_chart.setAttribute("id", col);
                col_history=col;
                keys = [];
                values = [];
                div_stats.appendChild(new_chart);
            }
            keys[keys.length]=col2;
            values[values.length]=dat2;
        }
        let el = document.getElementById(col);
        let chart = new Chart(el, {
            type: 'line',
            data: {
                datasets:[{
                    data: values,//values
                    backgroundColor: ['rgba(201, 165, 8, 0.8)'],//color...
                    borderColor: ['rgba(0, 0, 0, 0.9);'],
                    borderWidth: 5
                }],
                labels: keys//keys
            },
            options:{
                title: {
                    fontColor: 'rgb(32, 32, 32)',
                    fontFamily: 'Ubuntu',
                    display: true,
                    fontSize: 20,
                    text: col
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        chart.draw()
        console.log("Added Chart")
    }

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

