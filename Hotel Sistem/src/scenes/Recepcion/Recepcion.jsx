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
      <Link to="/registerroom" style={{textDecoration:"none"}}>
            <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>
              Registrar Habitación
            </Button>
          </Link>
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
