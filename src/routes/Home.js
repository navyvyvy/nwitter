import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.onSnapshot((snapshot) => {
      setNweets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.add(nweet, userObj.uid);
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
