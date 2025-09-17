import { NavLink } from "react-router-dom";
import { useState } from "react";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileSelected, setIsProfileSelected] = useState(false);

  const handleMenuClick = (idx) => {
    setSelectedMenu(idx);
  };
  console.log("Menu selected" + selectedMenu);

  const handleProfileClick = () => {
    setIsProfileSelected(!isProfileSelected);
    alert("Profile clicked");
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
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
