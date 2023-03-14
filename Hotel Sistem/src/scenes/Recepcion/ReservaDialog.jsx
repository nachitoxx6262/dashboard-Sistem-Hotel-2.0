import {Button,Dialog,DialogTitle,DialogContent,TextField,DialogContentText,FormControl,} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { dateFormater } from "../functions";
import { bookingRoom } from "../axiosFunctions";
const ReservaDialog = ({id,capacity}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [persons, setPersons] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const handleSubmit = async(e) => {
    e.preventDefault()
    let From = dateFormater(from)
    let To =dateFormater(to)
    let booking = await bookingRoom({
      name:name,
      price:price,
      description:description,
      from:From,
      to:To,
      roomId: id,
      person_number:persons,
      status:"reservada"
    })
  };
  console.log(id, capacity )
  return (
    <Box>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Reserva
      </Button>
      <FormControl onSubmit={handleSubmit}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box display="flex" flexDirection="column" padding="1rem">
            <DialogTitle>Ticket de Reserva</DialogTitle>
            <DialogContentText>
              Para reservar la habitación y completa con los siguientes datos
            </DialogContentText>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap="1rem">
                {/* // NOMBRE Y APELLIDO */}
                <TextField autofocus label="Nombre" onChange={(e)=>setName(e.target.value)}></TextField>
                {/* // PRECIO */}
                <TextField autofocus label="Precio" type="number" onChange={(e)=>setPrice(e.target.value)}></TextField>
                <TextField autofocus label="Cantidad de Personas" error={persons > capacity}
      helperText={persons > capacity ? 'Limite de capacidad exedido' : ''} type="number" onChange={(e)=>setPersons(e.target.value)}></TextField>
                {/* // DESCRIPCION */}
                <TextField
                onChange={(e)=>setDescription(e.target.value)}
                  autofocus
                  label="Descripcion"
                  type="text"
                ></TextField>
                {/* // FROM */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Desde"  format="DD/MM/YYYY" onChange={setFrom}/>
                </LocalizationProvider>
                {/* // TO */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Hasta"  format="DD/MM/YYYY" onChange={setTo}/>
                </LocalizationProvider>
                <Button onClick={handleSubmit}>Reservar</Button>
              </Box>
            </DialogContent>
          </Box>
        </Dialog>
      </FormControl>
    </Box>
  );
};

export default ReservaDialog;
