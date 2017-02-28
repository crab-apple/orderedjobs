module.exports.orderJobs = orderJobs;

function orderJobs(input){ 

  var letters = input.replace(/[^a-z]/g, "").split("");
  letters = unique(letters);

  const jobPairs = input.split("\n")
  .map(function(line){
    return line.replace(/[^a-z]/g, "");
  }).filter(function(letters){
    return (letters.length === 2);
  });

  var swapped;
  do {
    swapped = false;
    jobPairs.forEach(function(pair){
      const indexOfA = letters.indexOf(pair[0]);
      const indexOfB = letters.indexOf(pair[1]);
      if(indexOfA < indexOfB){
        swap(letters, indexOfA, indexOfB);
        swapped = true;
      }
    });
  } while(swapped);

  return letters.join("");
}

function unique(arr){
  const hash = {};
  arr.forEach(function(ch){
    hash[ch] = null;
  });
  return Object.getOwnPropertyNames(hash);
}

function swap(arr, i1, i2){
  const tmp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = tmp;
}
