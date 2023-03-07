const cron = require('node-cron');
const Reserva = require('./models/reserva');
const Habitacion = require('./models/habitacion');
const Cliente = require('./models/cliente');
const Historial = require('./models/historial');

// Tarea programada que se ejecuta diariamente a las 12hs am
cron.schedule('0 12 * * *', async () => {
  try {
    const now = new Date();
    const reservas = await Reserva.findAll({
      where: {
        fecha_salida: { [Sequelize.Op.eq]: now }
      },
      include: [Habitacion, Cliente]
    });

    // Actualiza el estado de la habitación a false, crea un historial y elimina la reserva
    await Promise.all(reservas.map(async (reserva) => {
      const { fecha, Habitacion: { id: habitacionId }, Cliente: clientes } = reserva;

      // Crea un registro en el historial
      const historial = await Historial.create({ fecha_ingreso: fecha, fecha_salida: fecha, habitacionId });

      // Agrega los clientes al historial y los relaciona con la habitación
      await Promise.all(clientes.map(async (cliente) => {
        const createdCliente = await Cliente.create(cliente);
        await createdCliente.setHistorial(historial);
        await createdCliente.setHabitacion(habitacionId);
      }));

      // Actualiza el estado de la habitación y elimina la reserva
      await Habitacion.update({ ocupada: false }, { where: { id: habitacionId } });
      await Reserva.destroy({ where: { id: reserva.id } });
    }));
  } catch (error) {
    console.log(error);
  }
});
