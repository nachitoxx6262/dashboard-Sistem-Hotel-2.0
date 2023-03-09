import {
  Box,
  Typography,
  useTheme,
  Button,
  FormControl,
  TextField,Autocomplete
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import Style from "./Register.module.css";
import {registerRoom} from "../axiosFunctions"

const RegisterRoom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // DATOS DE LAS HABITACIONES
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
e.preventDefault()
  let status = "libre"
    const response = registerRoom(number,capacity,type,status)
  };
  return (
    <Box m="20px">
      <Header
        title="Registro de Habitaciones"
        subtitle="Registra las habitaciones"
      />
      <Link to="/reception" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Volver
        </Button>
      </Link>
      <Box
        color="black"
        className={Style.codetext}
        component="form"
        noValidate
        autoComplete="off"
        width="20rem"
      >
        <FormControl
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem",width:"20rem",alignItems: "center" }}
        >
          <TextField
            required
            size="normal"
            label={"Numero de Habitación"}
            value={number}
            name="number"
            type="number"
            placeholder="Numero de Habitación"
            onChange={(e) => setNumber(e.target.value)}
            sx={{width:"80%"}}
          ></TextField>

          <TextField
            required
            size="normal"
            label={"Capacidad"}
            value={capacity}
            name="number"
            type="number"
            placeholder="Capacidad de Habitación"
            sx={{width:"80%"}}
            onChange={(e) => setCapacity(e.target.value)}
          ></TextField>
<Autocomplete
              disablePortal
              required
              value={type}
              onChange={(event, newValue) => {setType(newValue);}}
              options={["Superior", "Standar"]}
              sx={{ width: 230 }}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="normal" label="Genero" />
                )}
                />



          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              width:"30%"
            }}
          
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default RegisterRoom;
