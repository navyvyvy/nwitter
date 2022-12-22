import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onClickSignOut = () => {
    authService.signOut();
    //    navigate("/", { replace: true });
  };

  return (
    <>
      Profile
      <br />
      <button onClick={onClickSignOut}>Sign Out</button>
    </>
  );
};

export default Profile;
