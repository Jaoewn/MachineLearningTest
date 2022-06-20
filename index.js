const { Layer, Network } = window.synaptic; // Gathering components from Synaptic.js

function initNetwork() {
	// This function initalizes the neural network. 

	var inputLayer = new Layer(2); // 2 neurons
	var hiddenLayer = new Layer(3); // 3 neurons
	var outputLayer = new Layer(1); // 1 neuron

	inputLayer.project(hiddenLayer); // connects inputLayer to hiddenLayer (all-to-all)
	hiddenLayer.project(outputLayer); // connects hiddenLayer to outputLayer (all-to-all)

	var myNetwork = new Network({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});

	// train the network 
	var learningRate = 0.3; // controls how much to change the model in response to the estimated error each time the model weights are updated
	var iterations = 20000; // amount of training iterations
	for (var i = 0; i < iterations; i++)
	{
		// 0,0 => 0
		myNetwork.activate([0,0]);
		myNetwork.propagate(learningRate, [0]);

		// 0,1 => 1
		myNetwork.activate([0,1]);
		myNetwork.propagate(learningRate, [1]);

		// 1,0 => 1
		myNetwork.activate([1,0]);
		myNetwork.propagate(learningRate, [1]);

		// 1,1 => 0
		myNetwork.activate([1,1]);
		myNetwork.propagate(learningRate, [0]);
	}

	// Test the network
	console.log(myNetwork.activate([0,0])); // [0.015020775950893527]
	console.log(myNetwork.activate([0,1])); // [0.9815816381088985]
	console.log(myNetwork.activate([1,0])); // [0.9871822457132193]
	console.log(myNetwork.activate([1,1])); // [0.012950087641929467]
	return myNetwork;
}

function calculateScore(input, network) {
	// This function scores an input from 0...1 based on the trained neural network.
	var score=network.activate([input[0], input[1]]) // activating the network
	console.log("score"+score);
	var pscore=parseFloat(score).toFixed(3);
	console.log("pscore = "+pscore);
	if (score == 0.654) {
		m="neutral";
	}
	else if (score < 0.654) {
	  m='negative';
	}
	else  {
		m='positive';
	}
	document.getElementById('results').innerHTML="score = "+pscore+m;
	return input;
}
   

function displayResults() {
	var data='' // data from the HTML
	data = data.replace(/(\r\n|\n|\r)/gm, ""); // cleaning data
	document.getElementById('textbox').value='';
	document.getElementById('results').innerHTML='';
	document.getElementById('textbox').value=data;
	document.getElementById('results').innerHTML='Calculating...'
	let r = document.getElementById('textbox'); 
	r.addEventListener('input', function(e) { // listening for updates to textbox
		document.getElementById('results').innerHTML='Calculating...'
		var data=document.getElementById('textbox').value;
		calculateScore(data, initNetwork());
	});
}

displayResults();
