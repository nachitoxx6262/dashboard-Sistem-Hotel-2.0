const { Booking, Room } = require("../db.js");

const createBooking = async ({
  name,
  price,
  person_number,
  from,
  to,
  description,
  roomId,
  status,
}) => {
  try {
    const fromFormated = sequelize.fn("DATE_FORMAT", from, "%d/%m/%Y");
    const toFromated = sequelize.fn("DATE_FORMAT", to, "%d/%m/%Y");
    let newBooking = await Booking.create({
      name,
      price,
      person_number,
      fromFormated,
      toFromated,
      description,
      roomId,
      status,
    });
    let room = await Room.findByPk(roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    room.update({ status: status });
    await newBooking.setRoom(room);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createBooking };
