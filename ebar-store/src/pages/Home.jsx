import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../Redux/cartSlice";
import axiosInstance from "../api/axiosConfig";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [addingToCart, setAddingToCart] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/user-api/e-bar-store");
      setProducts(response.data.ECommerceBars);
    } catch (err) {
      console.error("Failed to fetch products ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    setAddingToCart(product.id);
    try {
      await dispatch(addToCart({ bar_id: product.id, product })).unwrap();
      setMessage(`${product.name.en} added to cart`);
      setSnackbarOpen(true);
    } catch (err) {
      setMessage(err.message || "Failed to add to cart");
      setSnackbarOpen(true);
    } finally {
      setAddingToCart(null);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#D4AF37" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ p: 3, width: "100%", backgroundColor: "black", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#D4AF37",
          textAlign: "center",
          mt: 8,
          mb: 4,
        }}
      >
        Gold Bars
      </Typography>

      <Grid container spacing={5} justifyContent="center">
        {products.map((product) => (
          <Grid
            
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: { xs: "100%", sm: "400px", md: "350px" },
              width: "100%",
            }}
          >
            <Card
              sx={{
                width: "100%",
                padding: 2,
                backgroundColor: "#FFFDF6",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name.en}
                sx={{ height: 200, objectFit: "contain", p: 1 }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {product.name.en}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#D4AF37",
                    marginTop: 2,
                    cursor: "pointer",
                  }}
                >
                  {product.total.toLocaleString()} EGP
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={addingToCart === product.id}
                  fullWidth
                  sx={{
                    backgroundColor: "#D4AF37",
                    color: "#fff",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#bfa339",
                      padding: 1,
             
                    },
                  }}
                >
                  {addingToCart === product.id ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={message.includes("Failed") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
