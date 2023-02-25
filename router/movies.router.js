import express from "express";
const router = express.Router();
import {
  getMovies,
  getMovieByID,
  createMovie,
  deleteMovie,
  updateMovies,
} from "../service/movies.service.js";

//2
router.get("/", async function (request, response) {
  // cursor=> pagination
  const movie = await getMovies();
  response.send(movie);
});
//http://localhost:4000/movies

//3 Dummy => mockapi
router.get("/:id", async function (request, response) {
  //console.log(request.params);

  const { id } = request.params;
  console.log(id);
  //const movie = movies.filter((mv)=> mv.id === id); // find array

  //const movie = movies.find((mv)=> mv.id === id); // find element
  const movie = await getMovieByID(id);

  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie not found" });
});
//http://localhost:4000/movies/id

//post
//express.json() - middleware
router.post("/", express.json(), async function (request, response) {
  const data = request.body;

  //db.movies.insertMany(data)
  const result = await createMovie(data);

  response.send(result);
});

//delete
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await deleteMovie(id);

  console.log(result);
  result.deletedCount >= 1
    ? response.send({ message: "success fully deleted" })
    : response.status(404).send({ message: "movie not found" });
});

// update
router.put("/:id", express.json(), async function (request, response) {
  request.header("Access-Control-Allow-Origin", "*");
  const { id } = request.params;
  const data = request.body;
  const result = await updateMovies(id, data);

  console.log(result);

  response.send(result);
});

export default router;
