const { Room, Client, Occupation } = require("../db.js");
const { Op, DataTypes } = require("sequelize");
const sequelize = require("sequelize");

const createOccupation = async (clientIds, roomId, price, from, to) => {
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      return { error: "Habitación no encontrada" };
    }
    if (room._previousDataValues.status !== "free") {
      return {
        error: `La Habitacion esta en estado ${room._previousDataValues.status.toUpperCase()}`,
      };
    }
    const clients = await Client.findAll({
      where: {
        id: clientIds,
      },
    });

    if (clients.length !== clientIds.length) {
      return { error: "Uno o más clientes no encontrados" };
    }

    const occupation = await Occupation.create({
      price,
      from,
      to,
      occupants: clientIds.length,
    });
    await occupation.setRoom(room);
    await occupation.addClients(clients);
    room.update({ status: "full" });
    return occupation;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { createOccupation };
