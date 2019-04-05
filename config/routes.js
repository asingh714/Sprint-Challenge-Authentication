const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate } = require("../auth/authenticate");
const UsersDB = require("../database/dbConfig");
const tokenService = require("../auth/token-service");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({
      error: "Please provide a username and password."
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    UsersDB("users")
      .insert(user)
      .then(ids => {
        const id = ids[0];
        UsersDB("users")
          .where({ id })
          .first()
          .then(user => {
            const token = tokenService.generateToken(user);
            res.status(201).json({ user, token });
          });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  }
}

function login(req, res) {
  const credentials = req.body;

  if (!credentials.username || !credentials.password) {
    res.status(400).json({
      error: "Please provide a username and password."
    });
  } else {
    UsersDB("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = tokenService.generateToken(user)
        res.status(200).json({ message: `${user.username} is logged in.`, token })
      } else {
        res.status(401).json({ message: "Invalid credentials" })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while logging in."
      })
    })
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
