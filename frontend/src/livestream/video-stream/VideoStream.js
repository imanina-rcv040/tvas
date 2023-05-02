// import libraries
import { Card, CardContent } from "@mui/material";

export const MyVideoStream = () => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent title={"video stream"}>
        <div className="canvas-container">
          <div id="cvsVideo" className="canvas-stream" />
        </div>
      </CardContent>
    </Card>
  );
};
