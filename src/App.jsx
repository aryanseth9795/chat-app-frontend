import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { LayoutLoader } from "./components/Loader/Loader";
const Home = lazy(() => import("./pages/Home/Home"));
const NotFound = lazy(() => import("./pages/Not Found/NotFound"));
const Login = lazy(() => import("./pages/Login/Login"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const Group = lazy(() => import("./pages/Group/Group"));
function App() {
  let user = true;
  return (
    <>
      <Router>
        <Suspense fallback={<LayoutLoader/>}>
          <Routes>
            <Route element={<ProtectedRoute user={user}  />}>
              {/* All Protected ROutes come under this section */}
              <Route path="/" element={<Home />} />
              <Route path="/chat:id" element={<Chat />} />
              <Route path="/groups" element={<Group />} />
            </Route>
            {/* // Now for login route */}
            <Route element={<ProtectedRoute user={!user} Redirect="/" />}>
              <Route path="/login" element={<Login />} />
            </Route>
            {/* All Unnessary Routes come under this that return invalid  */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
