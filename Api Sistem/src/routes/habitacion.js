const { Router } = require("express");
const {getHabitacion,postHabitacion,putHabitacion,deleteHabitacion} = require("../controllers/habitacionController.js");
const room = Router();

// GET TRAER HABITACIONES
room.get("/",async (req, res) => {
    let habitaciones = await getHabitacion();
    res.json(habitaciones);
})

// POST CREAR HABITACIONES
room.post("/",async (req, res) => {
    let {number,capacity,type} = req.body
    let habitaciones = await postHabitacion(number,capacity,type);
    res.json(habitaciones);
})
// PUT MODIFICAR HABITACION
room.post("/",async (req, res) => {
    let habitaciones = await putHabitacion();
    res.json(habitaciones);
})
// DELETE ELIMINAR HABITACION
room.delete("/",async (req, res) => {
    let {id} = req.body
    console.log(id)
     let habitaciones = await deleteHabitacion(id);
     res.json(habitaciones);
 
})
module.exports = room;
