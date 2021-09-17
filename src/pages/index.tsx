import React, { useState, useEffect } from 'react';

import { Tweet } from '../components/Tweet';
import { CreateTweetForm } from '../components/CreateTweetForm';
import { useFirebase } from '../utils/firebase';
import { MobileContainer } from '../components/MobileContainer';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { NavigationBar } from '../components/NavigationBar';

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
    <Container>
      <NavigationBar title="Home" />
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
      <BottomGap />
    </Container>
  );
};

export default Home;

const Container = styled(MobileContainer)`
  min-height: 100vh;

  & > div.container {
    max-width: 600px;
    border-left: 1px solid rgb(47, 51, 54);
    border-right: 1px solid rgb(47, 51, 54);
  }
`;

const AnimatedListItem = styled(motion.li)`
  list-style-type: none;
`;

const BottomGap = styled.div`
  width: 100%;
  height: 100px;
`;
