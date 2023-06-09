// import libraries
import { Admin, Resource, CustomRoutes } from "react-admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import { MyLogin } from "./layout/component/MyLogin";
import { MyDashboard } from "./page/Dashboard/MyDashboard";
import { MyHistory } from "./page/History/MyHistory";
import GrafanaDashboard from './page/Grafana/GrafanaDashboard';


// import styling
import { MyLayout } from "./layout/MyLayout";
import "@fontsource/nunito"; // Defaults to weight 400.
import "@fontsource/poppins"; // Defaults to weight 400.

// import data provider
import { dataProvider } from "./api/dataProvider";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Admin
              title="Traffic Offence"
              dataProvider={dataProvider}
              dashboard={() => (
                <MyDashboard
                />
              )}
              loginPage={MyLogin}
              layout={MyLayout}
              disableTelemetry
            >
              <Resource name="history" list={MyHistory} />
              <CustomRoutes>
                <Route path="/dashboard" element={<GrafanaDashboard />} />
              </CustomRoutes>

            </Admin>
          }
        />
        <Route path="/login" element={<MyLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
