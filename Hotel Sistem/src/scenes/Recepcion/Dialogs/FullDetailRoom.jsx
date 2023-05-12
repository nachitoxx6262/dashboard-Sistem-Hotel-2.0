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
import { useState } from "react";
export const FullDetailRoom = ({ room }) => {
    let { id, number_room, capacity, type, status,formattedFrom,formattedTo } = room;
    let { from, to, price, occupants, RoomId, Clients } = room.Occupations[0];

    const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Detalle De la Habitacion
      </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box display="flex" flexDirection="column" padding="1rem">
            <Typography variant="h1">Habitacion {number_room}</Typography>
            <DialogContentText>
                <Box>
                    <Typography variant="h3">Tipo: {type}</Typography>
                    <Typography variant="h3">Precio: {price}</Typography>
                    <Typography variant="h3">Desde: {formattedFrom} Hasta: {formattedTo}</Typography>
                    <Typography variant="h3">Ocupantes: {occupants}</Typography>
                    {Clients?.map((client) => <Typography variant="h5">{`--${client.name}`}</Typography>)}
                </Box>
            </DialogContentText>
          </Box>
        </Dialog>
    </Box>
  );
};
