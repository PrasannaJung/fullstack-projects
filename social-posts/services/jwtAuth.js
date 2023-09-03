const jwt = require("jsonwebtoken");
const SECRET_KEY = "supersecretkey";

async function createToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

async function verifyToken(token) {
  const payload = jwt.verify(token, SECRET_KEY);
  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};
