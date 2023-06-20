// import libraries
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// set backend server
const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

// set backend config server
const REACT_APP_BACKEND_CONFIG_SERVER =
  process.env.REACT_APP_BACKEND_CONFIG_SERVER || "http://172.17.0.143:20005";

// set backend path
const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/monthly-comparison`;
console.log("backendServerURL", backendServerURL);

// set config path
const username = localStorage.getItem("username");
const configServerURL = `${REACT_APP_BACKEND_CONFIG_SERVER}/user/${username}`;

export const MyMonthlyComparison = () => {
  const [monthlyViolation, setMonthlyViolation] = useState([]);
  const [colors, setColors] = useState([]);

  // fetch TVAS based on monthly violation
  useEffect(() => {
    const fetchMonthlyViolation = async () => {
      try {
        const apiURL = `${backendServerURL}`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Monthly violation: data", responseData);
          const filteredData = responseData.filter(
            (item) => item.violations.length > 0
          );
          console.log("filteredData", filteredData);
          console.log("filteredData", typeof filteredData);
          setMonthlyViolation(filteredData);
        } else {
          console.log("Error response monthly:", response.status);
        }
      } catch (error) {
        console.log("Error fetch monthly violations", error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch(`${configServerURL}`);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Colors data:", responseData);
          if (responseData.item && responseData.item.colors) {
            setColors(responseData.item.colors);
          }
        } else {
          console.log("Error response colors:", response.status);
        }
      } catch (error) {
        console.log("Error fetching colors", error);
      }
    };

    fetchMonthlyViolation();
    fetchColors();
  }, []);

  return (
    <Grid item xs={6} md={3}>
      <Card className="card">
        <Typography variant="h5" component="h3" className="text-chart-title">
          <span className="color-title">Monthly Basis</span>
          <span className="bg-color-title">Violation Incidents</span>
        </Typography>
        <CardContent>
          <ResponsiveContainer width="100%" height={275}>
            <BarChart data={monthlyViolation} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="month"
                width={100}
                tick={{ fontSize: 13, fontFamily: "Poppins" }}
              />
              <Tooltip />
              <Legend />
              {monthlyViolation.length > 0 &&
                monthlyViolation[0].violations.map((v, i) => (
                  <Bar
                    key={i}
                    dataKey={`violations[${i}].count`}
                    name={v.type}
                    stackId="violationStack"
                    fill={colors[i % colors.length]}
                    barSize={10}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
