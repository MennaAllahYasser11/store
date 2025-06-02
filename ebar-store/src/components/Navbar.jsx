
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Button, IconButton, Box, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems ? cartItems.length : 0;

  return (
    <AppBar  sx={{ backgroundColor: "#D4AF37", mb: 8 }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            GOLDADY
          </Button>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <IconButton
            color="inherit"
            sx={{
              fontSize: "2rem",
              "&:hover": {
                transition: "transform 0.3s ease",
              },
            }}
          >
            <Badge
              badgeContent={itemCount}
              color="error"
              sx={{
                "MuiBadge-badge": {
                  fontSize: "0.8rem",
                  height: "20px",
                  minWidth: "20px",
                  borderRadius: "10px",
                },
              }}
            >
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;