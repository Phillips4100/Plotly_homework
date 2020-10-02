
// var data = d3.json("samples.json")
//     //  Create the Traces
// var trace1 = {
//     x: data.sample_values,
//     y: data.otuIdss,
//     type: "bar",
//     name: "top 10 OTUs found",
// }

// var ids = data.samples[0].otuIdss;

// // console.log(data);
// console.log(ids);

// function filterIds() {
//     return samples[0].id = 941;
//   }
// console.log(filterIds())
// var sample = 940
// data = 'samples.json';
// names = d3.json(data.samples);
// console.log(names);

function init() {
    // select dropdown menu read data and append to dropdown list
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        // console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

    //    display the data and the plots to the page
        getBar(data.names[0]);
        getDemo(data.names[0]);
    });
}

init();

function getBar(id) {
    d3.json("samples.json").then ((sampledata) =>{
        var samples = sampledata.samples;
        // console.log(samples)
        var filtered = samples.filter(s => s.id.toString() === id)[0];
        // console.log(filtered)
        var values =  filtered.sample_values.slice(0,10).reverse();
        var ids = filtered.otu_ids;
        var labels =  filtered.otu_labels;
        // get top 10 otu ids and reversing for the plot OTU. 
        var top_ids = ( filtered.otu_ids.slice(0, 10)).reverse();
        var otuIds = top_ids.map(d => "otu " + d);
        // console.log(`otu_ids: ${otuIds}`)
        // console.log(`otu_labels: ${labels}`)

        var trace1 =[{
            type: 'bar',
            orientation: 'h',
            x: values,
            y: otuIds,
            text: labels,
        }];

        var layout = {
            title: "Top 10 OTUs",
        }        

        Plotly.newPlot('bar', trace1, layout);

        var trace2 = [{

        }]
    });
};

function getDemo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        // console.log(metadata)
    
        // select demo panel filter meta data by id and append to list
        var demographicInfo = d3.select("#sample-metadata");
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    getBar(id);
    getDemo(id);
}

// // Call updatePlotly() when a change takes place
d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
}
//   // Initialize x and y arrays
//   var x = [];
//   var y = [];

//   if (dataset === 'dataset1') {
//     x = [1, 2, 3, 4, 5];
//     y = [1, 2, 4, 8, 16];
//   }

//   if (dataset === 'dataset2') {
//     x = [10, 20, 30, 40, 50];
//     y = [1, 10, 100, 1000, 10000];
//   }

//   // Note the extra brackets around 'x' and 'y'
//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("plot", "y", [y]);
// }

// getBar();
// )};