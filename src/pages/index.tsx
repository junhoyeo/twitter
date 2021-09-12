import React, { useState, useEffect } from 'react';

import { Tweet } from '../components/Tweet';
import { CreateTweetForm } from '../components/CreateTweetForm';
import { useFirebase } from '../utils/firebase';
import { MobileContainer } from '../components/MobileContainer';

const Home = () => {
  const [tweets, setTweets] = useState([]);
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
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);
  return (
    <MobileContainer>
      <CreateTweetForm userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </MobileContainer>
  );
};

export default Home;
