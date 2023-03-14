const { Router } = require("express");
const {
  getClientByDni,
  createClient,
  getClient,
  actualizarPersonaPorDNI,
  deleteClient,updateDate
} = require("../controllers/clientController.js");
const client = Router();

// #################🚨 GET 🚨    ####################
// POST DEL CLIENTE
client.post("/:id", async (req, res) => {
let {passengers,From,To,price} = req.body
console.log(From,To)
 let {id} = req.params
     try {
       let cliente = await createClient(passengers,id,From,To,price);
       console.log(cliente)

       res.json(cliente);
     }catch (err) {
       console.log(err)
       res.status(404).json({ APIerror: err.message });
     }
});
// GET DEL CLIENTE por dni o no
client.get("/:dni", async (req, res) => {
  let dni = req.params.dni;
  try {
    if (dni) {
      let cliente = await getClientByDni(dni);
      res.json(cliente);
    } 
  } catch (err) {
    res.status(404).json({ APIerror: err.message });
  }
});
client.get("/",async (req, res) => {
        let cliente = await getClient();
        res.json(cliente);

})
// PUT DEL CLIENTE
client.put("/:id", async (req, res) => {
  let id = req.params.id;
  let datos = req.body;
  console.log(id);
  try {
    let cliente = await actualizarPersonaPorDNI(id, datos);
    res.json(cliente);
  } catch (err) {
    res.status(404).json({ APIerror: err.message });
  }
});
client.put("/date/:id", async (req, res)=>{
  console.log(req.body)
  let id = req.params.id;
  let visit = req.body.date
  try {
    let cliente = await updateDate(id,visit);
    res.json(cliente);
  } catch (err) {
    res.status(404).json({ APIerror: err.message });
  }
})
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
