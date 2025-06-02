import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItem,
  fetchCart,
  fetchCartPrices,
  clearCart,
} from "../Redux/cartSlice";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  CircularProgress,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartItems = () => {
  const dispatch = useDispatch();
  const { items, prices , status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart()).then(() => dispatch(fetchCartPrices()));
  }, [dispatch]);

  const handleIncrement = (itemId) => {
    dispatch(updateCartItem({ itemId, action: "INCREMENT" }));
  };

  const handleDecrement = (itemId) => {
    dispatch(updateCartItem({ itemId, action: "DECREMENT" }));
  };

  const handleRemove = (itemId) => {
    dispatch(updateCartItem({ itemId, action: "DELETE" }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#D4AF37" }} />
      </Box>
    );
  }


  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "black",
        minHeight: "100vh",
        mx: "auto",
      }}
    >
      {!items || items.length === 0 ? (
        <Typography
          variant="h4"
          sx={{
            mt: 8,
            fontWeight: "bold",
            color: "#D4AF37",
            textAlign: "center",
          }}
        >
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#D4AF37",
              textAlign: "center",
              mt: 8,
              mb: 4,
            }}
          >
            Your Shopping Cart
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              mb: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#D4AF37" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ fontSize: "1rem" }}>
                      {item.name?.en}
                    </TableCell>

                    <TableCell align="right" sx={{ fontSize: "1rem" }}>
                      {item.price?.toLocaleString()} EGP
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleDecrement(item.id)}
                          disabled={status === "loading"}
                          sx={{ color: "#D4AF37" }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography
                          sx={{ mx: 2, fontSize: "1rem", fontWeight: "bold" }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleIncrement(item.id)}
                          disabled={status === "loading"}
                          sx={{ color: "#D4AF37" }}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1rem", fontWeight: "bold" }}
                    >
                      {(item.price * item.quantity).toLocaleString()} EGP
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleRemove(item.id)}
                        disabled={status === "loading"}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 600,
                borderRadius: 2,
                border: "2px solid #D4AF37",
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#D4AF37",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  ORDER SUMMARY
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="h6">
                      {prices?.subtotal?.toLocaleString()} EGP
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      VAT (14%):
                    </Typography>
                    <Typography variant="h6">
                      {prices?.tax?.toLocaleString()} EGP
                    </Typography>
                  </Box>

                  <Divider
                    sx={{
                      my: 2,
                      borderColor: "#D4AF37",
                      borderWidth: 1,
                    }}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Total:
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#D4AF37",
                        fontWeight: "bold",
                      }}
                    >
                      {prices?.total?.toLocaleString()} EGP
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              disabled={status === "loading"}
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartItems;
