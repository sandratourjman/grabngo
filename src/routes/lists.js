const express = require("express");
const router = express.Router();
const validation = require("./validation");
const listController = require("../controllers/listController")

router.get("/lists", listController.index);
router.post("/lists/create", listController.create);
router.get("/lists/:id", listController.show);
router.post('/lists/:id/destroy', listController.destroy);
router.post('/lists/:id/update', listController.update);

module.exports = router;