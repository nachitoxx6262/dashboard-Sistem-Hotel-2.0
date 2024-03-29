const { Router } = require("express");
const {
  createClient,
  getClient,
  updateClientByID,
  deleteClient,
} = require("../controllers/clientController.js");
const client = Router();
const isAuthenticated = require("../app.js")
// #################🚨 GET 🚨    ####################

client.get("/", async (req, res) => {
  let cliente = await getClient();
  res.json(cliente);
});

// POST DEL CLIENTE
client.post("/", async (req, res) => {
  let {passengers} = req.body;
  try {
    let cliente = await createClient(passengers);
    res.json(cliente);
  } catch (err) {
    console.log(err);
    res.status(404).json({ APIerror: err.message });
  }
});

// PUT DEL CLIENTE
client.put("/:id", async (req, res) => {
  let id = req.params.id;
  let datos = req.body;
  try {
    let cliente = await updateClientByID(id, datos);
    res.json(cliente);
  } catch (err) {
    res.status(404).json({ APIerror: err.message });
  }
});
client.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let cliente = await deleteClient(id);
    res.json(cliente);
  } catch (err) {
    res.status(404).json({ APIerror: err.message });
  }
});

module.exports = client;
