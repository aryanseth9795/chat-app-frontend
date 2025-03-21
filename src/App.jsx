import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { LayoutLoader } from "./components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { userexist, userNotexist } from "./Redux/slices/AuthSlice";
import serverUrl from "./constants/config";
import axios from "axios";
import { SocketProvider } from "./socket";
import { setNotificationCount } from "./Redux/slices/ChatSlice";


// Importing all lazy Components
const Home = lazy(() => import("./pages/Home/Home"));
const NotFound = lazy(() => import("./pages/Not Found/NotFound"));
const Login = lazy(() => import("./pages/Login/Login"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const Group = lazy(() => import("./pages/Group/Group"));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  const fetchfunc = async () => {
    try {
      const userdetail = await axios.get(`${serverUrl}/users/me`, {
        withCredentials: true,
      });

      dispatch(userexist(userdetail?.data?.user));
      dispatch(setNotificationCount(userdetail?.data?.user?.notificationCount));
    } catch (error) {
      dispatch(userNotexist());
    }
  };

  // Auto Reloading
  useEffect(() => {
    if (!user?.name) {
      fetchfunc();
    }
  }, [user]);

  return (
    <>
      <Router>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <ProtectedRoute user={user} />
                </SocketProvider>
              }
            >
              {/* All Protected ROutes come under this section */}
              <Route path="/" element={<Home />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/groups" element={<Group />} />
            </Route>
            {/* // Now for login route */}
            <Route element={<ProtectedRoute user={!user} Redirect="/" />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* All Admin Routes Come here */}

            {/* All Unnessary Routes come under this that return invalid  */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
