const express = require("express");

const noclipController = require("../controllers/noclip.controller");
const noclipRouter = express.Router();
const { param } = require("express-validator");

noclipRouter.get("/", noclipController.sendIndex);
noclipRouter.get(
  "/:id",
  [
    param("id", "Invalid ID").not().isEmpty(),
    param("id", "Invalid ID").isLength({ max: 2, min: 2 }),
  ],
  noclipController.sendLocation
);
noclipRouter.get("/realtime/tx", noclipController.realTimeTx);
noclipRouter.get(
  "/realtime/rx/:id",
  [
    param("id", "Invalid ID").not().isEmpty(),
    param("id", "Invalid ID").isLength({ max: 2, min: 2 }),
  ],
  noclipController.realTimeRx
);
noclipRouter.post("/", noclipController.saveLocation);

module.exports = noclipRouter;
