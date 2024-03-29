import { useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { ViewRoom } from "../Dialogs/ViewRoom";
import DeleteRoomCard from "../DeleteRoomCard";
import ReportIcon from "@mui/icons-material/Report";
import { FullDetailRoom } from "../Dialogs/FullDetailRoom";
import { updateStatusRoom } from "../../axiosFunctions";
const FreeRoom = ({ room }) => {
  const [showOccupied, setShowOccupied] = useState(true);
  const [isOccupied, setIsOccupied] = useState(room.Occupations.length > 0);

  let { id, number_room, capacity, type, status } = room;
  let { from, to, price, occupants, RoomId, Clients} = room.Occupations.length > 0 ? room.Occupations[0] : {};
  
  const handleDesocuparClick = () => {
      updateStatusRoom(id, "maintenance"); // Assuming this updates the room status in the backend
      setIsOccupied(false); // Update the room status in the local state
      setShowOccupied(false); // Change component display to show the new component
    };
  // COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <Box
      backgroundColor={colors.redAccent[600]}
      width="19rem"
      height="100%"
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
        <Box>
          <Typography variant="h4">
            Capacidad: {occupants}/{capacity}
          </Typography>
          <Typography variant="h4">Precio: ${price}</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="8rem"
          height="100%"
          gap="5px"
        >
          <FullDetailRoom room={room} />
          <Button variant="outlined" onClick={handleDesocuparClick}>
            Desocupar
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          <ReportIcon sx={{ fontSize: "4rem" }} />
        </Typography>
      </Box>
      <Box width="1.5rem" height="1rem">
        <DeleteRoomCard id={id} />
      </Box>
    </Box>
  );
};

export default FreeRoom;
