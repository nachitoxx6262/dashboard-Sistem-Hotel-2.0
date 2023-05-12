const { Room, Booking, Occupation,Client } = require("../db.js");
const { Op, DataTypes } = require("sequelize");
const sequelize = require("sequelize");

const getRoom = async () => {
  const rooms = await Room.findAll({
    include: [
      {
        model: Occupation,
        attributes: ["id", "price", "occupants"], 
        include: [
          {
            model: Client,
            attributes: ["id", "name", "dni"], // especificar las columnas que se quieren obtener del modelo Client
            through: { attributes: [] } // Omitir la columna "createdAt" y "updatedAt" de la tabla "occupation_clients"
          }
        ],
        where: {
          [Op.or]: [
            { from: { [Op.lte]: new Date() }, to: { [Op.gte]: new Date() } },
            { to: { [Op.gt]: new Date() } },
          ],
        },
        required: false,
      },
    ],
    attributes: [
      "id",
      "number_room",
      "capacity",
      "type",
      "status",
      [
        sequelize.literal('to_char("Occupations"."from", \'DD/MM/YYYY\')'),
        "formattedFrom",
      ],
      [
        sequelize.literal('to_char("Occupations"."to", \'DD/MM/YYYY\')'),
        "formattedTo",
      ],

    ],
  });
  return rooms;
};
const postRoom = async (number, capacity, type, status) => {
  try {
    // Verificar si la habitación ya existe
    const existingRoom = await Room.findOne({ where: { number_room: number } });
    if (existingRoom) {
      console.log(`La habitación N° ${number} ya existe`);
      return { message: `La habitación N° ${number} ya existe`, type: false };
    }

    let habitacion = await Room.create({
      number_room: number,
      capacity: capacity,
      status: "free",
      type: type,
    });
    console.log(`La habitacion N° ${number} ha sido creada con exito`);
    return {
      message: `La habitacion N° ${number} ha sido creada con exito`,
      type: true,
    };
  } catch (err) {
    console.log(`Hubo un error al crear la habitacion ${err}`);
    return {
      message: `Hubo un error al crear la habitacion ${err}`,
      type: false,
    };
  }
};
const putStatusRoom = async (id, status) => {
  try {
    const habitacion = await Room.findByPk(id);
    if (habitacion) {
      const result = await habitacion.update({ status });
      const { dataValues } = await Room.findByPk(id);
      console.log(
        `El estado de la Habitación ${dataValues.number_room} fue actualizado con exito`
      );
      return {
        message: `El estado de la Habitación ${
          dataValues.number_room
        } fue actualizado a ${status.toUpperCase()}`,
      };
    } else {
      console.log(`La habitación ${id} no existe`);
      return { message: `La habitación ${id} no existe`, type: "false" };
    }
  } catch (err) {
    console.log(`Hubo un error al actualizar la habitacion ${err}`);
    return {
      message: `Hubo un error al actualizar la habitacion ${err}`,
      type: "false",
    };
  }
};
const deleteRoom = async (id) => {
  try {
    const habitacion = await Room.findByPk(id);
    if (!habitacion) return { message: "La habitación no existe" };
    const result = await habitacion.destroy();
    if (result == 1) {
      return {
        message: `La habitacion ${habitacion.number_room} se ha eliminado correctamente`,
      };
    } else if (result == 0) {
      return {
        message: `La habitacion ${habitacion.number_room} no se ha eliminado correctamente`,
      };
    } else {
      return { message: `Ocurrió un error al eliminar una habitación` };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getRoom, postRoom, putStatusRoom, deleteRoom };
