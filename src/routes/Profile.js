import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onClickSignOut = () => {
    authService.signOut();
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
      await authService.updateUserProfile(userObj, {
        displayName: newDisplayName,
      });
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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <br />
      <button onClick={onClickSignOut}>Sign Out</button>
    </>
  );
};

export default Profile;
