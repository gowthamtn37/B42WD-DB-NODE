import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const express = require("express"); // "type": "commonjs" 3rd party
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movies.router.js";
import cors from "cors";

const app = express();
// const PORT = 4000;
const PORT = process.env.PORT; //auto assign

console.log(process.env.MONGO_URL);
//.env = environmental variable
// const MONGO_URL = "mongodb://127.0.0.1";

const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(cors()); //3rd party middleware
app.use(express.json()); //inbuit middleware
//intercepts > apply middleware > converting body to json
//1
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🤩 B42WD");
});
//http://localhost:4000/

app.use("/movies", moviesRouter);
//app.use("/users", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
