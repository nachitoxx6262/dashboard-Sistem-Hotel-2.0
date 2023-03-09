const { Client,Company } = require("../db.js");
const axios = require("axios");
const { Op, DataTypes } = require("sequelize");
  // #################🚨 GET  🚨    ####################
  const getClient = async (name) => {
      let clients = await Client.findAll({
        include: [{ model: Company, attributes: ['name'],through: {attributes:[]} }]
      });;

      const clientsFormatted = clients.map((client) => {
        const empresas = client.Companys.map((empresa) => empresa.name);
        return { 
          ...client.toJSON(), 
          Company: empresas.join(', ') || null 
        };
      });
    
      return clientsFormatted;
  };
  // #################🚨 CREATE Clients 🚨    ####################
  const createClient = async (name,gender,dni,birthdate,tel,address,visit,blacklist,email,description) => {
    try {
      const clienteExistente = await Client.findOne({ where: { dni } });
      if (clienteExistente) {
        const clienteEnBlacklist = clienteExistente.dataValues.blacklist
        if (clienteEnBlacklist == "✅") {
          return({message : `El cliente con DNI ${dni} se encuentra en la lista negra.`, alert: true});
        }else{
          const nuevaVisita = clienteExistente.visit+" " + visit;
          await Client.update({ visit: nuevaVisita }, { where: { dni } });
          return ({message: `Client actualizado: ${clienteExistente.name}, visita: ${visit}`, alert: false});
          
        }
      } else {
        const cliente = await Client.create({name,gender,dni,birthdate,tel,address,blacklist,email,description});
        console.log(cliente)
        return ({message: `Client creado: ${cliente.name}`, alert: false});
      }
    } catch (error) {
      console.log(error)
    }
  };
  // #################🚨 GET Clients by DNI 🚨    ####################
  const getClientByDni = async (dni) => {
        let result = await Client.findAll({
          where: { dni: dni },
        });
        if (result) return result[0];
        else {
          {
            throw new Error("Id not found");
          }
        }
    }
// #################🚨 GET Clients by DNI 🚨    ####################
 const actualizarPersonaPorDNI= async(id, datos)=> {
      let {name,dni,sexo,fechanac,visitas,email,direccion,blacklist,tel} = datos
      try {
        // Busca la persona por ID
        const persona = await Client.findOne({
          where: {
            id: id
          }
        });
        if (!persona) {
          // Si no existe la persona, lanza una excepción
          throw new Error('No se encontró ninguna persona con ese DNI.');
        }
        // Actualiza los datos de la persona
        await persona.update({name,dni,sexo,fechanac,visitas,email,direccion,blacklist,tel});
    
        return persona;
      } catch (error) {
        console.error(error);
      }
    }
    const deleteClient =async(id)=>{
      try {
        const result = await Client.destroy({
          where: {
            id: id // el id del registro que se desea eliminar
          }
        });
        if (result === 0) {
          throw new Error(`No se encontró ningún usuario con id ${id}`);
        }
        console.log(`Usuario con id ${id} eliminado exitosamente`);
      } catch (error) {
        console.log('Error al eliminar el usuario:', error);
      }
    }
  const updateDate = async(id,visit)=>{
    console.log(visit)
    try{

      const clienteExistente = await Client.findOne({ where: { id } });
      const nuevaVisita = clienteExistente.visit+" " + visit;
      await Client.update({ visit: nuevaVisita }, { where: { id } });
      return ({message: "ok", alert: false});
    }catch(error){console.log(error)}
  }
    
    

module.exports = {getClient,createClient,getClientByDni,actualizarPersonaPorDNI,deleteClient,updateDate};