import { Box, Typography, useTheme,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../Redux/action";
import RoomCard from "./RoomCard";

const Recepcion = () => {
  const dispatch = useDispatch()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let rooms = useSelector((state) => state.room);
console.log(rooms)
  useEffect(() => {
    dispatch(getRooms())
  }, [dispatch])
  
  return (
    <Box m="20px">
      <Header title="RECEPCIÓN" subtitle="Lista de habitaciones" />
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap="2rem" marginTop="10px">
            {
              rooms.map((room) => {
                return(
                  <RoomCard room={room}/>
                )
              })
            }
          </Box>
    </Box>
  );
};

export default Recepcion;
