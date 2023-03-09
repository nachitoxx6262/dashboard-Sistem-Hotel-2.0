const { Router } = require("express");
const {getCompany, createCompany,deleteCompany,updateCompany} = require("../controllers/companyController.js");
const company = Router();

company.get("/",async (req, res) => {
    let company = await getCompany();
    res.json(company);

})
company.put("/:id", async (req, res) => {
  let id = req.params.id;
  let datos = req.body;
  console.log(id);
  try {
    let cliente = await updateCompany(id, datos);
    res.json(cliente);
  } catch (err) {
    res.status(404).json({ APIerror: err.message });
  }
});
company.post("/", async (req, res) => {
    let {name,cuit,tel,adress,email,visit,blacklist,description} =req.body;
  
    try {
      let company = await createCompany(name,cuit,tel,adress,email,visit,blacklist,description);
      res.json(company);
    }catch (err) {
      res.status(404).json({ APIerror: err.message });
    }
  });
  company.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
      let cliente = await deleteCompany(id);
      res.json(cliente);
    } catch (err) {
      res.status(404).json({ APIerror: err.message });
    }
  });

module.exports = company;