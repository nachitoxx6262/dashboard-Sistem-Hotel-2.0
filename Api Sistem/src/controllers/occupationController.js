const { Room, Client, Occupation } = require("../db.js");
const { Op, DataTypes } = require("sequelize");
const sequelize = require("sequelize");

const createOccupation = async (clientIds, roomId, price, from, to) => {
  try {
      const room = await Room.findByPk(roomId);
      if (!room) {
        return { error: "Room not found" };
      }
      if (room._previousDataValues.status !== "libre"){
        return { error: `La Habitacion esta en estado ${room._previousDataValues.status.toUpperCase()}` };
      }
    const clients = await Client.findAll({
      where: {
        id: clientIds,
      },
    });

    if (clients.length !== clientIds.length) {
      return { error: "One or more clients not found" };
    }

    const occupation = await Occupation.create({
      price,
      from,
      to,
    });
    await occupation.setRoom(room);
    await occupation.addClients(clients);
    room.update({ status: "ocupada" });
    return occupation;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { createOccupation };
