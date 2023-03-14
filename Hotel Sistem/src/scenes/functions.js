import moment from "moment"; // Importar Moment.js

export const inputsCheckInEmpresa = [
  { name: "Telefono ", valor: "tel", type: "number" },
  { name: "Direccion ", valor: "adress", type: "text" },
  { name: "Correo Electronico ", valor: "email", type: "email" },
];

export const filtroDni = (dni) => {
  dni = dni.trim();
  // Dividimos la cadena por los caracteres de separación
  let datos = dni.split('"');
  // Eliminamos los elementos vacíos
  datos = datos.filter((d) => d !== "");
  // Retornamos los datos en forma de array
  return datos;
};

export const inputValueCompany = [
  { name: "Nombre ", valor: "name", type: "text" },
  { name: "CUIT ", valor: "cuit", type: "text" },
  { name: "Telefono ", valor: "tel", type: "number" },
  { name: "Dirección ", valor: "adress", type: "text" },
  { name: "Correo Electronico ", valor: "email", type: "email" },
];

export const columnClient = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "blacklist",
    headerName: "Lista Negra",
    width: 70,
  },
  {
    field: "name",
    headerName: "Nombre y Apellido",
    width: 250,
  },
  {
    field: "gender",
    headerName: "Sexo",
    width: 20,
  },
  {
    field: "dni",
    headerName: "DNI",
    width: 100,
  },
  {
    field: "birthdate",
    headerName: "Fecha de Nac",
    width: 100,
  },
  {
    field: "tel",
    headerName: "Telefono",
    width: 120,
  },
  {
    field: "adress",
    headerName: "Direccion",
    width: 100,
  },
  {
    field: "visit",
    headerName: "Visitas",
    width: 100,
  },
  {
    field: "Empresa",
    headerName: "Empresa",

    width: 120,
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 100,
  },
];
export const columnCompany = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "blacklist",
    headerName: "Lista Negra",

    width: 70,
  },
  {
    field: "name",
    headerName: "Nombre",

    width: 150,
  },
  {
    field: "cuit",
    headerName: "CUIT",

    width: 120,
  },
  {
    field: "tel",
    headerName: "Telefono",

    width: 120,
  },
  {
    field: "adress",
    headerName: "Dirección",

    width: 100,
  },
  {
    field: "email",
    headerName: "Correo",

    width: 120,
  },
  {
    field: "visit",
    headerName: "Visitas",

    width: 120,
  },
  {
    field: "description",
    headerName: "Descripción",

    width: 120,
  },
];

export const data_Dni = (datospersonales, form, check, id) => {
  let { tel, address, email, description } = form;
  let name = `${datospersonales[1] + " " + datospersonales[2]}`;
  let gender = `${datospersonales[3]}`;
  let dni = `${datospersonales[4]}`;
  let birthdate = `${datospersonales[6]}`;
  let blacklist = check ? "✅" : "❌";
  return {
    name,
    gender,
    dni,
    birthdate,
    tel,
    address,
    blacklist,
    email,
    description,
    id,
  };
};
export const data_DniI = (datospersonales, form, check, id) => {
  let { tel, adress, email, description } = form;
  let name = `${datospersonales[3] + " " + datospersonales[4]}`;
  let gender = `${datospersonales[7]}`;
  let dni = `${datospersonales[0]}`;
  let birthdate = `${datospersonales[6]}`;
  let blacklist = check ? "✅" : "❌";
  return {
    name,
    gender,
    dni,
    birthdate,
    tel,
    adress,
    blacklist,
    email,
    description,
    id,
  };
};

export const dateFormater = (date) => {
  const fecha = new Date(date);
  const anio = fecha.getFullYear();
  const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
  const dia = ("0" + fecha.getDate()).slice(-2);
  const fechaFormateada = anio + "/" + mes + "/" + dia;
  return fechaFormateada; // Salida: "2023/03/14"
};
