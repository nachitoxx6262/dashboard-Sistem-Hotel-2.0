import {
  Box,
  Button,
  Dialog,
  DialogContentText,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getclients } from "../../../Redux/action";
import { occupationRoom, registerFamily } from "../../axiosFunctions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { dateFormater } from "../../functions";
export const ViewRoom = ({ room }) => {
  let { id, number_room, capacity, type, status } = room;
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);

  let dispatch = useDispatch();
  let pasajeros = useSelector((state) => state.clients);
  useEffect(() => {
    dispatch(getclients());
  }, [dispatch]);

  //################ SELECCIONAR PASAJEROS #########################################
  const [selectedPasajeros, setSelectedPasajeros] = useState([]);

  //################### SUBMIT ######################################
  const handleSubmit = (event) => {
    event.preventDefault();
    let passangerId = selectedPasajeros.map((passanger) => {
      return passanger.id;
    });
    occupationRoom({
      clientIds: passangerId,
      roomId: room.id,
      price,
      from,
      to,
    });

    setOpen(false);
  };
  // ######################################################################################
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
                <DatePicker
                  label="Hasta"
                  format="DD/MM/YYYY"
                  onChange={setTo}
                />
              </LocalizationProvider>
              <TextField
                label="Precio"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></TextField>
            </Box>
            <Box padding={"2rem"}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={pasajeros}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setSelectedPasajeros(value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Selecciona un maximo ${capacity} pasajeros`}
                    placeholder="Pasajeros"
                  />
                )}
              />
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Button onClick={handleSubmit}>Enviar</Button>
            </Box>
          </Box>
        </Dialog>
      </FormControl>
    </Box>
  );
};
