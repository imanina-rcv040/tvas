// import libraries
import Box from "@mui/material/Box";
import { DashboardMenuItem, useSidebarState, MenuItemLink } from "react-admin";
import HistoryIcon from "@mui/icons-material/History";

export const MyMenu = () => {
  const [open] = useSidebarState();

  return (
    <Box
      sx={{
        width: open ? 250 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        "&:hover": {
          background: "orange",
        },
      }}
    >
      <DashboardMenuItem
        primaryText="livestream"
        className="menu-primary-text"
      />
      <MenuItemLink
        to="/history"
        primaryText="history"
        className="menu-primary-text"
        leftIcon={<HistoryIcon />}
      />
    </Box>
  );
};
