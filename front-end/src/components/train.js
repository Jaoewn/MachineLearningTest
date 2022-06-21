const createArray = async (csv) => {
  var array = []; // empty array for returning
  let reader = new FileReader();
  reader.readAsText(csv);
  const result = await new Promise((resolve, reject) => {
    reader.onload = function(event) {
      let data = reader.result.slice(reader.result.indexOf('\n') + 1).split("\n");
      for (let i in data) {
        if (data[i] !== '') {
          data[i] = data[i].split(",");
          // console.log("Data[",i,"]=",data[i]);
          data[i] = {input: [parseInt(data[i][0][0]), parseInt(data[i][0][1])], output: [parseInt(data[i][1])]};
        }
      }
      if (data[data.length -1] === '') {data.pop()}; // popping last item if its empty
      // data = JSON.stringify(data);
      // console.log(data);
      array = data;
      resolve(data);
    };
  });
  return Promise.resolve(array);
};

export { createArray };