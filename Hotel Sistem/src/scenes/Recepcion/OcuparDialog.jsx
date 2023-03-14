import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  FormControl,
  Box,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { bookingRoom } from "../axiosFunctions";
const OcuparDialog = ({ id, capacity }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [price, setPrice] = useState("");
  const [persons, setPersons] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [name, setName] = useState(new Date());
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen2(true);
    let booking = await bookingRoom({
      name: name,
      price: price,
      description: description,
      from: from,
      to: to,
      roomId: id,
      person_number: persons,
      status: "ocupada",
    });
    console.log(booking)
  };
  return (
    <Box width="2rem" height="2rem">
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Omitir Reserva
      </Button>
      <FormControl onSubmit={handleSubmit}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box display="flex" flexDirection="column" padding="1rem">
            <DialogTitle>Ticket de CheckIn</DialogTitle>
            <DialogContentText>
              Para ingresar los pasajeros porfavor complete los siguientes
              campos
            </DialogContentText>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap="1rem">
                <TextField
                  autofocus
                  label="Nombre"
                  onChange={(e) => setName(e.target.value)}
                ></TextField>
                <TextField
                  autofocus
                  label="Precio"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                ></TextField>
                <TextField
                  autofocus
                  label="Cantidad de Personas"
                  error={persons > capacity}
                  helperText={
                    persons > capacity ? "Limite de capacidad exedido" : ""
                  }
                  type="number"
                  onChange={(e) => setPersons(e.target.value)}
                ></TextField>
                {/* // DESCRIPCION */}
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  autofocus
                  label="Descripcion"
                  type="text"
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Desde"
                    format="DD/MM/YYYY"
                    onChange={setFrom}
                  />
                </LocalizationProvider>
                {/* // TO */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Hasta"
                    format="DD/MM/YYYY"
                    onChange={setTo}
                  />
                </LocalizationProvider>
                <Link to={`/registerfamily/${id}/${persons}`}>
                  <Button onClick={handleSubmit}>Ingresar los pasajeros</Button>
                </Link>
              </Box>
            </DialogContent>
          </Box>
        </Dialog>
      </FormControl>
    </Box>
  );
};

export default OcuparDialog;
