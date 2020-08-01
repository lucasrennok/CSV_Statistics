
//Get a Random Color
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Create the vector colors
const generateColors = (len) => {
    let colors = []
    for(let i=0; i<len; i++){
        colors[colors.length] = getRandomColor();
    }
    return colors;
}

//this function will receive the data and create the charts
const generateCharts = (statistics) => {
    let keys = []
    let values = []
    let col_history = ""
    console.log("Generating Charts...");
    for(let [col,dat] of statistics){
        for(let [col2,dat2] of dat){
            if(col!=col_history){  //criar chart no html e armazenar dados appendChild
                let new_chart = document.createElement("canvas")
                let newBut = document.createElement("button")
                let div_stats = document.getElementById("div_stats")
                new_chart.setAttribute("width", "40%");
                new_chart.setAttribute("height", "40%");
                new_chart.setAttribute("id", "chart"+col);
                new_chart.setAttribute("padding", "1%");
                new_chart.setAttribute("margin", "auto");
                new_chart.setAttribute("margin-top", "0px");
                newBut.setAttribute("id", "but"+col);
                newBut.textContent = col;
                col_history=col;
                keys = [];
                values = [];
                div_stats.appendChild(newBut);
                newBut.addEventListener("click", function(){
                    let element = document.getElementById("chart"+col);
                    let el_but = document.getElementById("but"+col);
                    if(element.style.display=="none"){
                        element.style.display="block";
                        el_but.style.backgroundColor = "rgba(0,0,0,0.8)";
                    }else{
                        element.style.display="none";
                        el_but.style.backgroundColor = "grey";
                    }
                });
                div_stats.appendChild(new_chart);
            }
            keys[keys.length]=col2;
            values[values.length]=dat2;
        }
        let el = document.getElementById("chart"+col);
        let t = 'pie';
        let show = true;
        let colors = generateColors(keys.length)
        if(keys.length>10){
            t = 'bar';
            show = false;
            if(keys.length>150)
                t = 'line'
        }
        let chart = new Chart(el, {
            type: t,
            data: {
                datasets:[{
                    data: values,//values
                    backgroundColor: colors,//colors...
                    borderColor: 'gray',
                    borderWidth: 1
                }],
                labels: keys//keys
            },
            options:{
                title: {
                    fontColor: 'rgb(32, 32, 32)',
                    fontFamily: 'Ubuntu',
                    display: true,
                    fontSize: 15,
                    text: col
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: show
                }
            }
        });
        chart.draw();
        el.style.display = "none";
        console.log("Added Chart");
    }

}

//This function will receive the data and create the table
const generateTable = (data_matrix, column_vector, statistics, flag_column) =>{
    //One thing at a column and the information atributed to it in the other columns
    let table_data = new Map();
    let data = new Map();
    let column_default = column_vector[flag_column];
    for(let i=0; i<data_matrix.length; i++){
        for(let j=0; j<column_vector.length; j++){
            let name_col = data_matrix[i][column_vector[flag_column]];
            if(column_default!=column_vector[j]){
                if(table_data.has(name_col)==false){
                    for(let k=0; k<column_vector.length; k++){
                        if(column_default!=column_vector[k]){
                            data.set(column_vector[k], []);
                        }
                    }
                    table_data.set(name_col,data);
                }
                data = table_data.get(name_col);
                let vec_dat = data.get(column_vector[j]);
                let history_flag=false;
                for(let k=0; k<vec_dat.length; k=k+2){
                    if(vec_dat[k]===data_matrix[i][column_vector[j]]){
                        vec_dat[k+1]++;
                        history_flag=true;
                        break;
                    }
                }
                if(history_flag==false){
                    vec_dat[vec_dat.length] = data_matrix[i][column_vector[j]];
                    vec_dat[vec_dat.length] = 1;
                }
                data.set(column_vector[j], vec_dat);
                table_data.set(name_col,data);
            }
        }
        data = new Map();
    }
    console.log("OUTPUT TABLE:",table_data);

    console.log("Generating Table...");
    //Generate the table with "table_data" and "statistics"
    let div_stats = document.getElementById("div_stats");
    let table = document.createElement("table");
    table.setAttribute("id","table_"+column_default);
    div_stats.appendChild(table);

    //First row
    let row = document.createElement("tr");
    for(let i=0; i<column_vector.length; i++){
        let col = document.createElement("td"); //tem q alterar qual vai ser o primeiro
        col.setAttribute("class", "first_row");
        col.textContent = column_vector[i];
        row.appendChild(col);
    }
    table.appendChild(row);

    //Next rows => Data
    for(let [name,values] of table_data){
        row = document.createElement("tr");
        let col = document.createElement("td");
        col.textContent = name+" ("+statistics.get(column_default).get(name)+")";
        row.appendChild(col);
        table.appendChild(row);
        for(let [key_col, data_col] of values){
            let col = document.createElement("td");
            let result = "";
            for(let i=0; i<data_col.length; i++){
                if(i%2==0){
                    result+=data_col[i];
                }else{
                    result+=" ("+data_col[i]+")";
                    if(i+2<=data_col.length){
                        result+=", ";
                    }
                }
            }
            col.textContent = result;
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    console.log("Added Table");
}

//This function will work with the data received to generate the statistics data
const generateStatistics = (data_matrix,column_vector) => {
    console.log(column_vector);
    console.log(data_matrix);

    //Quantity of each thing at csv of each column
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

    //First: the table
    generateTable(data_matrix, column_vector, statistics, 0/*default*/);

    //Second: the chart
    generateCharts(statistics);
    console.log("OUTPUT CHARTS: ", statistics);
}

