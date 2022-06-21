import { createArray } from './train';
const { Layer, Network, Architect, Trainer } = window.synaptic; // Gathering components from Synaptic.js

function initNetwork(csv) {
	// This function initalizes the neural network. 

	// var inputLayer = new Layer(2); // 2 neurons
	// var hiddenLayer = new Layer(3); // 3 neurons
	// var outputLayer = new Layer(1); // 1 neuron

	// inputLayer.project(hiddenLayer); // connects inputLayer to hiddenLayer (all-to-all)
	// hiddenLayer.project(outputLayer); // connects hiddenLayer to outputLayer (all-to-all)

	// var myNetwork = new Network({
	// 	input: inputLayer,
	// 	hidden: [hiddenLayer],
	// 	output: outputLayer
	// });

    var myNetwork = new Architect.Perceptron(2,3,1);

	// train the network 
	var learningRate = 0.3; // controls how much to change the model in response to the estimated error each time the model weights are updated
	var iterations = 20000; // amount of training iterations
	var myTrainer = new Trainer(myNetwork);
    // let trainingSet = [ 
    //     {input: [0,0], output: [0]},
    //     {input: [0,1], output: [1]},
    //     {input: [1,0], output: [1]},
    //     {input: [1,1], output: [0]},
    // ];
    const trainNetwork = async () => {
        const trainingSet = await createArray(csv);
        myTrainer.trainAsync(trainingSet, {
            rate: learningRate,
            iterations: iterations,
            error: 0.003,
            log: 100,
            cost: Trainer.cost.CROSS_ENTROPY
        }).then(results => console.log('done!', results));
    }
    trainNetwork();
	return myNetwork;
}

function calculateScore(input, network) {
	// This function scores an input from 0...1 based on the trained neural network.
    var m = '';
	// var score=network.activate([input[0], input[1]]) // activating the network with input
    var score=network.activate([input])
	console.log("score"+score);
	var pscore=parseFloat(score).toFixed(3);
	console.log("pscore = "+pscore);
	if (score === 0.654) {
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
   

function displayResults(textbox, network) {
    // data from the HTML's textbox
	let data = textbox.replace(/(\r\n|\n|\r)/gm, ""); // cleaning data
    document.getElementById('results').innerHTML='Calculating...';
    calculateScore(data, network);
}

export { displayResults, initNetwork };
