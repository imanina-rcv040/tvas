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
  process.env.REACT_APP_BACKEND_TVAS_SERVER || "http://172.17.0.143:20001";

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

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <circle cx={x} cy={y} r={15} fill={colors[index % colors.length]} />
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={20}
          fontWeight="bold"
          fontFamily="Poppins"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <Grid>
      <Card className="card">
        <Typography variant="h5" component="h3" className="text-chart-title">
          <span className="color-title">Today</span>
          <span className="bg-color-title">Violation Report</span>
        </Typography>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="40%"
                outerRadius={100}
                label={renderCustomLabel}
              >
                {reportViolation.map((entry, index) => (
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
                  bottom: "40px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
