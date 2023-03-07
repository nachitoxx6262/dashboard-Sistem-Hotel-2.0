import { Box,Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { getclients } from "../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import ClientSave from "./ClientSave";
import ClientDelete from "./ClientDelete";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Client = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  let data = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getclients());
  }, [dispatch]);
  useEffect(() => {}, [data]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nombre Completo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "dni",
      headerName: "DNI",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "blacklist",
      headerName: "Lista Negra",
      flex: 1,
    },
    { field: "email", headerName: "Email", width: 170, editable: true },
    { field: "tel", headerName: "Tel", width: 100, editable: true },
    {
      field: "birthdate",
      headerName: "Fecha Nac",
      width: 100,
      editable: true,
    },
    { field: "address", headerName: "Dirección", width: 100, editable: true },
    { field: "gender", headerName: "Genero", width: 60, editable: true },
    {
      field: "description",
      headerName: "Descripcion",
      width: 170,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Guardar",
      type: "actions",
      renderCell: (params) => <ClientSave {...{ params, rowId, setRowId }} />,
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "actions",
      renderCell: (params) => <ClientDelete {...{ params, rowId, setRowId }} />,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Datos de Clientes"
        subtitle="Lista de contactos y datos personales de clientes"
      />
      <Link to="/registerfamily" style={{ textDecoration: "none" }}>
    <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>Registrar Cliente</Button>
    </Link>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Client;
