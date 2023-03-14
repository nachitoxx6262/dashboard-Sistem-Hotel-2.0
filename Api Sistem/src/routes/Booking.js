const { Router } = require("express");
const { createBooking } = require("../controllers/bookingController");
const booking = Router();


booking.post("/",async (req, res) => {
   let {name,price,person_number,from,to,description,roomId,status}  = req.body
   let newBooking = await createBooking({name,price,person_number,from,to,description,roomId,status})
})

module.exports = booking;