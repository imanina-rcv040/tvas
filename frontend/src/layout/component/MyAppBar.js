// import libraries
import { AppBar, Logout, UserMenu } from "react-admin";
import { Box } from "@mui/material";

// import component
import { MyLogo } from "./MyLogo";

const MyUserMenu = () => (
  <UserMenu>
    <Logout />
  </UserMenu>
);

export const MyAppBar = () => {
  return (
    <AppBar color="inherit" userMenu={<MyUserMenu />} >
      <MyLogo width="100px" height="50px" />
      <Box component="span" flex={1} />
    </AppBar>
  );
};
