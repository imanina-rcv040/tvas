// import libraries
import Box from "@mui/material/Box";
import { DashboardMenuItem, useSidebarState, MenuItemLink } from "react-admin";
import HistoryIcon from "@mui/icons-material/History";
import LiveIcon from "@mui/icons-material/LiveTv";

export const MyMenu = () => {
  const [open] = useSidebarState();

  return (
    <Box
      sx={{
        width: open ? 250 : 50,
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <DashboardMenuItem
        primaryText="livestream"
        className="menu-primary-text"
      />
      <MenuItemLink
        to="/livestream"
        primaryText="livestream"
        className="menu-primary-text"
        leftIcon={<LiveIcon />}
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
