import { useEffect, useState } from 'react';
import { createArray } from './components/train';

function App() {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
    console.log("submit!")
    if (isFilePicked) {createArray(selectedFile)};
	};


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* MY CODE */}
      <div>
        <h1>INPUT CSV HERE: </h1>
        <input
          type="file"
          accept=".csv" 
          onChange={changeHandler}
        />
        <button hidden={isFilePicked ? "" : "hidden"} onClick={handleSubmission}>Submit</button>
      </div>
      <div>
        <div><textarea id="textbox" rows="20" cols="100"></textarea></div>
        <div id="results"></div>
      </div>
    </div>
  );
}

export default App;
