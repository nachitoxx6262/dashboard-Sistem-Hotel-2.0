import React from 'react'
import { Box, Button, Typography, useTheme } from "@mui/material";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { tokens } from "../../../theme";
import DeleteRoomCard from "../DeleteRoomCard";
import { updateStatusRoom } from "../../axiosFunctions";

const MaintenanceRoom = ({ room }) => {
  let { id, number_room, capacity, type, status, person_number, price } = room;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        backgroundColor={colors.blueAccent[800]}
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
        <Box display={"flex"} flexDirection={"column"}>
        <Button variant="outlined" onClick={()=>updateStatusRoom(id,"free")}>Desocupar</Button>
        </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="8rem"
            height="5rem"
            gap="5px"
          >
          </Box>
        </Box>
        <Box>
          <Typography variant="h4">
              <AutoDeleteIcon sx={{ fontSize: "4rem" }} />
          </Typography>
        </Box>
        <Box width="1.5rem" height="1rem">
          <DeleteRoomCard id={id} />
        </Box>

      </Box>
    </>
  )
}

export default MaintenanceRoom