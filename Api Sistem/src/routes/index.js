const { Router } = require("express");

const client = require("./clients.js");
const empresa = require("./company.js")
const room = require("./habitacion.js")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/client", client);
router.use("/company", empresa);
router.use("/room", room);

module.exports = router;
