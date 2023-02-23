const fs = require("fs");



// //1

// const quote ="my life";
// fs.writeFile("./awesome.html",quote, (err)=>{
//     console.log("completed");
// });

// //2

// for(let i=1; i<=10; i++){
//     const quote2 ="work hard ";
// fs.writeFile(`./backup1/txt${i}.html`, quote2, (err)=>{
//     console.log(`completed ${i}`);
// })};

// //3

// for(let i=1; i<=process.argv[2]; i++){
//     const quote2 ="earn money & live ure life ";
// fs.writeFile(`./backup2/txt${i}.html`, quote2, (err)=>{
//     console.log(`completed ${i}`);
// })};

// fs.readFile("./cool.txt", "utf-8", (err,data)=>{if(err){
//     console.log("error")
// }
// else{
//     console.log(data)
// }})

// const quote3 = "Dream without fear, love without limits"

// fs.appendFile("./fun.html", "\n" + quote3, (error)=>{
//     console.log("completed writing")
// })

fs.unlink("./delete-me.css",(err)=>{
    console.log("complete deleting")
})