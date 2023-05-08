const { Room, Booking } = require("../db.js");
const { Op, DataTypes } = require("sequelize");
const sequelize = require("sequelize");

const getRoom = async () => {
  const habitaciones = await Room.findAll({
    include: [
      {
        model: Booking,
        attributes: ["price"],
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
        sequelize.literal(
          '(SELECT COALESCE(SUM(person_number), 0) FROM "Bookings" WHERE "RoomId" = "Room"."id")'
        ),
        "person_number",
      ],
      [sequelize.fn("COALESCE", sequelize.col("Bookings.price"), 0), "price"],
    ],
  });
  console.log(habitaciones);
  return habitaciones;
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
      status: status,
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
        message: `El estado de la Habitación ${dataValues.number_room} fue actualizado a ${status.toUpperCase()}`,
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
