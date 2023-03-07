import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Style from "./Register.module.css";
import { getCompany } from "../../Redux/action";
import Alert from "@mui/material/Alert";
import Header from "../../components/Header";

///MATERIAL UI
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
} from "@mui/material";

/// empresas hardcoded
import { inputValueCompany } from "../functions";
import { registerCompany } from "../axiosFunctions";
import { tokens } from "../../theme.js";
import { useTheme } from "@mui/material";
const RegisterFactory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [submit, setSubmit] = useState(false);
  const [submitfalse, setSubmitfalse] = useState(false);
  const [alertText, setAlertText] = useState("");
 
    // ESTADOS
    const [check, setCheck] = useState(false);
    const [form, setForm] = useState({
      name: "",
      cuit: "",
      tel: "",
      adress: "",
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
    // REDUX
    let dispatch = useDispatch();
    // USEEFFECT
    useEffect(() => {
      dispatch(getCompany());
    }, [dispatch]);
    // FUNCIONES
  
    const handleSubmit =async(event) => {
      event.preventDefault();
      if(form.name == ""){
        setAlertText("El campo Nombre y Fecha deben ser OBLIGATORIOS");
        setSubmitfalse(true);
        setTimeout(() => setSubmitfalse(false), 5000);
      }else{
        let data = {
          name: form.name.toUpperCase(),
          cuit: form.cuit,
          tel: form.tel,
          adress: form.adress,
          email: form.email,
          description: form.description,
          blacklist: check? "✅" : "❌",
        };
        const response  = await registerCompany(data)
        if (response.data.alert) {
          setAlertText(response.data.message);
          setSubmitfalse(true);
          setTimeout(() => setSubmitfalse(false), 5000);
        ;
      } else {
          setAlertText(response.data.message);
          setSubmit(true);
          setTimeout(() => setSubmit(false), 5000);
          setForm({ name: "", cuit: "",tel: "",adress: "",email: "",description: "" });
        }
      }
    };
  return (
    <Box m="20px">

     <Header title="Registro de Empresas" subtitle="Registra una nueva empresa" />
          <Link to="/company" style={{textDecoration:"none"}}>
            <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>
              Volver
            </Button>
          </Link>
      <Box display="flex" flexDirection="row" alignItems="flex-start" justifyContent="center">   
        {submit ? <Alert variant="filled" severity="success"><strong> {alertText}</strong></Alert> : <></>}
        {submitfalse ? <Alert variant="filled" severity="error"><strong> {alertText}</strong></Alert> : <></>}
          <Box
            color="black"
            className={Style.codetext}
            component="form"
            noValidate
            autoComplete="off"
            >
            <FormControl onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1rem", width:"30rem",alignItems: "center"}}>
                {inputValueCompany?.map((element) => {
                  var valor = element.valor;
                  return (
                    <TextField
                    size="normal" 
                      sx={{ color: "black" }}
                      fullWidth
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
                      size="normal" 
                      sx={{ color: "black" }}
                      fullWidth
                      
                      label="Descripcion"
                      value={form.description}
                      name="description"
                      placeholder="Descripcion"
                      onChange={handleChange}
                      ></TextField>
                <FormControlLabel
                sx={{color:"white"}}
                
                  control={
                    <Checkbox color="default" onClick={(e) => setCheck(e.target.checked)} />
                  }
                  label="Lista Negra"
                  />
                <Box marginTop="20px">
                  <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }} variant="contained" type="submit" onClick={handleSubmit}>
                    Enviar
                  </Button>
                </Box>
            </FormControl>
          </Box>

      </Box>
                  </Box>
)
}

export default RegisterFactory