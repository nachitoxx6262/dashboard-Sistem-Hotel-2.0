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
    let {number,capacity,type,status} = req.body
    let habitaciones = await postHabitacion(number,capacity,type,status);
    res.json(habitaciones);
})
// PUT MODIFICAR HABITACION
room.put("/",async (req, res) => {
    let {id,status} = req.body
    let habitaciones = await putHabitacion(id,status);
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
