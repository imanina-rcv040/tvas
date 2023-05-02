// import libraries
import { Card, Typography } from "@mui/material";

export const MyLivestreamTitle = () => {
  return (
    <Card
      sx={{
        marginTop: 2,
        padding: 1,
      }}
    >
      <Typography variant="h4" component="h2" className="live-page-title">
        LIVESTREAM
      </Typography>
    </Card>
  );
};
