// train.js will create take in a CSV and create a JSON for training Synaptic's neural net.

const { Trainer } = window.synaptic;

const onLoad = () => {
    window.onload = () => {
         // https://www.30secondsofcode.org/js/s/csv-to-array
        const CSVToArray = (data, delimiter = ',', omitFirstRow = false) => 
        data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\r\n')
        .map(v => v.split(delimiter));
        // (A) FILE PICKER
        let picker = document.getElementById("demoA");
       
        // (B) READ CSV FILE
        picker.onchange = () => {
          // (B1) GET SELECTED CSV FILE
          let selected = picker.files[0];
       
          // (B2) READ CSV INTO ARRAY
          let reader = new FileReader();
          reader.addEventListener("loadend", () => {
            // (B2-1) SPLIT ROWS & COLUMNS
            
            let data = reader.result.slice(reader.result.indexOf('\n') + 1).split("\r\n");
            for (let i in data) {
              data[i] = data[i].split(",");
              data[i] = {input: data[i][0], output: data[i][1]};
            }
            

            // var data = CSVToArray(reader.result, ',', true);
            // (B2-2) DONE
            // data = JSON.stringify(data);
            // picker.value = "";
            console.log(data);
            //createLocalFile(data);
          });
          reader.readAsText(selected);
        };
      };
}

const createLocalFile = (data) => {
    var fs = require('fs');
    var file = fs.createWriteStream('array.txt');
    file.on('error', function(err) { /* error handling */ });
    data.forEach(function(v) { file.write(v.join(', ') + '\n'); });
    file.end();
}


onLoad();