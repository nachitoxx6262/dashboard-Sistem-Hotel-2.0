import {
  Box,
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { registerFamily } from "../axiosFunctions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { dateFormater } from "../functions";
export const ViewRoom = ({ room }) => {
  let { id, number_room, capacity, type, status } = room;
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [currentPassenger, setCurrentPassenger] = useState(0);
  const [price, setPrice] = useState(0);
  const [passengers, setPassengers] = useState([
    {
      datos: "",
      tel: "",
      address: "",
      email: "",
      description: "",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let From = dateFormater(from)
    let To = dateFormater(to)
    console.log(From,To)
    let response = await registerFamily(passengers, id,From,To,price);
    console.log(response);
  };

  const handleAddPassenger = () => {
    if (currentPassenger < capacity) {
      setPassengers([
        ...passengers,
        {
          datos: "",
          tel: "",
          address: "",
          email: "",
          description: "",
        },
      ]);
      setCurrentPassenger(currentPassenger + 1);
    }
  };

  const handleRemovePassenger = () => {
    if (currentPassenger > 0) {
      setPassengers(passengers.slice(0, currentPassenger));
      setCurrentPassenger(currentPassenger - 1);
    }
  };

  return (
    <Box>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Ver Habitacion
      </Button>
      <FormControl onSubmit={handleSubmit}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box display="flex" flexDirection="column" padding="1rem">
            <Typography variant="h3">Habitacion {number_room}</Typography>
            <DialogContentText>
              Para reservar la habitación completa con los siguientes datos
            </DialogContentText>
            <Box display="flex" gap="10px" justifyContent="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde"
                format="DD/MM/YYYY"
                onChange={setFrom}
                />
            </LocalizationProvider>
            {/* // TO */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Hasta" format="DD/MM/YYYY" onChange={setTo} />
            </LocalizationProvider>
            <TextField label="Precio" type="number" value={price} onChange={(e)=>setPrice(e.target.value)}></TextField>
            </Box>
            {passengers.map((passenger, index) => (
              <Box key={index} marginBottom="1rem">
                <Typography variant="subtitle1">
                  Pasajero {index + 1}
                </Typography>
                <TextField
                  label="Datos"
                  variant="outlined"
                  fullWidth
                  value={passenger.datos}
                  onChange={(e) => {
                    setPassengers([
                      ...passengers.slice(0, index),
                      {
                        ...passenger,
                        datos: e.target.value,
                      },
                      ...passengers.slice(index + 1),
                    ]);
                  }}
                  margin="normal"
                />
                <TextField
                  label="Telefono"
                  variant="outlined"
                  fullWidth
                  value={passenger.tel}
                  onChange={(e) => {
                    setPassengers([
                      ...passengers.slice(0, index),
                      {
                        ...passenger,
                        tel: e.target.value,
                      },
                      ...passengers.slice(index + 1),
                    ]);
                  }}
                  margin="normal"
                />
                <TextField
                  label="Direccion"
                  variant="outlined"
                  fullWidth
                  value={passenger.address}
                  onChange={(e) => {
                    setPassengers([
                      ...passengers.slice(0, index),
                      {
                        ...passenger,
                        address: e.target.value,
                      },
                      ...passengers.slice(index + 1),
                    ]);
                  }}
                  margin="normal"
                />
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  value={passenger.email}
                  onChange={(e) => {
                    setPassengers([
                      ...passengers.slice(0, index),
                      {
                        ...passenger,
                        email: e.target.value,
                      },
                      ...passengers.slice(index + 1),
                    ]);
                  }}
                  margin="normal"
                />
                <TextField
                  label="Descripcion"
                  variant="outlined"
                  fullWidth
                  value={passenger.description}
                  onChange={(e) => {
                    setPassengers([
                      ...passengers.slice(0, index),
                      {
                        ...passenger,
                        description: e.target.value,
                      },
                      ...passengers.slice(index + 1),
                    ]);
                  }}
                  margin="normal"
                />
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPassenger}
                disabled={currentPassenger === capacity}
              >
                Agregar pasajero
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemovePassenger}
                disabled={currentPassenger === 0}
              >
                Eliminar pasajero
              </Button>
              <Button onClick={handleSubmit}>Enviar</Button>
            </Box>
          </Box>
        </Dialog>
      </FormControl>
    </Box>
  );
};
