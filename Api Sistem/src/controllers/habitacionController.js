const { Room } = require("../db.js");
const { Op, DataTypes } = require("sequelize");
const getRoom =async()=>{
    let habitaciones = await Room.findAll();
    return habitaciones;
}
const postRoom =async(number,capacity,type,status)=>{
    let habitacion = await Room.create({
        number_room : number,
        capacity: capacity,
        status: status,
        type: type
    })
    return habitacion
}
const putRoom =async(id,status)=>{
    const habitacion = await Room.findByPk(id)
    const result = await habitacion.update({status})
    const {dataValues} = await Room.findByPk(id)
    return {message:`El estado de la Habitación ${dataValues.number_room} fue actualizado con exito`}
}
const deleteRoom =async(id)=>{
    try{
        const habitacion = await Room.findByPk(id)
        const result = await habitacion.destroy()
       if(result==1) {
        return{message: `La habitacion ${habitacion.number_room} se ha eliminado correctamente`}
       }else{
        return{message: `Ocurrió un error al eliminar una habitación`}
       }

    }catch(err){
        console.log(err)
    }
}   

module.exports = {getRoom,postRoom,putRoom,deleteRoom}