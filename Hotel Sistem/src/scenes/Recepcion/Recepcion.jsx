import { Box, Typography, useTheme, Button } from "@mui/material";
import React,{ useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../Redux/action";
import FreeRoom from "./RoomStatus/FreeRoom";
import FullRoom from "./RoomStatus/FullRoom";
import MaintenanceRoom from "./RoomStatus/MaintenanceRoom";
const Recepcion = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let rooms = useSelector((state) => state.room);
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch,rooms]);

  return (
    <Box m="20px">
      <Header title="RECEPCIÓN" subtitle="Lista de habitaciones" />
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap="2rem"
        marginTop="10px"
      >
        {rooms.map((room) => (
  <React.Fragment key={room.id}>
    {room.status === "full" ? (
      <FullRoom room={room} />
    ) : room.status === "free" ? (
      <FreeRoom room={room} />
    ) : room.status === "maintenance" ? (
      <MaintenanceRoom room={room} />
    ) : (
      <></>
    )}
  </React.Fragment>
))}

      </Box>
    </Box>
  );
};

export default Recepcion;
