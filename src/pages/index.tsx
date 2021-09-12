import React, { useState, useEffect } from 'react';

import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';
import { useFirebase } from '../utils/firebase';

const Home = () => {
  const [nweets, setNweets] = useState([]);
  const firestore = useFirebase('firestore');
  const userObj = {
    displayName: 'Junho Yeo',
    uid: 'test',
  };

  useEffect(() => {
    if (!firestore) {
      return;
    }
    firestore
      .collection('nweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
