import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import Store from './Redux/store.js'
import {Toaster} from 'react-hot-toast'
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={Store}>
      <HelmetProvider>
        <CssBaseline />
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
          <Toaster position="bottom-center"/>
        </div>
      </HelmetProvider>
    </Provider>
  </>
);
