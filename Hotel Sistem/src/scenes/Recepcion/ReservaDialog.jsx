import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const ReservaDialog = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {};

  return (
    <Box width="2rem" height="2rem">
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
                <TextField autofocus label="Nombre y apellido"></TextField>
                <TextField autofocus label="Precio" type="number"></TextField>
                <TextField
                  autofocus
                  label="Descripcion"
                  type="text"
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Desde"  format="DD/MM/YYYY"/>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Hasta"  format="DD/MM/YYYY"/>
                </LocalizationProvider>
                <Button type="submit">Reservar</Button>
              </Box>
            </DialogContent>
          </Box>
        </Dialog>
      </FormControl>
    </Box>
  );
};

export default ReservaDialog;
