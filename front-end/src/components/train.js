const createArray = (csv) => {
  var array = []; // empty array for returning
  let reader = new FileReader();
  reader.addEventListener("loadend", () => {
    // Wait until file is loaded, then process CSV
    let data = reader.result.slice(reader.result.indexOf('\n') + 1).split("\n");
    for (let i in data) {
      if (data[i] !== '') {
        data[i] = data[i].split(",");
        data[i] = {input: [data[i][0]], output: [data[i][1]]};
      }
    }
    if (data[data.length -1] === '') {data.pop()}; // popping last item if its empty
    // data = JSON.stringify(data);
    console.log(data);
    array = data;
  });
  // Actual execution of file read
  reader.readAsText(csv);
  return array;
};

export { createArray };