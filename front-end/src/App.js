import { useEffect, useState } from 'react';
import { createArray } from './components/train';
import { displayResults, initNetwork } from './components/synaptic';

function App() {
  const [selectedFile, setSelectedFile] = useState(); // keeps file
	const [isFilePicked, setIsFilePicked] = useState(false); // keeps track of file
  const [textBox, setTextBox] = useState(""); // keeps track of text box
  const [neuralNet, setNeuralNet] = useState(); // keeps track of neural net

  useEffect( () => {
    // setNeuralNet(initNetwork());
  }, []) // ensures initNetwork() only runs once

  // FILE HANDLING
  const fileChangeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};
	const handleFileSubmission = () => {
    console.log("submitted file!")
    if (isFilePicked) {setNeuralNet(initNetwork(selectedFile))};
	};

  // TEXTBOX HANDLING
  const textChangeHandler = (e) => {
		setTextBox(e.target.value);
	};
  const handleTextSubmission = () => {
    console.log("submitted text!")
    displayResults(textBox, neuralNet);
	};

  return (
    <div className="App">
      <header className="App-header">
        <h1>WELCOME TO MACHNE LEARNING TEST</h1>
        <p>it is currently set up for XOR on textbox[0, 1]</p>
      </header>

      {/* MY CODE */}
      <div>
        <h3>INPUT TRAINING CSV HERE: </h3>
        <input
          type="file"
          accept=".csv" 
          onChange={fileChangeHandler}
        />
        <button hidden={isFilePicked ? "" : "hidden"} onClick={handleFileSubmission}>Submit</button>
      </div>
      <div>
        <div><textarea id="textbox" rows="2" cols="30" onChange={textChangeHandler}></textarea></div>
        <button onClick={handleTextSubmission}>Submit</button>
        <div id="results">PLEASE UPLOAD TRAINING CSV FIRST</div>
      </div>
    </div>
  );
}

export default App;
