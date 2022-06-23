import { createArray } from './train';
const { Layer, Network, Architect, Trainer } = window.synaptic; // Gathering components from Synaptic.js

function initNetwork(csv) { // This function initalizes the neural network. 
    var myNetwork = new Architect.Perceptron(2,3,1); // 1 input, 3 hidden, 1 output
	// train the network 
	var learningRate = 0.3; // controls how much to change the model in response to the estimated error each time the model weights are updated
	var iterations = 20000; // amount of training iterations
	var myTrainer = new Trainer(myNetwork);
    const trainNetwork = async () => {
        createArray(csv).then(trainingSet => {
            console.log("trainingSet: ", trainingSet);
            myTrainer.trainAsync(trainingSet, {
                rate: learningRate,
                iterations: iterations,
                error: 0.0001,
                log: 10000,
                cost: Trainer.cost.CROSS_ENTROPY
                }).then(results => console.log('training done!', results));
        });
        // myTrainer.XOR();
    }
    trainNetwork();
	return myNetwork;
}

function calculateScore(input, network) { // This function scores an input from 0...1 based on the trained neural network.
    var m = '';
    console.log([parseInt(input[0]), parseInt(input[1])]);
	var score=network.activate([parseInt(input[0]), parseInt(input[1])]) // activating the network with input
    //var score=network.activate(input); // don't need to put input in an array
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
   
function displayResults(textbox, network) { // This function triggers calculateScore
	let data = textbox.replace(/(\r\n|\n|\r)/gm, ""); // cleaning data
    document.getElementById('results').innerHTML='Calculating...';
    calculateScore(data, network);
}

export { displayResults, initNetwork };
