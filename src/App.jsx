import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import './App.css'
const Home = lazy(() => import("./pages/Home/Home"));
// const Login = lazy(() => import("./pages/login/login"));
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<Home />} />
          {/* <Route  path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
