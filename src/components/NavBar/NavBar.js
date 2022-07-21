import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useState(
    window.location.href.substring(window.location.href.lastIndexOf("/")) === "/" ? 0 : 1
  );

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };
  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} to="/" component={Link} />
        <Tab label="Favorites" index={1} to="/favorites" component={Link} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
