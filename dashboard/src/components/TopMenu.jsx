import { NavLink, Navigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from '@mui/material/colors';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useContext } from "react";
import GeneralContext from "./GeneralContext/GeneralContext";
const TopMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const { userData, handleLogout } = useContext(GeneralContext);
  const handleMenuClick = (idx) => {
    setSelectedMenu(idx);
  };
  useEffect(() => {
    console.log("Menu selected", selectedMenu);
  }, [selectedMenu]);

  //profile functions

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu-container">
      <img src="cross-mark.png" className="w-7" />
      <div className="menus">
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "menu selected" : "menu"
              }
              onClick={() => handleMenuClick(0)}
            >
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/orders"}
              className={({ isActive }) =>
                isActive ? "menu selected" : "menu"
              }
              onClick={() => handleMenuClick(1)}
            >
              <p>Orders</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/holdings"}
              className={({ isActive }) =>
                isActive ? "menu selected" : "menu"
              }
              onClick={() => handleMenuClick(2)}
            >
              <p>Holdings</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/positions"}
              className={({ isActive }) =>
                isActive ? "menu selected" : "menu"
              }
              onClick={() => handleMenuClick(3)}
            >
              <p>Positions</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/funds"}
              className={({ isActive }) =>
                isActive ? "menu selected" : "menu"
              }
              onClick={() => handleMenuClick(4)}
            >
              <p>Funds</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/apps"}
              className={({ isActive }) =>
                isActive ? "menu selected" : "menu"
              }
              onClick={() => handleMenuClick(5)}
            >
              <p>Apps</p>
            </NavLink>
          </li>
          <li>
            <Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}
                    >
                      {userData && userData.username
                        ? userData.username[0]
                        : ""}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Fragment>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopMenu;
