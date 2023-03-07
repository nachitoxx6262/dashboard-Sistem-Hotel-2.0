import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import CheckIcon from "@mui/icons-material/Check";
import ReportIcon from "@mui/icons-material/Report";
import LongMenu from "./LongMenu";
import { updateStatusRoom } from "../axiosFunctions";
const RoomCard = ({ room }) => {
  // COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  // VARIABLES
  const [status,setStatus] = useState("libre")
  let {id, number_room, capacity, type } = room;

  const reservaClick=()=>{
    let response = updateStatusRoom("ocupada")
  }
  const mantenimientoClick=()=>{
    setStatus("mantenimiento")
  }
  const altaClick=()=>{
    setStatus("libre")
  }
  return (
    <Box
      backgroundColor={
        status === "libre"
          ? colors.greenAccent[700]
          : status === "ocupada"
          ? colors.redAccent[600]
          : colors.blueAccent[800]
      }
      width="15rem"
      height="15rem"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      padding="1rem"
      borderRadius="10px"
    >
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography variant="h1">{number_room}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {type}
        </Typography>
        <Typography variant="h4">Capacidad: 0/{capacity}</Typography>
        {status=="libre"? ( <Button onClick={reservaClick} variant="outlined">Reservar</Button>):status=="ocupada"?( <Button variant="outlined" onClick={mantenimientoClick}>Mantenimiento</Button>):( <Button variant="outlined" onClick={altaClick}>Dar de alta</Button>)}
         
      </Box>
      <Box>
        <Typography variant="h4">
          {status == "libre" ? (
            <CheckIcon sx={{fontSize:"4rem"}}/>
          ) : status == "ocupada" ? (
            <ReportIcon sx={{fontSize:"4rem"}} />
          ) : (
            <AutoDeleteIcon sx={{fontSize:"4rem"}} />
          )}
        </Typography>
      </Box>
      <Box width="1.5rem" height="1rem">
      <LongMenu id={id}/>
      </Box>
    </Box>
  );
};

export default RoomCard;
