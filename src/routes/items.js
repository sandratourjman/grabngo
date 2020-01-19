const express = require("express");
const router = express.Router();
const validation = require("./validation");
const helper = require("../auth/helpers");

const itemController = require("../controllers/itemController");

router.get("/lists/:listId/items", itemController.index);
router.post("/lists/:listId/items/create", itemController.create);
router.get("/lists/:listId/items/:id", itemController.show);
router.post("/lists/:listId/items/:id/destroy", itemController.destroy);
router.post("/lists/:listId/items/:id/update", itemController.update);

module.exports = router;