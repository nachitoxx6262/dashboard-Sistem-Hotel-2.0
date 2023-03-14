import * as React from 'react';
//hooks
import { useState, useEffect } from 'react';
//mui
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Typography } from '@mui/material';
import { getRooms } from '../../Redux/action';
import { deleteRoom } from '../axiosFunctions';
import { useDispatch } from 'react-redux';
const options = [
  "Eliminar"
];

const ITEM_HEIGHT = 48;

export default function DeleteRoomCard({id}) {
const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(false)
  const open = Boolean(anchorEl);
  const [a,setA] = useState("")
  const handleClick = (event) => {
    const target = event.currentTarget;
    setAnchorEl(target);
  };
  const handleClose = (event) => {
    const name = event.target.innerHTML;
    setValue(name)
    setAnchorEl(null);
  };
  const optionClick = async (e)=>{
    let response = await deleteRoom(id)
    setA(response)
    
  }
useEffect(() => {
    dispatch(getRooms())
}, [a])
  return (
    <Box width="2rem" height="2rem">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}  >
            <Typography variant="body1" color="initial" onClick={optionClick}> {option}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}