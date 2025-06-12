const {Router} = require("express");

const { register, login, me } = require("../controllers/user.controller");
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me",validateJWT, me);

module.exports = router;