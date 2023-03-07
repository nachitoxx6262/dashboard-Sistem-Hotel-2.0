const { Habitacion } = require("../db.js");
const { Op, DataTypes } = require("sequelize");
const getHabitacion =async()=>{
    let habitaciones = await Habitacion.findAll();
    return habitaciones;
}
const postHabitacion =async(number,capacity,type)=>{
    let habitacion = await Habitacion.create({
        number_room : number,
        capacity: capacity,
        status: false,
        type: type
    })
    return habitacion
}
const putHabitacion =()=>{
    
}
const deleteHabitacion =async(id)=>{
    const habitacion = await Habitacion.findByPk(id)
    const result = await Habitacion.destroy({
        where: {
          id: id // el id del registro que se desea eliminar
        }})
    console.log(result)
   if(result==1) {
    return{message: `La habitacion ${habitacion.number_room} se ha eliminado correctamente`}
   }else{
    return{message: `Ocurrió un error al eliminar una habitación`}
   }
}   

module.exports = {getHabitacion,postHabitacion,putHabitacion,deleteHabitacion}