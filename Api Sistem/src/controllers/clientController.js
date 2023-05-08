const { Client, Company, Booking, Room } = require("../db.js");
const axios = require("axios");
const { Op, DataTypes } = require("sequelize");
const { data_Dni, filtroDni, data_DniI } = require("./functions.js");
const sequelize = require("sequelize");
const moment = require("moment");
// #################🚨 GET  🚨    ####################
const getClient = async (name) => {
  let clients = await Client.findAll();
  return clients;
};
// #################🚨 CREATE Clients 🚨    ####################
const createClient = async ({
  name,
  gender,
  dni,
  birthdate,
  tel,
  adress,
  visit,
  blacklist,
  email,
  company,
  description,
}) => {
  try {
    const clienteExistente = await Client.findOne({ where: { dni } });
    if (clienteExistente) {
      const clienteEnBlacklist = clienteExistente.dataValues.blacklist;
      if (clienteEnBlacklist == "✅") {
        return {
          message: `El cliente con DNI ${dni} se encuentra en la lista negra.`,
          alert: true,
        };
      } else {
        const nuevaVisita = clienteExistente.visit + " " + visit;
        await Client.update({ visit: nuevaVisita }, { where: { dni } });
        return {
          message: `Cliente actualizado: ${clienteExistente.name}, visita: ${visit}`,
          alert: false,
        };
      }
    } else {
      const cliente = await Client.create({
        name,
        gender,
        dni,
        birthdate,
        tel,
        adress,
        visit,
        blacklist,
        email,
        description,
      });
      if (company) {
        const empresa = await Company.findOne({
          where: { name: company.toUpperCase() },
        });

        if (empresa) {
          await cliente.addCompany(empresa);
          return {
            message: `Cliente creado: ${cliente.name} asociado a la empresa ${empresa.name}`,
            alert: false,
          };
        } else {
          return {
            message: `No se encontró la empresa con nombre ${company}`,
            alert: true,
          };
        }
      } else {
        const client = await cliente.addCompany("FAMILIA");
        return {
          message: `Cliente creado sin empresa asignada: ${cliente.name}`,
          alert: false,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// ##############🚨 GET Clients by DNI 🚨    ####################
const updateClientByID = async (id, datos) => {
  let { name, dni, sexo, fechanac, visitas, email, direccion, blacklist, tel } =
    datos;
  try {
    // Busca la persona por ID
    const persona = await Client.findOne({
      where: {
        id: id,
      },
    });
    if (!persona) {
      // Si no existe la persona, lanza una excepción
      throw new Error("No se encontró ninguna persona con ese DNI.");
    }
    // Actualiza los datos de la persona
    await persona.update({
      name,
      dni,
      sexo,
      fechanac,
      visitas,
      email,
      direccion,
      blacklist,
      tel,
    });

    return persona;
  } catch (error) {
    console.error(error);
  }
};
const deleteClient = async (id) => {
  try {
    const result = await Client.destroy({
      where: {
        id: id, // el id del registro que se desea eliminar
      },
    });
    if (result === 0) {
      throw new Error(`No se encontró ningún usuario con id ${id}`);
    }
    console.log(`Usuario con id ${id} eliminado exitosamente`);
  } catch (error) {
    console.log("Error al eliminar el usuario:", error);
  }
};

module.exports = {
  getClient,
  createClient,
  updateClientByID,
  deleteClient,
};
