import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../Redux/action";
import { Link } from "react-router-dom";
import Style from "./Register.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  Autocomplete,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { registerFamily } from "../axiosFunctions";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
const NaDni = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [blacklist, setBlacklist] = useState("");
  const [submit, setSubmit] = useState(false);
  const [submitfalse, setSubmitfalse] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [gender, setGender] = useState("");
  const [empresa, setEmpresa] = useState("")
  const [form, setForm] = useState({
    name: "",
    dni: "",
    gender: "",
    birthdate: "",
    tel: "",
    address: "",
    email: "",
    description: "",
  });

  let dispatch = useDispatch();
  let companyData = useSelector((state) => state.companysOption);
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.name == "" || gender == "" || form.dni == "") {
      setAlertText("NOMBRE DNI Y GENERO deben ser OBLIGATORIOS");
      setSubmitfalse(true);
      setTimeout(() => setSubmitfalse(false), 5000);
    } else {
      let datos = {
        name: form.name,
        gender: gender,
        dni: form.dni,
        birthdate: form.birthdate,
        tel: form.tel,
        address: form.address,
        blacklist: blacklist,
        email: form.email,
        description: form.description,
        empresa
      };
      console.log(datos);
      const response = await registerFamily(datos);
      if (response.data.alert) {
        setAlertText(response.data.message);
        setSubmitfalse(true);
        setTimeout(() => setSubmitfalse(false), 5000);
      } else {
        setAlertText(response.data.message);
        setSubmit(true);
        setTimeout(() => setSubmit(false), 5000);
        setForm({
          name: "",
          dni: "",
          gender: "",
          tel: "",
          adress: "",
          email: "",
          description: "",
        });
      }
    }
  };
  let caracteristicas = [
    { name: "Nombre Completo: ", valor: "name", type: "text" },
    { name: "DNI: ", valor: "dni", type: "number" },
    { name: "Telefono: ", valor: "tel", type: "number" },
    { name: "Dirección: ", valor: "adress", type: "text" },
    { name: "Correo Electronico: ", valor: "email", type: "email" },
  ];
  return (
    <>
      <Box m="20px">
        <Header
          title="Registro de Clientes"
          subtitle="Registra un nuevo cliente"
        />
        <Link to="/client" style={{ textDecoration: "none" }}>
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
        {submit ? (
          <Alert variant="filled" severity="success">
            <strong> {alertText}</strong>
          </Alert>
        ) : (
          <></>
        )}
        {submitfalse ? (
          <Alert variant="filled" severity="error">
            <strong>{alertText}</strong>
          </Alert>
        ) : (
          <></>
        )}
        <Box
          color="black"
          className={Style.codetext}
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "30rem",
            }}
          >
            <Autocomplete
              disablePortal
              required
              value={empresa}
              onChange={(event, newValue) => {
                setEmpresa(newValue);
              }}
              id="combo-box-demo"
              options={companyData}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  label="Empresas"
                />
              )}
            />
            {caracteristicas?.map((element) => {
              var valor = element.valor;
              return (
                <TextField
                  sx={{ color: "black" }}
                  label={element.name}
                  value={form[valor]}
                  name={valor}
                  type={element.type}
                  placeholder={element.valor}
                  onChange={handleChange}
                  size="normal"
                  fullWidth
                ></TextField>
              );
            })}
            <div style={{display:"flex",justifyContent: "space-between"}}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de Nacimiento"
                inputFormat="MM/DD/YYYY"
                value={form.birthdate}
                onChange={(newValue) => {
                  setForm(newValue);
                }}
                sx={{ width: 230 }}
                renderInput={(params) => (
                  <TextField required size="normal" {...params} />
                  )}
                  />
            </LocalizationProvider>
            <Autocomplete
              disablePortal
              required
              value={gender}
              onChange={(event, newValue) => {setGender(newValue);}}
              options={["M", "F"]}
              sx={{ width: 230 }}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="normal" label="Genero" />
                )}
                />
                </div>
            <TextField
              size="normal"
              fullWidth
              multiline
              label="Descripcion"
              value={form.description}
              name="description"
              placeholder="Descripcion"
              onChange={handleChange}
            ></TextField>

            <FormControlLabel
              sx={{ color: "white" }}
              control={
                <Checkbox
                  color="default"
                  onClick={(e) =>
                    e.target.checked ? setBlacklist("✅") : setBlacklist("❌")
                  }
                />
              }
              label="Lista Negra"
            />
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
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
    </>
  );
};

export default NaDni;
