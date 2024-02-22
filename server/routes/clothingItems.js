const express = require("express");
const clothingItemsController = require("../controllers/clothingItems");

const router = express.Router();

router.get("/", clothingItemsController.getClothingItems);

router.post(
  "/createClothingItem",
  clothingItemsController.postCreateClothingItems
);

router.post(
  "/incrementNumWearsById",
  clothingItemsController.postIncrementNumWearsById
);

router.post(
  "/decrementNumWearsById",
  clothingItemsController.postDecrementNumWearsById
);

router.post(
  "/resetNumWearsById",
  clothingItemsController.postResetNumWearsById
);

router.post("/saveEdits", clothingItemsController.postSaveEdits);

module.exports = router;
