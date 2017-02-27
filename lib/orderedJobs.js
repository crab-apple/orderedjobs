module.exports.orderJobs = orderJobs;

function orderJobs(input){ 
  return input.replace(/[^a-z]/g, "");
}
