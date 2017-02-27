module.exports.orderJobs = orderJobs;

function orderJobs(input){ 
  const lettersHash = {};
  input.replace(/[^a-z]/g, "")
  .split("")
  .forEach(function(ch){
    lettersHash[ch] = null;
  });

  const letters = Object.getOwnPropertyNames(lettersHash);

  return letters.join("");
}
