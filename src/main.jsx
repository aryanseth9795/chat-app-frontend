import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
// import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
// import Store from './redux/store.js'
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <Provider store={Store}> */}
      <HelmetProvider>
        <CssBaseline />
        <div onContextMenu={(e) => e.preventDefault}>
          <App />
        </div>
      </HelmetProvider>
    {/* </Provider> */}
  </>
);
