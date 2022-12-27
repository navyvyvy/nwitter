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

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <div
      style={{
        maxWidth: 890,
        width: "100%",
        margin: "0 auto",
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile/*"
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              />
            </>
          ) : (
            <>
              <Route extract path="/" element={<Auth />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
