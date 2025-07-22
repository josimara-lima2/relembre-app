import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WaterDropIcon from "@mui/icons-material/Opacity";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from './../assets/images/logo.png';

import { Link, useLocation } from "react-router-dom";
import { signOut } from "@aws-amplify/auth";
import useAlertScheduler from "../hooks/useAlertScheduler";
import { useState } from "react";

const expandedWidth = 240;
const collapsedWidth = 60;

const navItems = [
  { path: "/", label: "Início", icon: <HomeIcon /> },
  { path: "/meta-agua", label: "Meta de Água", icon: <WaterDropIcon /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { blockNotificacao } = useAlertScheduler();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? expandedWidth : collapsedWidth,
        transition: "width 0.3s",
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflowX: "hidden",
        "& .MuiDrawer-paper": {
          width: open ? expandedWidth : collapsedWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {open && (
          
          <Typography variant="h6" fontWeight="bold" align="center">
            <img src={logo} alt="ReLembre" className="mx-auto mb-2 w-[80px] h-[80px]" />
            ReLembre
          </Typography>
        )}
      </Box>

      <List>
        {navItems.map((item) => {
          const selected = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={selected}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: selected ? '#123444' : "transparent",
                  color: selected ? "#000" : "inherit",
                  "&:hover": {
                    backgroundColor: selected
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: selected ? '#000' : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          );
        })}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              blockNotificacao();
              signOut();
            }}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              mt: 2,
              color: "#000"
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
                color: "#000",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Sair" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
