import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { filtroDni, data_Dni, data_DniI } from "../functions";
import { registerFamily } from "../axiosFunctions";
const RegisterCustomer = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [form, setForm] = useState({
    datos: "",
    tel: "",
    address: "",
    email: "",
    description: "",
  });
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let datospersonales = filtroDni(form.datos);
    if (datospersonales.length < 10) {
      var data = data_Dni(datospersonales, form, check, id);
      console.log(data);
    }
    if (datospersonales.length > 11) {
      var data = data_DniI(datospersonales, form, check, id);
      console.log(data);
    }
    const response = await registerFamily(data)
    console.log(response)
  };
  let caracteristicas = [
    { name: "Telefono: ", valor: "tel", type: "number" },
    { name: "Dirección: ", valor: "address", type: "text" },
    { name: "Correo Electronico: ", valor: "email", type: "email" },
  ];
  return (
    <Box>
      <FormControl onSubmit={handleSubmit}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Registrar pasajeros
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box display="flex" flexDirection="column" padding="1rem">
            <DialogTitle>Registro de Pasajeros</DialogTitle>
            <DialogContentText>
              Para ingresar pasajeros por favor complete con los datos
            </DialogContentText>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap="1rem">
                {caracteristicas?.map((element) => {
                  var valor = element.valor;
                  return (
                    <TextField
                      sx={{ color: "black" }}
                      size="small"
                      label={element.name}
                      value={form[valor]}
                      name={valor}
                      type={element.type}
                      placeholder={element.valor}
                      onChange={handleChange}
                    ></TextField>
                  );
                })}
                <TextField
                  multiline
                  sx={{ color: "black" }}
                  label="Descripcion"
                  value={form.description}
                  name="description"
                  placeholder="Descripcion"
                  onChange={handleChange}
                ></TextField>
                <TextField
                  required
                  sx={{ color: "black" }}
                  size="small"
                  label={"Datos Personales"}
                  value={form.datos}
                  name="datos"
                  type="text"
                  placeholder="Datos Personales"
                  onChange={handleChange}
                ></TextField>
                <FormControlLabel
                  control={
                    <Checkbox onClick={(e) => setCheck(e.target.checked)} />
                  }
                  label="Lista Negra"
                />
                <Button onClick={handleSubmit}>Reservar</Button>
              </Box>
            </DialogContent>
          </Box>
        </Dialog>
      </FormControl>
    </Box>
  );
};

export default RegisterCustomer;
