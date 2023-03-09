import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState ,useEffect} from "react";
import { tokens } from "../../theme";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import CheckIcon from "@mui/icons-material/Check";
import ReportIcon from "@mui/icons-material/Report";
import LongMenu from "./LongMenu";
import { updateStatusRoom } from "../axiosFunctions";
import ReservaDialog from "./ReservaDialog"
import { getRooms } from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";

const RoomCard = ({ room }) => {
  const dispatch = useDispatch()
  // COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  // VARIABLES
  let {id, number_room, capacity, type,status } = room;
  const [a,setA] = useState("")
  const reservaClick= async()=>{
    let response =  await updateStatusRoom(id,"ocupada")
    setA(response)
  }
  const mantenimientoClick= async()=>{
    let response = await updateStatusRoom(id,"mantenimiento")
    setA(response)
   
  }
  const altaClick=async ()=>{
    let response = await updateStatusRoom(id,"libre")
    setA(response)

  }
  useEffect(() => {
    dispatch(getRooms())
  }, [a])
  
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
        <Box>
        {status=="libre"? ( <><ReservaDialog id={id} /> <Button onClick={reservaClick}>Omitir Reserva</Button></>):status=="ocupada"?( <Button variant="outlined" onClick={mantenimientoClick}>Mantenimiento</Button>):( <Button variant="outlined" onClick={altaClick}>Dar de alta</Button>)}
        </Box>
         
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
