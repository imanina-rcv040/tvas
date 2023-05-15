import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

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

export const TodayViolationTypeReport = () => {
  const data = [
    {
      name: "Speeding",
      value: 70,
    },
    {
      name: "Red Light Running",
      value: 90,
    },
    {
      name: "Illegal Parking",
      value: 110,
    },
    {
      name: "Illegal U-turn",
      value: 20,
    },
    {
      name: "Improper Lane Usage",
      value: 40,
    },
  ];

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
