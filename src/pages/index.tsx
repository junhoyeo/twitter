import React, { useState, useEffect } from 'react';

import { Tweet } from '../components/Tweet';
import { CreateTweetForm } from '../components/CreateTweetForm';
import { useFirebase } from '../utils/firebase';
import { MobileContainer } from '../components/MobileContainer';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { ActivityIndicator } from '../components/ActivityIndicator';

const Home = () => {
  const [tweets, setTweets] = useState(undefined);
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
      <AnimatePresence>
        {typeof tweets === 'undefined' && <ActivityIndicator />}
        {tweets?.map((tweet) => (
          <AnimatedListItem
            key={tweet.id}
            initial={{ opacity: 0, transform: 'translate3d(0, 64px, 0)' }}
            animate={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
            exit={{ opacity: 0, transform: 'translate3d(0, -100px, 0)' }}
            transition={{ ease: 'linear' }}
          >
            <Tweet tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </MobileContainer>
  );
};

export default Home;

const AnimatedListItem = styled(motion.li)`
  list-style-type: none;
`;
