// import libraries
import { Admin, Resource } from "react-admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import mqtt from "mqtt/dist/mqtt";

// import components
import { MyLogin } from "./layout/Login";
import { MyDashboard } from "./dashboard/Dashboard";

// import styling
import { MyLayout } from "./layout/Layout";
import "@fontsource/nunito"; // Defaults to weight 400.
import "@fontsource/poppins"; // Defaults to weight 400.

// import data provider
import { dataProvider } from "./api/dataProvider";

// import resources
import { HistoryList } from "./resources/HistoryList";

// set ffmpegIP
const ffmpegIP = "172.17.11.7";
console.log("ffmpegIP:", ffmpegIP, "connected");

// set and connect MQTT
const REACT_APP_MQTT_SERVER =
  process.env.REACT_APP_MQTT_SERVER || "ws://172.17.0.216:8080/";
const REACT_APP_MQTT_DATA_TOPIC =
  process.env.REACT_APP_MQTT_DATA_TOPIC || "uturn/event";
const client = mqtt.connect(REACT_APP_MQTT_SERVER);
console.log("REACT_APP_MQTT_SERVER", REACT_APP_MQTT_SERVER);
console.log("REACT_APP_MQTT_DATA_TOPIC", REACT_APP_MQTT_DATA_TOPIC);
console.log("MQTT: client connected!");

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
              <Resource name="history" list={HistoryList} />
            </Admin>
          }
        />
        <Route path="/login" element={<MyLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
