const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("../auth/authenticate");

const db = require("../database/dbConfig");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const userInfo = req.body;

  const hash = bcrypt.hashSync(userInfo.password, 14);

  userInfo.password = hash;

  db("users")
    .insert(userInfo)
    .then(id => {
      db("users")
        .where({ username: userInfo.username })
        .select("id", "username")
        .first()
        .then(user => {
          let token = generateToken(user);
          res.status(201).json({ user, token });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while creating the user. " });
    });
}

function login(req, res) {
  const credentials = req.body;

  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `${user.username} is logged in`, token });
      } else {
        res.status(401).json({ message: "Sorry you are not authorized." });
      }
    })
    .catch(err => res.status(500).json(err));
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
