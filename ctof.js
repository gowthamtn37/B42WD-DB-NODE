console.log("celsius to fahrenheit")

//console.log(process.argv)

// c * (9/5) + 32

// let b = (process.argv[2]) * (9/5) + 32;
// console.log(b)

const celsiustofahrenheit =(celsius)=>{
    return (celsius *(9/5) + 32).toFixed(3);
}

//console.log(celsius(process.argv[2]));
//or array destructure 
const [,,celsius]=process.argv;
console.log(celsiustofahrenheit(celsius));