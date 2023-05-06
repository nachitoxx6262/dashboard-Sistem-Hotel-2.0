import {
  Box,
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  Typography
} from "@mui/material";
import { useState } from "react";

const RoomDetail = ({room}) => {
  let { id, number_room, capacity, type, status,person_number ,price} = room;

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Detalle de la habitacion
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
      <Typography variant="h3">Habitacion {number_room}</Typography>
            <DialogContentText>
              Detalle de la habitacion
            </DialogContentText>
      </Dialog>
    </Box>
  );
};

export default RoomDetail;
