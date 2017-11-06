function Neuron() {
  
  this.weights = [];

  this.getOutput = input => {
    if (!(input instanceof Array))
      return 0;
    
    if (this.weights.length == 0) 
      for (let i = 0; i < input.length; i++)
        this.weights.push(parseFloat(Math.random().toFixed(3)));
    
    let sum = 0;
    const count = this.weights.length;
    
    for (let i = 0; i < count; i++)
      sum += input[i] * this.weights[i];
    
    return parseFloat(sum.toFixed(3));
  }

  this.changeWeights = input => {
    for (let i = 0; i < this.weights.length; i++) 
      this.weights[i] += 0.3 * (input[i] - this.weights[i]);
  }
}

function Network() { 
  
  this._kohonensLayer = [];
  for (let i = 0; i < 7; i++) 
    this._kohonensLayer.push(new Neuron());
  
    
  this._calcLayerOutput = input => {
    let output = [];
    for (let neuron of this._kohonensLayer)
      output.push(neuron.getOutput(input));

    const winner = Math.max(...output);
    const index = output.indexOf(winner);
    for (let i = 0; i < output.length; i++) {
      if (i == index) output[i] = 1;
      else output[i] = 0;
    }
    console.log(output);
    return output;
  }

  this.study = input => {
    let iteration = 0; 
    let expectIndex = input.indexOf(Math.max(...input));
    do {
      iteration++;
      var result = this._calcLayerOutput(input).indexOf(1);
      this._kohonensLayer[result].changeWeights(input);
      
    } while (iteration < 30)
    
    return { result, iteration };
  }
}

const network = new Network();
console.log(network.study([1, 1, 0, 1, 0, 0, 1]));