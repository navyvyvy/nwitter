import React from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile/*" element={<Profile />} />
          </>
        ) : (
          <Route extract path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;