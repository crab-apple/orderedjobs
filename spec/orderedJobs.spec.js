const orderJobs = require("../lib/orderedJobs.js").orderJobs;

describe("orderJobs", function(){

  it("exists", function(){
    expect(orderJobs).toBeDefined();
  });

  it("is a function", function(){
    expect(typeof orderJobs).toEqual("function");
  });

  describe("the output", function(){

    it("is a string", function(){
      forAllValidInputs(function(input, output){
        return ((typeof output) === "string");
      });
    });

    it("contains all the letters in the input", function(){
      forAllValidInputs(function(input, output){
        const letters = input.split("").filter(function(ch){
          return isALetter(ch);
        });
        return letters.every(function(letter){
          return (output.indexOf(letter) !== -1);
        });
      });
    });

    it("contains only the letters in the input", function(){
      forAllValidInputs(function(input, output){
        const letters = input.split("").filter(function(ch){
          return isALetter(ch);
        });
        return output.split("").every(function(ch){
          return (letters.indexOf(ch) !== -1);
        });
      });
    });

    it("contains each letter only once", function(){
      forAllValidInputs(function(input, output){
        const counts = {};
        output.split("").forEach(function(ch){
          counts[ch] = counts[ch] || 0;
          counts[ch]++;
        });
        return Object.getOwnPropertyNames(counts).every(function(key){
          return counts[key] === 1;
        });
      });
    });

    it("contains jobs in order", function(){
      forAllValidInputs(function(input, output){
        const jobPairs = input.split("\n")
        .map(function(line){
          return line.replace(/[^a-z]/g, "");
        }).filter(function(letters){
          return (letters.length === 2);
        });

        return jobPairs.every(function(pair){
          const dependant = pair[0];
          const dependency = pair[1];
          return isBefore(output, dependency, dependant);
        });
      });
    });

  });

  function forAllValidInputs(predicate){
    const predicateHolds = allValidInputs().every(function(input){
      const output = orderJobs(input);
      return predicate(input, output);
    });
    expect(predicateHolds).toBe(true);
  }

  function allValidInputs(){
    return [

      "",

      "a =>",

      "a =>\n" +
      "b =>\n" +
      "c =>",

      "a =>\n" +
      "b => c\n" +
      "c =>",

      "a =>\n" +
      "b => c\n" +
      "c => f\n" +
      "d => a\n" +
      "e => b\n" +
      "f =>"

    ]
  }

  function isALetter(ch){
    return ch.charCodeAt(0) >= "a".charCodeAt(0)
          && ch.charCodeAt(0) <= "z".charCodeAt(0);
  }

  function isBefore(str, a, b){
    const indexOfA = str.indexOf(a);
    const indexOfB = str.indexOf(b);
    return (indexOfA >= 0) 
            && (indexOfB >= 0)
            && (indexOfA < indexOfB);
  }

});


