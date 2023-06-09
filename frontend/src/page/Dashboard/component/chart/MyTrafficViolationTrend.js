// import libraries
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Line,
} from "recharts";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.10.83:20001";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/last-24-hour`;
console.log("backendServerURL", backendServerURL);

const trafficViolationData = [
  { hour: "00:00", count: 7 },
  { hour: "01:00", count: 5 },
  { hour: "02:00", count: 3 },
  { hour: "03:00", count: 2 },
  { hour: "04:00", count: 0 },
  { hour: "05:00", count: 1 },
  { hour: "06:00", count: 6 },
  { hour: "07:00", count: 8 },
  { hour: "08:00", count: 19 },
  { hour: "09:00", count: 12 },
  { hour: "10:00", count: 9 },
  { hour: "11:00", count: 11 },
  { hour: "12:00", count: 15 },
  { hour: "13:00", count: 23 },
  { hour: "14:00", count: 18 },
  { hour: "15:00", count: 17 },
  { hour: "16:00", count: 26 },
  { hour: "17:00", count: 30 },
  { hour: "18:00", count: 22 },
  { hour: "19:00", count: 15 },
  { hour: "20:00", count: 18 },
  { hour: "21:00", count: 20 },
  { hour: "22:00", count: 24 },
  { hour: "23:00", count: 19 },
];


export const MyTrafficViolationTrend = () => {
  const [trendViolation, setTrendViolation] = useState([]);

  // fetch TVAS based on trend violation
  useEffect(() => {
    const fetchTrendViolation = async () => {
      try {
        const apiURL = `${backendServerURL}`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Data for violation trend:", responseData);
          setTrendViolation(responseData);
        } else {
          console.log("Error response monthly:", response.status);
        }
      } catch (error) {
        console.log("Error fetch monthly violations", error);
      }
    };

    fetchTrendViolation();
  }, []);

  return (
    <Grid>
      <Card className="card">
        <Typography variant="h5" component="h3" className="text-chart-title-4">
          <span className="color-title">Last 24 Hours</span>
          <span className="bg-color-title">Violation Trend</span>
        </Typography>
        <CardContent>
          <Typography
            variant="h5"
            component="h3"
            className="dashboard-title-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "5px",
            }}
          >
            <span
              style={{
                background: "#bb7a7a",
                border: "1px solid #bb7a7a ",
                padding: "5px 10px",
                color: "white",
              }}
            >
              Traffic Violation
            </span>
            <span
              style={{
                border: "1px solid #bb7a7a",
                padding: "5px 10px",
              }}
            >
              24 Hours
            </span>
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart width={730} data={trafficViolationData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <CartesianGrid strokeDasharray="5 5" />
              <Bar dataKey="count" barSize={10} fill="#bb7a7a"></Bar>
              <Line
                type="monotone"
                dataKey="count"
                stroke="#000"
                name="violation"
              ></Line>
              <Tooltip cursor={{ strokeDasharray: "5 5" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <Typography
            variant="p"
            component="h3"
            style={{
              fontSize: "60%",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "left",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <span
              style={{
                padding: "5px 10px",
                color: "white",
              }}
            >
              hi{" "}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
