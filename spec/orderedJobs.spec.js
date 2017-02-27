const orderJobs = require("../lib/orderedJobs.js").orderJobs;

describe("orderJobs", function(){

  it("exists", function(){
    expect(orderJobs).toBeDefined();
  });

  it("is a function", function(){
    expect(typeof orderJobs).toEqual("function");
  });

});

