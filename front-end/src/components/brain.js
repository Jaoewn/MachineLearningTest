import { createArray } from './train';
// const brain = window.brain; // Gathering components from Brain.js

import brain from 'https://cdn.skypack.dev/brain.js';

const initNetwork = (csv) => { // This function initalizes the neural network. 
    
    let myNetwork = new brain.recurrent.LSTM();
	// train the network 
	let learningRate = 0.1; // controls how much to change the model in response to the estimated error each time the model weights are updated
	let iterations = 2000; // amount of training iterations
    let errorThresh = 0.02; // less error = better predictions
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
    if (csv) { trainNetwork() }
    else {
        let regex = /(?<=error: )[\s\S]*/;
        var finalError = 0;
        document.getElementById('results').innerHTML='NEURAL NET LOADING... DO NOT LEAVE';
        let trainingSet = [
            {input: "positive", output: 1},
            {input: "neutral", output: 0},
            {input: "negative", output: -1},
            {input: "pos", output: 1},
            {input: "neg", output: 0},
            {input: "neu", output: -1},
        ]
        myNetwork.train(trainingSet, {
            learningRate: learningRate,
            iterations: iterations,
            errorThresh: errorThresh,
            log: details => finalError = parseFloat(regex.exec(details)[0]),
            logPeriod: 1
            });
            // .then(results => console.log('training done!', results));;
            console.log('default training done! Final Error: ', finalError);
            document.getElementById('results').innerHTML='NEURAL NET INITALIZED';
    }
	return myNetwork;
}

const updateNetwork = (input, output, network) => {
    var sentiment = 0;
    switch(output) {
        case "positive": 
            sentiment = 1;
            break;
        case "neutral": 
            sentiment = 0;
            break;
        case "negative": 
            sentiment = -1;
            break;
        default:
            sentiment = 0;
            break;
    }
    network.train([{input: String(input), output: parseInt(sentiment)}], {
        learningRate: 0.3,
        iterations: 500,
        errorThresh: 0.005,
        log: true,
        logPeriod: 1
    });
}

const calculateScore = (input, network) => { // This function scores an input from 0...1 based on the trained neural network.
    // var m = '';
	var score = network.run(String(input)) // activating the network with input
	console.log("score: "+score);
	// var pscore=parseFloat(score).toFixed(3);
	// console.log("pscore = "+pscore);
	// if (score === 0.654) {
	// 	m="neutral";
	// }
	// else if (score < 0.654) {
	//   m='negative';
	// }
	// else  {
	// 	m='positive';
	// }
	// document.getElementById('results').innerHTML="score = "+pscore+m;
    document.getElementById('results').innerHTML="score = "+score;
	return input;
}
   
const displayResults = (textbox, network) => { // This function triggers calculateScore
	let data = textbox.replace(/(\r\n|\n|\r)/gm, ""); // cleaning data
    document.getElementById('results').innerHTML='Calculating...';
    calculateScore(data, network);
}

export { displayResults, initNetwork, updateNetwork };
