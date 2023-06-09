// import libraries
import Box from "@mui/material/Box";
import { DashboardMenuItem, useSidebarState, MenuItemLink } from "react-admin";
import HistoryIcon from "@mui/icons-material/History";
import LiveIcon from "@mui/icons-material/LiveTv";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

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
        primaryText="Dashboard"
        className="menu-primary-text"
      />
      <MenuItemLink
        to="/dashboard"
        primaryText="Dashboard"
        className="menu-primary-text"
        leftIcon={<DashboardCustomizeIcon />}
      />
      <MenuItemLink
        to="/camera-feed"
        primaryText="Camera Feed"
        className="menu-primary-text"
        leftIcon={<LiveIcon />}
      />
      <MenuItemLink
        to="/history"
        primaryText="History"
        className="menu-primary-text"
        leftIcon={<HistoryIcon />}
      />
    </Box>
  );
};
