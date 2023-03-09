const { Router } = require("express");

const booking = require("./Booking.js")
const client = require("./Client.js");
const company = require("./Company.js")
const room = require("./Room.js")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/client", client);
router.use("/company", company);
router.use("/room", room);
router.use("/booking", booking);

module.exports = router;
