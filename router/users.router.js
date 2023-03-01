import express from "express";
import { createUser } from "../service/user.service.js";
import bcrypt from "bcrypt";
const router = express.Router();

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

//post
//express.json() - middleware
router.post("/signup", async function (request, response) {
  const { username, password } = request.body;

  const hashedPas = await generateHashedPassword(password);
  const result = await createUser({
    username: username,
    password: hashedPas,
  });
  response.send(result);
});

export default router;
