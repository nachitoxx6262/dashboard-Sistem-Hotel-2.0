const createClient = async (passenger,id,From,To,price) => {
    let cantPassenger = passenger.length
    // CREO LA RESERVA
    const reserva = await Booking.create({name:"No Reservada",price,person_number:cantPassenger,from:From,to:To})
    // BUSCO LA HABITACION Y LE ACTUALIZO EL STATUS
    const habitacion = await Room.findByPk(id);
    await habitacion.update({ status: 'ocupada' });
    await habitacion.setBookings(reserva);
    // MAPEO LOS PASAJEROS  FILTRO LOS DNI Y CREO EL CLIENTE
    passenger?.map(async(element) => {
      let { datos, tel, address, email, description } = element;
      let dni_filtrado = filtroDni(datos);
      if (dni_filtrado.length < 10) {
        let { name, gender, dni, birthdate } = data_Dni(dni_filtrado);
        const cliente = await Client.create({name,gender,dni,birthdate,tel,address,email,description,});
        let idNewClient = cliente.dataValues.id;
      } else {
        let { name, gender, dni, birthdate }  = data_DniI(dni_filtrado);
        const cliente = await Client.create({name,gender,dni,birthdate,tel,address,email,description,});
        let idNewClient = cliente.dataValues.id;
      }
    });
    // try {
    //   const clienteExistente = await Client.findOne({ where: { dni } });
    //   if (clienteExistente) {
    //     const clienteEnBlacklist = clienteExistente.dataValues.blacklist
    //     if (clienteEnBlacklist == "✅") {
    //       return({message : `El cliente con DNI ${dni} se encuentra en la lista negra.`, alert: true});
    //     }else{
    //       const nuevaVisita = clienteExistente.visit+" " + visit;
    //       await Client.update({ visit: nuevaVisita }, { where: { dni } });
    //       return ({message: `Client actualizado: ${clienteExistente.name}, visita: ${visit}`, alert: false});
  
    //     }
    //   } else {
  
    // let idRoom = id;
    // return { message: `Client creado: ${cliente.name}`, alert: false };
  };
  // } catch (error) {
  //   console.log(error)
  // }