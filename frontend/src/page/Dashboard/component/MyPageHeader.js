// import libraries
import { Card, Typography } from "@mui/material";

export const MyDashboardTitle = () => {
  return (
    <Card
      sx={{
        marginTop: 2,
        padding: 1,
      }}
    >
      <Typography variant="h4" component="h2" className="dashboard-title">
        TRAFFIC VIOLATION ALERT SYSTEM
      </Typography>
    </Card>
  );
};
