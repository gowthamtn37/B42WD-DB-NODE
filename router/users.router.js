import express from "express";
import { createUser, getUserName } from "../service/user.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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
  const formDB = await getUserName(username);
  console.log(formDB);

  if (formDB) {
    response.status(400).send({ message: "username already exits" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: "password must be atleast 8 letters" });
  } else {
    const hashedPas = await generateHashedPassword(password);
    const result = await createUser({
      username: username,
      password: hashedPas,
    });
    response.send(result);
  }
});

//login - message - login sucessfull | invalid credentials

router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  const formDB = await getUserName(username);
  console.log(formDB);

  if (!formDB) {
    response.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedDBPassword = formDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);
    if (isPasswordCheck) {
      const token = Jwt.sign({ id: formDB._id }, process.env.Secret_Key);
      response.send({ message: "Sucessful Login", token: token });
    } else {
      response.status(401).send({ message: "Invalid Credentials" });
    }
  }
});

export default router;
