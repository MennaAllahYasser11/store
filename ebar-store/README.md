 # E-bar Store:
 - It is designed for purchasing gold bars.
 - Built with a focus on user experience, it features a responsive interface, seamless cart management, and secure session handling. 

- With a luxurious black-and-gold theme, it offers an intuitive shopping experience with real-time cart updates, pricing calculations


# Features :
- Product Listing: Displays gold bars with images, names, and prices fetched from a backend API.

- Cart Management: Add, remove, increment, or decrement items in the cart, with real-time price calculations including subtotal, VAT (14%) and total.

- Session Handling: Generates unique session tokens for unauthenticated users and handle case if user auth to avoid unprocessable content if possible to add Authentication  

- Responsive Design: Built with Material-UI for a polished, mobile-friendly interface.

- State Management: Utilizes Redux Toolkit for efficient cart state management.

- API Integration: Uses Axios for secure HTTP requests to the backend API.


# Tools and Packages Used

React: Frontend library for building the user interface.
React Router: For client-side routing (e.g., navigating between Home and Cart pages).
Redux Toolkit: For state management, handling cart operations, and async API calls.
Axios: For making HTTP requests to the backend API.
Material-UI (MUI): For responsive UI components and styling with a luxurious black-and-gold theme.
LocalStorage: For persisting cart and token data for unauthenticated users.

# Installation and Setup
git clone https://github.com/MennaAllahYasser11/store.git
cd store
cd ebar-store
npm install  -> to install all packages in package.json
npm run dev

