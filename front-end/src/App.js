
function App() {
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
      <div>
        <h1>INPUT CSV HERE: </h1>
        <input type="file" accept=".csv" id="demoA"/>
      </div>
      <div>
        <div><textarea id="textbox" rows="20" cols="100"></textarea></div>
        <div id="results"></div>
      </div>
    </div>
  );
}

export default App;
