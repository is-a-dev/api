const { Router } = require("express");

const router = Router();
const routes = require("./routes");

router.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 240, // 240 requests
	standardHeaders: true,
	legacyHeaders: false
})

router.use(limiter);

router.get("/", async (req, res) => {
    routes.index(req, res);
})

router.get("/check", async (req, res) => {
    routes.check(req, res);
})

router.get("/count", async (req, res) => {
    routes.count(req, res);
})

router.get("/lookup/domain", async (req, res) => {
    routes.lookup.domain(req, res);
})

router.get("/lookup/user", async (req, res) => {
    routes.lookup.user(req, res);
})

router.get("/raw", async (req, res) => {
    routes.raw(req, res);
})

module.exports = router;