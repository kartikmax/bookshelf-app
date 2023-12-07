import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My React App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Admin
        </Button>
        <Button color="inherit" component={Link} to="/showAdmin">
          Show Admin
        </Button>
        <Button color="inherit" component={Link} to="/showBook">
          Show Book
        </Button>
        <Button color="inherit" component={Link} to="/qrScanner">
          QR Scanner
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
