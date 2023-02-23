import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const express = require("express"); // "type": "commonjs" 3rd party
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";

const app = express();
const PORT = 4000;
//const PORT = process.env.PORT; //auto assign

console.log(process.env.MONGO_URL);
//.env = environmental variable
// const MONGO_URL = "mongodb://127.0.0.1";

const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(express.json());

//1
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🤩 B42WD");
});
//http://localhost:4000/

//2

app.get("/movies", async function (request, response) {
  // cursor=> pagination
  const movie = await client
    .db("B42WD2")
    .collection("movies")
    .find({})
    .toArray();
  response.send(movie);
});
//http://localhost:4000/movies

//3 Dummy => mockapi
app.get("/movies/:id", async function (request, response) {
  //console.log(request.params);

  const { id } = request.params;
  console.log(id);
  //const movie = movies.filter((mv)=> mv.id === id); // find array

  //const movie = movies.find((mv)=> mv.id === id); // find element
  const movie = await client
    .db("B42WD2")
    .collection("movies")
    .findOne({ id: id });

  movie
    ? response.status(404).send(movie)
    : response.send({ message: "movie not found" });
});
//http://localhost:4000/movies/id

//post
//express.json() - middleware
app.post("/movies", express.json(), async function (request, response) {
  const data = request.body;

  //db.movies.insertMany(data)
  const result = await client
    .db("B42WD2")
    .collection("movies")
    .insertMany(data);

  response.send(result);
});

//delete
app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("B42WD2")
    .collection("movies")
    .deleteOne({ id: id });

  console.log(result);
  result.deletedCount >= 1
    ? response.send({ message: "success fully deleted" })
    : response.status(404).send({ message: "movie not found" });
});

// update
app.put("/movies/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const result = await client
    .db("B42WD2")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });

  console.log(result);
  response.send(result);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
