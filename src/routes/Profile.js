import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onClickSignOut = () => {
    authService.signOut();
    refreshUser();
    //    navigate("/", { replace: true });
  };

  const getMyNweets = async () => {
    const data = await dbService.gets(userObj.uid);
    console.log(data);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await authService.updateUserProfile(authService.auth.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Display name"
            value={newDisplayName}
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{ marginTop: 10 }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onClickSignOut}>
          Log Out
        </span>
      </div>
    </>
  );
};

export default Profile;
