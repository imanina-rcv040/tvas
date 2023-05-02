// import libraries
import { Layout } from "react-admin";

// import components
import { MyAppBar } from "./AppBar";
import { MyMenu } from "./Menu";
import { useLocation } from "react-router-dom";
import { MyLivestream } from "../livestream/Livestream";

export const MyLayout = (props) => {
  const location = useLocation();

  // Render the MyLivestream component on the dashboard route
  if (location.pathname === "/livestream") {
    return (
      <Layout {...props} appBar={MyAppBar} menu={MyMenu}>
        <MyLivestream {...props} />
      </Layout>
    );
  }

  // Render the default layout for other routes
  return <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;
};
