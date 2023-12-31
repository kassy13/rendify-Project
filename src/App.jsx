import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./custom css/Toastify-custom.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import { AuthProvider } from "./utils/AuthContext";
import PrivateRoutes from "./utils/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./404/NotFound";
import { Explore } from "./components/Events/Explore";
import { EventContextProvider } from "./utils/EventContextProvider";
import EventDetails from "./components/Events/EventDetails";
import { AuthContexProvider } from "./utils/AuthContext";
import Verification from "./components/Verification";
import Rsvp from "./components/Events/Rsvp";
import AddedEvents from "./components/Events/AddedEvents";
// import Conference from "./Categories/Conference";
import Payment from "./components/Events/Payment";
import Profile from "./components/Profile";
import EditEvent from "./components/Events/EditEvent";
import UpdateEvent from "./components/Events/UpdateEvent";

function App() {
  return (
    <section>
      <BrowserRouter>
        <AuthContexProvider>
          <Routes>
            {/* Public Routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            <Route
              path="/explore"
              element={
                <EventContextProvider>
                  <Explore />
                </EventContextProvider>
              }
            />
            <Route
              path="/explore/:id"
              element={
                <EventContextProvider>
                  <Explore />
                </EventContextProvider>
              }
            />

            <Route
              path="/eventDetails/:id"
              element={
                <EventContextProvider>
                  <EventDetails />
                </EventContextProvider>
              }
            ></Route>

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/verification" element={<Verification />} />
              <Route path="/profile" element={<Profile />} />

              <Route
                path="/rsvp"
                element={
                  <EventContextProvider>
                    <Rsvp />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/dashboard/rsvp"
                element={
                  <EventContextProvider>
                    <Rsvp />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/payment"
                element={
                  <EventContextProvider>
                    <Payment />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/addevents"
                element={
                  <EventContextProvider>
                    <AddedEvents />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/dashboard/addevents"
                element={
                  <EventContextProvider>
                    <AddedEvents />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/editevents"
                element={
                  <EventContextProvider>
                    <EditEvent />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/edit-event/:eventId"
                element={
                  <EventContextProvider>
                    <EditEvent />
                  </EventContextProvider>
                }
              ></Route>
              <Route
                path="/dashboard/updateevent"
                element={
                  <EventContextProvider>
                    <UpdateEvent />
                  </EventContextProvider>
                }
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />
        </AuthContexProvider>
      </BrowserRouter>
    </section>
  );
}

export default App;
