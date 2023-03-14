const { Booking,Room } = require("../db.js");


const createBooking = async ({ name,price,person_number,from,to,description,roomId,status}) => {
  const fromFormated = sequelize.fn('DATE_FORMAT', from, '%d/%m/%Y')
  const toFromated = sequelize.fn('DATE_FORMAT', to, '%d/%m/%Y')
  console.log(toFromated)
  //  let newBooking = await Booking.create({
  //    name,
  //    price,
  //    person_number,
  //    fromFormated,
  //    toFromated,
  //    description,
  //  });
  // let room = await Room.findByPk(roomId);
  // room.update({status:status})
  // if(room){
  //     await newBooking.setRoom(room); // Actualizar la relación usando setRoom()
  // }
};


module.exports = {createBooking};
