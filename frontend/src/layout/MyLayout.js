// import libraries
import { Layout } from "react-admin";

// import components
import { MyAppBar } from "./component/MyAppBar";
import { MyMenu } from "./component/MyMenu";
import { useLocation } from "react-router-dom";
import { MyCameraFeed } from "../page/CameraFeed/MyCameraFeed";

export const MyLayout = (props) => {
  const location = useLocation();

  // Render the MyCameraFeed component on the dashboard route
  if (location.pathname === "/camera-feed") {
    return (
      <Layout {...props} appBar={MyAppBar} menu={MyMenu}>
        <MyCameraFeed {...props} />
      </Layout>
    );
  }

  // Render the default layout for other routes
  return <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;
};
