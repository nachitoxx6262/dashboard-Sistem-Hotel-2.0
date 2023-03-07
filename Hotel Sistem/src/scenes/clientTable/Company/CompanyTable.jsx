import { useEffect, useMemo, useState } from "react";
import { Box, Typography,Button } from "@mui/material";
import CompanySave from "./CompanySave";
import { getCompany } from "../../../Redux/action";
import CompanytDelete from "./CompanytDelete";
import { useSelector, useDispatch } from "react-redux";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {Link} from "react-router-dom";

const CompanyTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  let data = useSelector((state) => state.companys);
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);
  useEffect(() => {}, [data]);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 60,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Nombre", width: 170, editable: true },
      { field: "cuit", headerName: "Cuit", width: 100, editable: true },
      { field: "tel", headerName: "Tel", width: 80, editable: true },
      { field: "adress", headerName: "Direccion", width: 170, editable: true },
      { field: "email", headerName: "Email", width: 100, editable: true },
      {field: "description",headerName: "Descripcion",width: 100,editable: true,},
      {field: "blacklist",headerName: "Lista Negra",width: 60,editable: true,},
      {field: "actions",headerName: "Guardar",type: "actions",renderCell: (params) => (  <CompanySave {...{ params, rowId, setRowId }} />),},
      {field: "delete",headerName: "Delete",type: "actions",renderCell: (params) => <CompanytDelete {...{ params, rowId, setRowId }} />,},
    ],
    [rowId]
  );

  return (
    <Box m="20px">
    <Header
      title="Datos de Empresas"
      subtitle="Lista de contactos y datos  de empresas"
    />
    <Link to="/registercompany" style={{ textDecoration: "none" }}>
    <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>Registrar Empresa</Button>
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

export default CompanyTable;
