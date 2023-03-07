// Ahora, para crear un cliente y su reserva, podemos usar el siguiente código:

Habitacion.create({
    numero_habitacion: 1,
    capacidad: 2
  }).then(habitacion => {
    Reserva.create({
      fecha_ingreso: '2023-03-01',
      fecha_salida: '2023-03-05',
      habitacionId: habitacion.id
    }).then(reserva => {
      Cliente.create({
        nombre: 'Juan',
        reservaId: reserva.id
      });
    });
  });
 
// para encontrar todos los clientes en una habitación con un número específico y obtener las fechas de reserva, puedes usar el siguiente código:
Habitacion.findOne({
  where: {
    numero_habitacion: 1
  },
  include: [
    {
      model: Reserva,
      include: [Cliente]
    }
  ]
}).then(habitacion => {
  console.log(habitacion.reservas[0].clientes[0].nombre);
  console.log(habitacion.reservas[0].fecha_ingreso);
  console.log(habitacion.reservas[0].fecha_salida);
});
