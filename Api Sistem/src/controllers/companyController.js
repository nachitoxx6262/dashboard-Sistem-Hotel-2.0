const { Empresa } = require("../db.js");
const axios = require("axios");
const { Op, DataTypes } = require("sequelize");
  // #################🚨 GET Empresa 🚨    ####################
  const getCompany = async (name) => {
      let empresas = await Empresa.findAll();

      return empresas;
  };
  // #################🚨 POST Empresa  🚨    ####################
  const createCompany = async (name,cuit,tel,adress,email,visit,blacklist,description) => {
    if (cuit) {
      let check = await Empresa.findAll({
        where: { cuit: cuit },
      });
      if (check.length == 1) {
        return { message: `La empresa con ese CUIT ya existe: ${cuit}`, alert: true };
      }
    }
    if(name){
      let nameExist = await Empresa.findAll({
        where: { name: name },
      });
      if (nameExist.length == 1) {
        return { message: `Esta empresa ya existe ${nameExist[0].dataValues.name}`, alert: true };
      }
      const newClient = await Empresa.create({ name, cuit, tel, adress, email, visit, blacklist, description });
      return { message: `Empresa creada: ${newClient.name}`, alert: false };
    }else{
      return { message: `Falta el Nombre de la empresa`, alert: true };
    }
  };

  const deleteCompany =async(id)=>{
    try {
      const result = await Empresa.destroy({
        where: {
          id: id // el id del registro que se desea eliminar
        }
      });
      if (result === 0) {
        throw new Error(`No se encontró ningúna empresa con id ${id}`);
      }
      console.log(`Empresa con id ${id} eliminado exitosamente`);
    } catch (error) {
      console.log('Error al eliminar el empresa:', error);
    }
  }

// #################🚨 GET Clientes by DNI 🚨    ####################
const updateCompany= async(id, datos)=> {
  let {name,cuit,tel,adress,email,visit,description,blacklist} = datos
  try {
    // Busca la persona por ID
    const company = await Empresa.findOne({
      where: {
        id: id
      }
    });
    if (!company) {
      // Si no existe la persona, lanza una excepción
      throw new Error('No se encontró ninguna empresa  con ese id.');
    }
    // Actualiza los datos de la persona
    await company.update({name,cuit,tel,adress,email,visit,description,blacklist});

    return company;
  } catch (error) {
    console.error(error);
  }
}
  module.exports = {getCompany,createCompany,deleteCompany,updateCompany};