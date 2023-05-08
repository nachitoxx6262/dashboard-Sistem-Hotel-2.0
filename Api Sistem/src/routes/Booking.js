const { Router } = require("express");
const { createBooking } = require("../controllers/bookingController");
const booking = Router();


booking.post("/",async (req, res) => {
   let {selectedPasajeros,from,to,price,room}  = req.body
   let newBooking = await createBooking(selectedPasajeros,from,to,price,room)
})

module.exports = booking;