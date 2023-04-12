// import libraries
import { Admin, Resource } from "react-admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import { MyLogin } from "./layout/Login";
import { MyDashboard } from "./dashboard/Dashboard";

// import styling
import { MyLayout } from "./layout/Layout";
import "@fontsource/nunito"; // Defaults to weight 400.
import "@fontsource/poppins"; // Defaults to weight 400.

// set ffmpegIP
const ffmpegIP = "172.17.11.7";
console.log("ffmpegIP:", ffmpegIP, "connected");

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Admin
              title="Traffic Offence"
              dashboard={() => <MyDashboard ffmpegIP={ffmpegIP} />}
              loginPage={MyLogin}
              layout={MyLayout}
              disableTelemetry
            >
              <Resource name="model_list" options={{ label: "Models" }} />
            </Admin>
          }
        />
        <Route path="/login" element={<MyLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
