import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosConfig";
import { checkAuth } from "../Utils/token";

const initialState = {
  items: [],
  error: null,
  prices: null,
  isuser: false,
  status: "none"
};

const saveCartToLocal = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const loadCartFromLocal = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const calculateLocalPrices = (items) => {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item?.price || item?.total || 0) * (item?.quantity || 0),
    0
  );
  const tax = subtotal * 0.14;
  return { subtotal, tax, total: subtotal + tax };
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ bar_id, product }, { getState }) => {
    const state = getState();
    const isuser = checkAuth();

    if (isuser) {
      const response = await axiosInstance.post("/user-api/cart/store", {
        bar_id,
        action: "INCREMENT",
      });
      return {
        items: response.data.items,
        prices: response.data.prices,
        isuser: true,
      };
    } else {
      const existingItem = state.cart.items.find((item) => item.id === bar_id);
      let newItems;

      if (existingItem) {
        newItems = state.cart.items.map((item) =>
          item.id === bar_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [
          ...state.cart.items,
          { ...product, quantity: 1, price: product.total },
        ];
      }

      saveCartToLocal(newItems);
      return {
        items: newItems,
        prices: calculateLocalPrices(newItems),
        isuser: false,
      };
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, action }, { getState }) => {
    const state = getState();
    const isuser = checkAuth();

    if (isuser) {
      const response = await axiosInstance.post("/user-api/cart/store", {
        bar_id: itemId,
        action,
      });
      return {
        items: response.data.items,
        prices: response.data.prices,
        isuser: true,
      };
    } else {
      let newItems;
      if (action === "DELETE") {
        newItems = state.cart.items.filter((item) => item.id !== itemId);
      } else {
        newItems = state.cart.items.map((item) => {
          if (item.id === itemId) {
            const newQuantity =
              action === "INCREMENT"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      }
      saveCartToLocal(newItems);
      return {
        items: newItems,
        prices: calculateLocalPrices(newItems),
        isuser: false,
      };
    }
  }
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const isuser = checkAuth();
  if (isuser) {
    const response = await axiosInstance.get("/user-api/cart/index");
    return {
      items: response.data.items,
      prices: response.data.prices,
      isuser: true,
    };
  } else {
    const localItems = loadCartFromLocal();
    return {
      items: localItems,
      prices: calculateLocalPrices(localItems),
      isuser: false,
    };
  }
});

export const fetchCartPrices = createAsyncThunk(
  "cart/fetchCartPrices",
  async () => {
    if (checkAuth()) {
      const response = await axiosInstance.get("/user-api/cart/prices");
      return {
        subtotal: response.data.subtotal,
        tax: response.data.tax || response.data.subtotal * 0.14,
        total: response.data.total,
      };
    }
    return calculateLocalPrices(loadCartFromLocal());
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const isuser = checkAuth();
  if (isuser) {
    await axiosInstance.get("/user-api/cart/clear-cart");
  } else {
    localStorage.removeItem("cart");
  }
  return { items: [], prices: { subtotal: 0, tax: 0, total: 0 } };
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.prices = action.payload.prices;
        state.isuser = action.payload.isuser;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.prices = action.payload.prices;
        state.isuser = action.payload.isuser;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.prices = action.payload.prices;
        state.isuser = action.payload.isuser;
      })
      .addCase(fetchCartPrices.fulfilled, (state, action) => {
        state.prices = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.prices = action.payload.prices;
      });
  },
});

export default cartSlice.reducer;
