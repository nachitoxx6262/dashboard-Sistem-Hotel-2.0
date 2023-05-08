const { Router } = require("express");
const {createOccupation} = require("../controllers/occupationController.js");
const occupation = Router();

occupation.post("/", async (req, res) => {
    let {clientIds, roomId, price, from, to} = req.body;
    try {
      let response = await createOccupation(clientIds, roomId, price, from, to);
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(404).json({ APIerror: err.message });
    }
  });

module.exports = occupation;
