import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import CheckIcon from "@mui/icons-material/Check";
import ReportIcon from "@mui/icons-material/Report";
import DeleteRoomCard from "./DeleteRoomCard";
import { updateStatusRoom } from "../axiosFunctions";
import ReservaDialog from "./ReservaDialog";
import { getRooms } from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import OcuparDialog from "./OcuparDialog";
import RegisterCustomer from "./RegisterCustomer";
import { ViewRoom } from "./ViewRoom";
const RoomCard = ({ room }) => {
  const dispatch = useDispatch();
  // COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // VARIABLES
  let { id, number_room, capacity, type, status,person_number ,price} = room;
  const [a, setA] = useState("");
  const reservaClick = async () => {
    let response = await updateStatusRoom(id, "ocupada");
    setA(response);
  };
  const mantenimientoClick = async () => {
    let response = await updateStatusRoom(id, "mantenimiento");
    setA(response);
  };
  const altaClick = async () => {
    let response = await updateStatusRoom(id, "libre");
    setA(response);
  };
  useEffect(() => {
    dispatch(getRooms());
  }, [a]);

  return (
    <Box
      backgroundColor={
        status === "libre"
          ? colors.greenAccent[700]
          : status === "ocupada"
          ? colors.redAccent[600]
          : status == "reservada"
          ? colors.redAccent[400]
          : colors.blueAccent[800]
      }
      width="19rem"
      height="19rem"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      padding="1rem"
      borderRadius="10px"
      justifyContent="center"
    >
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography variant="h1">{number_room}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {type}
        </Typography>
        {
        status== "libre"?<Typography variant="h4">Capacidad: 0/{capacity}</Typography>  :<Typography variant="h4">Capacidad: {person_number}/{capacity}</Typography>
        }
       
        {status == "ocupada"? <Typography variant="h5">Precio: ${price}</Typography>:""}
        <Box
          display="flex"
          flexDirection="column"
          width="8rem"
          height="5rem"
          gap="5px"
        >
          {status == "libre" ? (
            <>
              {/* <ReservaDialog id={id} capacity={capacity} />
              <OcuparDialog id={id} capacity={capacity} /> */}
              <ViewRoom room={room} />
            </>
          ) : status == "ocupada" ? (
            <>
            <Button variant="outlined" onClick={mantenimientoClick}>
              Mantenimiento
            </Button>
            </>
          ) : status == "reservada" ? (
            <Button variant="outlined" onClick={reservaClick}>
              Ocupar
            </Button>
          ) : (
            <Button variant="outlined" onClick={altaClick}>
              Dar de alta
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          {status == "libre" ? (
            <CheckIcon sx={{ fontSize: "4rem" }} />
          ) : status == "ocupada" ? (
            <ReportIcon sx={{ fontSize: "4rem" }} />
          ) : status == "reservada" ? (
            <HourglassTopIcon sx={{ fontSize: "4rem" }} />
          ) : (
            <AutoDeleteIcon sx={{ fontSize: "4rem" }} />
          )}
        </Typography>
      </Box>
      <Box width="1.5rem" height="1rem">
        <DeleteRoomCard id={id} />
      </Box>
    </Box>
  );
};

export default RoomCard;
