import {
  Box,
  Typography,
  useTheme,
  Button,
  FormControl,
  TextField,
  Autocomplete,
  Paper,Alert ,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useState } from "react";
import { registerRoom } from "../../axiosFunctions";

const RegisterRoom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // DATOS DE LAS HABITACIONES
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [submit, setSubmit] = useState(false);
  const [submitfalse, setSubmitfalse] = useState(false);
  const [alertText, setAlertText] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();
    let status = "mantenimiento";
    const response = await registerRoom(number, capacity, type, status);
    if (response.data.type){
      setSubmit(true);
      setAlertText(response.data.message);
      setTimeout(() => {
        setSubmit(false);
      }, 3000);
    }else{
      setSubmitfalse(true);
      setAlertText(response.data.message);
      setTimeout(() => {
        setSubmitfalse(false);
      }, 3000);
    }
    setNumber('');
    setCapacity('');
    setType('');
  };
  return (
    <Box m="20px">
      <Header
        title="Registro de Habitaciones"
        subtitle="Registra las habitaciones"
      />
      <Box
        color="black"
        component="form"
        noValidate
        autoComplete="off"
        width="auto"
        height="5rem"
      >
        {submit ? <Alert variant="filled" severity="success"><strong> {alertText}</strong></Alert> : <></>}
        {submitfalse ? <Alert variant="filled" severity="error"><strong> {alertText}</strong></Alert> : <></>}
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#3e4396",
          }}
        >
          <FormControl
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
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
              sx={{ width: "30%" }}
            ></TextField>

            <TextField
              required
              size="normal"
              label={"Capacidad"}
              value={capacity}
              name="number"
              type="number"
              placeholder="Capacidad de Habitación"
              sx={{ width: "30%" }}
              onChange={(e) => setCapacity(e.target.value)}
            ></TextField>
            <Autocomplete
              disablePortal
              required
              value={type}
              onChange={(event, newValue) => {
                setType(newValue);
              }}
              options={["Superior", "Standar"]}
              sx={{ width: 230 }}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="normal" label="Tipo" />
              )}
            />

            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                width: "30%",
              }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </FormControl>
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterRoom;
