import { useEffect, useState } from 'react';
// import { displayResults, initNetwork } from './components/synaptic';
import { displayResults, initNetwork, updateNetwork } from './components/brain';

function App() {
  const [selectedFile, setSelectedFile] = useState(); // keeps file
	const [isFilePicked, setIsFilePicked] = useState(false); // keeps track of file
  const [sentWord, setSentWord] = useState(""); // set sentiment word
  const [sentiment, setSentiment] = useState(""); // set sentiment word
  const [textBox, setTextBox] = useState(""); // keeps track of text box
  const [neuralNet, setNeuralNet] = useState(); // keeps track of neural net
  const [isNetinit, setIsNetInit] = useState(false);

  useEffect( () => {
    // setNeuralNet(initNetwork());
  }, []) // ensures initNetwork() only runs once

  // HANDLE NETWORK INIT
  const networkHandler = (e) => {
    setNeuralNet(initNetwork());
    setIsNetInit(true);
  };

  // FILE HANDLING
  const fileChangeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};
	const handleFileSubmission = () => {
    console.log("submitted file!");
    //(isFilePicked ? setNeuralNet(initNetwork(selectedFile)) : setNeuralNet(initNetwork()));
    (isFilePicked ? setNeuralNet(initNetwork(selectedFile)) : document.getElementById('results').innerHTML='PLEASE SELECT FILE BEFORE SUBMIT');
	};

  // SENTIMENT AHNDLING
  const sentWordHandler = (e) => {
    setSentWord(e.target.value);
    console.log(sentWord);
  }
  const sentimentHandler = (e) => {
    setSentiment(e.target.value);
  }
  const handleSentimentSubmission = () => {
    console.log("word: ", sentWord);
    console.log("sentiment: ", sentiment);
    updateNetwork(sentWord, sentiment, neuralNet);
  }

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
      </header>

      {/* MY CODE */}
      <div>
        <button onClick={networkHandler}>INITALIZE NEURAL NETWORK</button> 
        {/* hidden={isNetinit ? "hidden" : ""} */}
      </div>
      <div>
        <h3>INPUT TRAINING CSV HERE: </h3>
        <input
          type="file"
          accept=".csv" 
          onChange={fileChangeHandler}
        />
        <button onClick={handleFileSubmission}>Submit</button> 
        {/* hidden={isFilePicked ? "" : "hidden"} */}
      </div>
      <div>
        <h3>INPUT TRAINING WORD & SENTIMENT HERE: </h3>
        <textarea id="textbox" rows="1" cols="30" onChange={sentWordHandler}></textarea>
        <select defaultValue="" onChange={sentimentHandler} className="sentiment-select">
          <option value="" disabled>Select Sentiment</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
        <button hidden={isNetinit ? "" : "hidden"} onClick={handleSentimentSubmission}>Submit</button>
      </div>
      <div>
      <h3>INPUT TEST WORD HERE: </h3>
        <textarea id="textbox" rows="1" cols="30" onChange={textChangeHandler}></textarea>
        <button hidden={isNetinit ? "" : "hidden"} onClick={handleTextSubmission}>Submit</button>
        <div id="results">PLEASE INIT THE NEURAL NETWORK</div>
      </div>
    </div>
  );
}

export default App;
