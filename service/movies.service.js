import { client } from "../index.js";

export async function updateMovies(id, data) {
  return await client
    .db("B42WD2")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovie(id) {
  return await client.db("B42WD2").collection("movies").deleteOne({ id: id });
}
export async function createMovie(data) {
  return await client.db("B42WD2").collection("movies").insertOne(data);
}
export async function getMovieByID(id) {
  return await client.db("B42WD2").collection("movies").findOne({ id: id });
}
export async function getMovies() {
  return await client.db("B42WD2").collection("movies").find({}).toArray();
}
