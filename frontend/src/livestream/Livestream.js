// import libraries
import { useState, useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import mqtt from "mqtt/dist/mqtt";

// import components
import { MyLivestreamTitle } from "./LivestreamTitle";
import { MyVideoStream } from "./video-stream/VideoStream";
import { MyTrafficAlert } from "./traffic-alert/TrafficAlert";

// import styling
import "./Livestream.css";

// set ffmpegIP
const ffmpegIP = "172.17.11.7";
console.log("ffmpegIP:", ffmpegIP, "connected");

// set and connect MQTT
const REACT_APP_MQTT_SERVER =
  process.env.REACT_APP_MQTT_SERVER || "ws://172.17.0.216:8080/";
const REACT_APP_MQTT_DATA_TOPIC =
  process.env.REACT_APP_MQTT_DATA_TOPIC || "uturn/event";
const mqttClient = mqtt.connect(REACT_APP_MQTT_SERVER);
console.log("REACT_APP_MQTT_SERVER", REACT_APP_MQTT_SERVER);
console.log("REACT_APP_MQTT_DATA_TOPIC", REACT_APP_MQTT_DATA_TOPIC);
console.log("MQTT: client connected!");

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: {
    flex: 1,
    marginRight: "0.5em",
  },
  rightCol: {
    flex: 1,
    marginLeft: "0.5em",
    height: "22em",
  },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;

export const MyLivestream = () => {
  let videoUrl = `ws://${ffmpegIP}:6789/`;
  let player;
  let mqttTopic = REACT_APP_MQTT_DATA_TOPIC;

  const [offloader, setOffloader] = useState("null");
  const [topic, setTopic] = useState("null");

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
    mqttClient.subscribe(mqttTopic);
    mqttClient.on("message", function (topic, message) {
      if (topic === mqttTopic) {
        let msgJSON = JSON.parse(message);
        setOffloader(msgJSON);
        setTopic(topic);
      }
    });
  }, []);

  return (
    <>
      <MyLivestreamTitle />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.singleCol}>
            <button
              className="button-live-page"
              style={{
                position: "absolute",
                marginLeft: "1%",
              }}
              onClick={reinitStream}
            >
              Refresh Stream
            </button>
            <Spacer />
            <MyVideoStream />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.singleCol}>
            <MyTrafficAlert data={offloader} />
          </div>
          <div style={styles.flex}></div>
        </div>
      </div>
    </>
  );
};
