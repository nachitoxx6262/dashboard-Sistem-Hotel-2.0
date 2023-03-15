const { Client, Company,Booking,Room } = require("../db.js");
const axios = require("axios");
const { Op, DataTypes } = require("sequelize");
const { data_Dni, filtroDni, data_DniI } = require( "./functions.js");
const  sequelize =require("sequelize");
const moment = require('moment');
// #################🚨 GET  🚨    ####################
const getClient = async (name) => {
  let clients = await Client.findAll();
  return clients;
};
// #################🚨 CREATE Clients 🚨    ####################
const createClient = async (passenger,id,From,To,price) => {
  let cantPassenger = passenger.length
  // FORMATEO LA FECHA
  // const fromFormateada = moment(From, 'DD/MM/YYYY').format('YYYY-MM-DD');
  // const toFormateada = moment(To, 'DD/MM/YYYY').format('YYYY-MM-DD');
  console.log(From,To)
  // CREO LA RESERVA
  const reserva = await Booking.create({name:"No Reservada",price,person_number:cantPassenger,from:From,to:To})
  // BUSCO LA HABITACION Y LE ACTUALIZO EL STATUS
  const habitacion = await Room.findByPk(id);
  await habitacion.update({ status: 'ocupada' });
  await habitacion.setBookings(reserva);
  // MAPEO LOS PASAJEROS  FILTRO LOS DNI Y CREO EL CLIENTE
  passenger?.map(async(element) => {
    let { datos, tel, address, email, description } = element;
    let dni_filtrado = filtroDni(datos);
    if (dni_filtrado.length < 10) {
      let { name, gender, dni, birthdate } = data_Dni(dni_filtrado);
      const cliente = await Client.create({name,gender,dni,birthdate,tel,address,email,description,});
      let idNewClient = cliente.dataValues.id;
    } else {
      let { name, gender, dni, birthdate }  = data_DniI(dni_filtrado);
      const cliente = await Client.create({name,gender,dni,birthdate,tel,address,email,description,});
      let idNewClient = cliente.dataValues.id;
    }
  });
  // try {
  //   const clienteExistente = await Client.findOne({ where: { dni } });
  //   if (clienteExistente) {
  //     const clienteEnBlacklist = clienteExistente.dataValues.blacklist
  //     if (clienteEnBlacklist == "✅") {
  //       return({message : `El cliente con DNI ${dni} se encuentra en la lista negra.`, alert: true});
  //     }else{
  //       const nuevaVisita = clienteExistente.visit+" " + visit;
  //       await Client.update({ visit: nuevaVisita }, { where: { dni } });
  //       return ({message: `Client actualizado: ${clienteExistente.name}, visita: ${visit}`, alert: false});

  //     }
  //   } else {

  // let idRoom = id;
  // return { message: `Client creado: ${cliente.name}`, alert: false };
};
// } catch (error) {
//   console.log(error)
// }
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
