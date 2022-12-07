const { validationResult } = require("express-validator");
const model = require("../models/noclip.model");
const urlId = require("../uniqueid/gen.uniqueid");

function sendLocation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).end();
    return;
  }
  const foundLocation = model.addrDb.find((msg) => msg.urlid === req.params.id);
  if (foundLocation) {
    res.json({
      latitude: JSON.parse(foundLocation.latitude),
      longitude: JSON.parse(foundLocation.longitude),
    });
  } else {
    res.status(404).end();
  }
}

function saveLocation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).end();
    return;
  }
  model.addrDb.push({
    atitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  res.json({
    urlid: urlId(),
  });
}

function realTimeTx(req, res) {
  res.render("realtimetx.ejs", {
    urlid: urlId(),
    room: urlId(),
  });
}

function realTimeRx(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).end();
    return;
  }
  const foundLocation = model.addrDb.find((msg) => msg.urlid === req.params.id);
  if (foundLocation) {
    res.render("realtimerx.ejs", {
      room: req.params.id,
    });
  } else {
    res.redirect("/");
  }
}

module.exports = {
  sendLocation,
  saveLocation,
  realTimeTx,
  realTimeRx,
};
