const { Router } = require("express");
const {createOccupation} = require("../controllers/occupationController.js");
const occupation = Router();

occupation.post("/", async (req, res) => {
    let {clientIds, roomId, price, from, to} = req.body;
    console.log(clientIds, roomId, price, from, to)
    try {
      const occupation = await createOccupation(clientIds, roomId, price, from, to);
      if (occupation.error) {
        return res.status(400).json({ error: occupation.error });
      }
      return res.status(201).json({ message: "La ocupación se creó exitosamente", data: occupation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocurrió un error al crear la ocupación" });
    }
  });

module.exports = occupation;
