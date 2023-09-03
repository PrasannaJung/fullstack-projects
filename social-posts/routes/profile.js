const router = require("express").Router();
const profileController = require("../controllers/profile");

router.get("/:id", profileController.getUserProfile);

module.exports = router;
