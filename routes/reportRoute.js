const router = require("express").Router();

const reportController = require("../controllers/reportController");

router.post("/", reportController.addReport);
router.get("/", reportController.getReport);

module.exports = router;
