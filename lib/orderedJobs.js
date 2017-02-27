module.exports.orderJobs = orderJobs;

function orderJobs(input){ 

  var letters = input.replace(/[^a-z]/g, "").split("");
  letters = unique(letters);

  return letters.join("");
}

function unique(arr){
  const hash = {};
  arr.forEach(function(ch){
    hash[ch] = null;
  });
  return Object.getOwnPropertyNames(hash);
}
