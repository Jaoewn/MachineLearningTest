import { createArray } from './train';
// const brain = window.brain; // Gathering components from Brain.js

import brain from 'https://cdn.skypack.dev/brain.js';

function initNetwork(csv) { // This function initalizes the neural network. 
    
    let myNetwork = new brain.recurrent.LSTM();
	// train the network 
	let learningRate = 0.3; // controls how much to change the model in response to the estimated error each time the model weights are updated
	let iterations = 10000; // amount of training iterations
    let errorThresh = 0.005; // less error = better predictions
    const trainNetwork = async () => {
        createArray(csv).then(trainingSet => {
            console.log("trainingSet: ", trainingSet);
            myNetwork.train(trainingSet, {
                learningRate: learningRate,
                iterations: iterations,
                errorThresh: errorThresh,
                log: false, // log: details => console.log(details),
                logPeriod: 100
                });
                // .then(results => console.log('training done!', results));;
                console.log('training done!');
                document.getElementById('results').innerHTML='NEURAL NET INITALIZED';
        })
    };
    trainNetwork();
	return myNetwork;
}

function calculateScore(input, network) { // This function scores an input from 0...1 based on the trained neural network.
    var m = '';
    console.log([parseInt(input[0]), parseInt(input[1])]);
	var score=network.run([parseInt(input[0]), parseInt(input[1])]) // activating the network with input
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
