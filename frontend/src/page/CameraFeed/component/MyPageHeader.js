// import libraries
import { Card, Typography } from "@mui/material";

export const MyPageHeader = () => {
  return (
    <Card
      sx={{
        marginTop: 2,
        padding: 1,
      }}
    >
      <Typography variant="h4" component="h2" className="live-page-title">
        CAMERA FEED
      </Typography>
    </Card>
  );
};
