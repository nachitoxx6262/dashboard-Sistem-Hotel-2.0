import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Client from "./scenes/clientTable/Clients/clientTable";
import CompanyTable from "./scenes/clientTable/Company/CompanyTable";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
import RegisterFamily from "./scenes/Registrar/RegisterFamily";
import RegisterFactory from "./scenes/Registrar/RegisterFactory";
import NaDni from "./scenes/Registrar/NaDni";
import Recepcion from "./scenes/Recepcion/Recepcion";
import RegisterRoom from "./scenes/Registrar/RegisterRoom";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/client" element={<Client />} />
              <Route path="/company" element={<CompanyTable />} />
              <Route path="/reception" element={<Recepcion />} />
              <Route path="/registerroom" element={<RegisterRoom />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/registerfamily" element={<RegisterFamily />} />
              <Route path="/registercompany" element={<RegisterFactory />} />
              <Route path="/client/sindni" element={<NaDni />} />

              {/* <Route path="/calendar" element={<Calendar />} /> */}
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
