module.exports.orderJobs = orderJobs;

function orderJobs(input){ 

  var letters = input.replace(/[^a-z]/g, "").split("");
  letters = unique(letters);

  const jobDeclarations = input.split("\n").map(function(line){
    return new JobDeclaration(line);
  });

  const declarationsWithDependencies = jobDeclarations.filter(function(jd){
    return jd.hasDependency();
  });

  var swapped;
  do {
    swapped = false;
    declarationsWithDependencies.forEach(function(decl){
      const iJob = letters.indexOf(decl.job);
      const iDependency = letters.indexOf(decl.dependency);
      if(iJob < iDependency){
        swap(letters, iJob, iDependency);
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

function JobDeclaration(str) {

  const letters = str.replace(/[^a-z]/g, "");

  this.job = letters[0];
  this.dependency = letters[1];

  this.hasDependency = function(){
    return !!this.dependency;
  }

}
