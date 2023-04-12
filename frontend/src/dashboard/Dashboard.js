// import libraries
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

// import components
import { MyDashboardTitle } from "./DashboardTitle";
import { MyLiveStream } from "./livestream/LiveStream";

// import styling
import "./Dashboard.css";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

// const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

export const MyDashboard = (props) => {
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  let ffmpegIP = props.ffmpegIP;
  let videoUrl = `ws://${ffmpegIP}:6789/`;
  let player;

  function reinitStream() {
    try {
      player.destroy();
    } catch (error) {
      console.log(error);
    }

    player = new JSMpeg.VideoElement("#cvsVideo", videoUrl, {
      autoplay: true,
    });
    console.log("player", player);
  }
  useEffect(() => {
    reinitStream();
  }, []);

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn}>
        <MyDashboardTitle />
        <VerticalSpacer />
        <button
          className="button-dashboard"
          style={{ position: "relative", top: "40px", left: "15px" }}
          onClick={reinitStream}
        >
          Refresh Stream
        </button>
        <MyLiveStream />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.singleCol}>
        <MyDashboardTitle />
      </div>
      <div>
        <button
          className="button-dashboard"
          style={{ position: "relative", top: "40px", left: "15px" }}
          onClick={reinitStream}
        >
          Refresh Stream
        </button>
        <MyLiveStream />
      </div>
    </div>
  ) : (
    <>
      <MyDashboardTitle />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div>
            <button
              className="button-dashboard"
              style={{ position: "relative", top: "40px", left: "15px" }}
              onClick={reinitStream}
            >
              Refresh Stream
            </button>
            <MyLiveStream />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}></div>
        </div>
      </div>
    </>
  );
};
