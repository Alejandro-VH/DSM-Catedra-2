const {Router} = require("express");

const { registerLoan, markLoanAsReturned, getLoans, getUserLoans } = require("../controllers/loan.controller");
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

router.post("/loan", validateJWT, registerLoan);

router.put("/loan/return/:id", validateJWT, markLoanAsReturned);

router.get("/loans", validateJWT, getLoans);

router.get("/loans/user/:user_id", validateJWT, getUserLoans);

module.exports = router;