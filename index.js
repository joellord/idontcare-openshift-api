const express    = require("express");
const randopeep = require("randopeep");
const expressjwt = require("express-jwt");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const USEKEYCLOAK = !!process.env.KEYCLOAK || false;
const PORT = process.env.PORT || 8888;
const SECRET = process.env.SECRET;

let jwtCheckOptions = {};

jwtCheckOptions = {
  secret: SECRET
};

const jwtCheck = expressjwt(jwtCheckOptions);

app.use(cors());

app.get("/headline", function(req, res) {
    res.status(200).send(randopeep.clickbait.headline());
});

app.get("/protected/headline", jwtCheck, function(req, res) {
    res.status(200).send(randopeep.clickbait.headline("Joel Lord"));
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

app.listen(PORT, () => console.log(`API started on port ${PORT}`));