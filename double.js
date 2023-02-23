//console.log("hello Gowtham 👍🏻")


// console.log(document);❌
// console.log(window);❌

//console.log(global); // ✅only in node


console.log(process.argv); //argument value

const dbl =(n)=>n * 2 ;
console.log(dbl(10));

console.log(dbl(process.argv[2]));