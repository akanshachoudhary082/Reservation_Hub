import React from "react";
import ReactDOM from "react-dom/client";  // Use 'react-dom/client' in React 18
import App from "./App";
import { Provider } from "react-redux";  // Import Provider from react-redux
import store from "./redux/store";  // Import the Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root
root.render(  // Use the new render method
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap your app with the Redux Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
