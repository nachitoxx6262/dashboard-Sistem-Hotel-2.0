import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import CheckIcon from "@mui/icons-material/Check";
import { ViewRoom } from "../Dialogs/ViewRoom";
import DeleteRoomCard from "../DeleteRoomCard";

const FreeRoom = ({ room }) => {
  let { id, number_room, capacity, type, status, person_number, price } = room;
  // COLORS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      backgroundColor={colors.greenAccent[700]}
      width="19rem"
      height="13rem"
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
        <Typography variant="h4">Capacidad: {capacity}</Typography>
        <Box
          display="flex"
          flexDirection="column"
          width="8rem"
          height="5rem"
          gap="5px"
        >
          <ViewRoom room={room} />
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          <CheckIcon sx={{ fontSize: "4rem" }} />
        </Typography>
      </Box>
      <Box width="1.5rem" height="1rem">
        <DeleteRoomCard id={id} />
      </Box>
    </Box>
  );
};

export default FreeRoom;
