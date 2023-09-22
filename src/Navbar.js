import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export function Navbar() {
  const location = useLocation();

  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(to right, #000000, #333333)" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Real Estate Legal Documents Blockchain System
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
          >
            <HomeIcon />
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/history"
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
          >
            History
          </Button>

          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                color="inherit"
                component={Link}
                to="/upload"
                sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
              >
                Upload
              </Button>
            </Box>
            <Button
              color="inherit"
              component={Link}
              to="/wallet"
              sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
            >
              Connect Wallet
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
}