import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function updateMovies(id, data) {
  return await client
    .db("B42WD2")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovie(id) {
  return await client
    .db("B42WD2")
    .collection("movies")
    .deleteOne({ _id: new ObjectId(id) });
}
export async function createMovie(data) {
  return await client.db("B42WD2").collection("movies").insertOne(data);
}
export async function getMovieByID(id) {
  return await client
    .db("B42WD2")
    .collection("movies")
    .findOne({ _id: new ObjectId(id) });
}
export async function getMovies(query) {
  return await client.db("B42WD2").collection("movies").find(query).toArray();
}
