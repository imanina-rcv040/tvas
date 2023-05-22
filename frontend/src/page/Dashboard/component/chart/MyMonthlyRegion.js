import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Grid, Card, CardContent, Typography } from "@mui/material";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const violationData = [
  {
    region: "North",
    violations: [
      { type: "Speeding", count: 100 },
      { type: "Red Light Running", count: 150 },
      { type: "Illegal Parking", count: 500 },
      { type: "Improper Lane Usage", count: 200 },
      { type: "Illegal U-turn", count: 100 },
    ],
  },
  {
    region: "South",
    violations: [
      { type: "Speeding", count: 150 },
      { type: "Red Light Running", count: 100 },
      { type: "Illegal Parking", count: 520 },
      { type: "Improper Lane Usage", count: 250 },
      { type: "Illegal U-turn", count: 310 },
    ],
  },
  {
    region: "West",
    violations: [
      { type: "Speeding", count: 155 },
      { type: "Red Light Running", count: 100 },
      { type: "Illegal Parking", count: 521 },
      { type: "Improper Lane Usage", count: 525 },
      { type: "Illegal U-turn", count: 313 },
    ],
  },
  {
    region: "East",
    violations: [
      { type: "Speeding", count: 755 },
      { type: "Red Light Running", count: 140 },
      { type: "Illegal Parking", count: 421 },
      { type: "Improper Lane Usage", count: 225 },
      { type: "Illegal U-turn", count: 113 },
    ],
  },
];

const styles = {
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    height: 400,
  },
};

export const MonthlyRegionViolation = () => {
  return (
    <Grid item xs={6} md={3}>
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
            Region Comparison
            <span
              style={{
                background: "#000",
                padding: "5px 10px",
                color: "white",
              }}
            >
              JAN
            </span>
          </Typography>
        </CardContent>
        <ResponsiveContainer height={300} width="100%">
          <BarChart data={violationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            {violationData[0].violations.map((v, i) => (
              <Bar
                key={i}
                dataKey={`violations[${i}].count`}
                name={v.type}
                fill={colors[i % colors.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Grid>
  );
};
