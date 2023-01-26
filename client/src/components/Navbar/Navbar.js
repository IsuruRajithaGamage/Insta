import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./styles";
import { useDispatch } from "react-redux";
export const Navbar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Instagram
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        <div className={classes.profile}>
          <Avatar
            className={classes.purple}
            alt={user?.result.name}
            src={user?.result.imageURL}
          >
            {user?.result.name.charAt(0)}
          </Avatar>
          <Typography className={classes.userName} variant="h6">
            {user?.result.name}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            className={classes.logout}
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
