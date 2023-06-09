// import libraries
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const REACT_APP_BACKEND_TVAS_SERVER =
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.10.83:20001";

const backendServerURL = `${REACT_APP_BACKEND_TVAS_SERVER}/summary/daily-report-violation`;
console.log("backendServerURL", backendServerURL);

const colors = ["#00C49F", "#FFBB28", "#0088FE", "#8884d8", "#ff8042"];

const styles = {
  arrow: {
    fontSize: 50,
    verticalAlign: "middle",
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    height: 400,
  },
};
export const MyTodayViolationTypeReport = () => {
  const [reportViolation, setReportViolation] = useState([]);

  // Fetch TVAS for violation report
  useEffect(() => {
    const fetchReportViolation = async () => {
      try {
        const apiURL = `${backendServerURL}`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Data for violation report:", responseData);
          setReportViolation(responseData);
        } else {
          console.log("Error response report:", response.status);
        }
      } catch (error) {
        console.log("Error fetch report violations", error);
      }
    };

    fetchReportViolation();
  }, []);

  const data = reportViolation.map((violation, index) => ({
    name: violation.type,
    value: violation.count,
  }));
  return (
    <Grid>
      <Card sx={styles.card}>
        <CardContent>
          <Typography
            variant="h5"
            component="h3"
            className="dashboard-title-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              paddingBottom: "5px",
            }}
          >
            Violation Daily Report
            <span
              style={{
                background: "#000",
                padding: "5px 10px",
                color: "white",
              }}
            >
              TYPE
            </span>
          </Typography>
        </CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              caption="name"
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="70%"
              outerRadius={100}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              iconSize={12}
              wrapperStyle={{
                bottom: "-60px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Grid>
  );
};
