import { client } from "../index.js";

export async function createUser(data) {
  return await client.db("B42WD2").collection("users").insertOne(data);
}
export async function getUserName(username) {
  return await client
    .db("B42WD2")
    .collection("users")
    .findOne({ username: username });
}
