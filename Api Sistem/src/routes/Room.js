const { Router } = require("express");
const {getRoom,postRoom,putRoom,deleteRoom} = require("../controllers/roomController.js");
const room = Router();

// GET TRAER HABITACIONES
room.get("/",async (req, res) => {
    let habitaciones = await getRoom();
    res.json(habitaciones);
})

// POST CREAR HABITACIONES
room.post("/",async (req, res) => {
    let {number,capacity,type,status} = req.body
    let habitaciones = await postRoom(number,capacity,type,status);
    res.json(habitaciones);
})
// PUT MODIFICAR HABITACION
room.put("/",async (req, res) => {
    let {id,status} = req.body
    let habitaciones = await putRoom(id,status);
    res.json(habitaciones);
})
// DELETE ELIMINAR HABITACION
room.delete("/",async (req, res) => {
    let {id} = req.body
    console.log(id)
     let habitaciones = await deleteRoom(id);
     res.json(habitaciones);
 
})
module.exports = room;
