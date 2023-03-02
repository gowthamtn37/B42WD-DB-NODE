import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const express = require("express"); // "type": "commonjs" 3rd party
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movies.router.js";
import usersRouter from "./router/users.router.js";
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
app.use("/users", usersRouter);

const mobiles = [
  {
    model: "OnePlus 9 5G",
    img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    company: "Oneplus",
  },
  {
    model: "Iphone 13 mini",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    company: "Apple",
  },
  {
    model: "Samsung s21 ultra",
    img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    company: "Samsung",
  },
  {
    model: "Xiomi mi 11",
    img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    company: "Xiomi",
  },
];
app.get("/mobiles", async function (request, response) {
  const result = await client
    .db("B42WD2")
    .collection("mobiles")
    .find({})
    .toArray();
  response.send(result);
});
//http://localhost:4000/mobiles

app.post("/mobiles", express.json(), async function (request, response) {
  const result = await client
    .db("B42WD2")
    .collection("mobiles")
    .insertMany(mobiles);
  response.send(result);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
