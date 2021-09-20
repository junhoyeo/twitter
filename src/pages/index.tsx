import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ShineOutlineIcon from '../assets/shine-outline.svg';

import { ActivityIndicator } from '../components/ActivityIndicator';
import { CreateTweetForm } from '../components/CreateTweetForm';
import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';
import { Tweet } from '../components/Tweet';

import { useFirebase } from '../utils/firebase';

const Home = () => {
  const [tweets, setTweets] = useState(undefined);
  const firestore = useFirebase('firestore');
  const userObj = {
    displayName: 'Junho Yeo',
    uid: 'test',
  };

  const animatedTweetRefs = useRef<HTMLLIElement[]>([]);

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
    <Layout>
      <NavigationBar title="Home">
        <ShineButton>
          <ShineIcon />
        </ShineButton>
      </NavigationBar>
      <FormWrapper>
        <CreateTweetForm userObj={userObj} />
      </FormWrapper>
      <AnimatePresence>
        {typeof tweets === 'undefined' && <ActivityIndicator />}
        {tweets?.map((tweet, index: number) => {
          return (
            <AnimatedListItem
              key={tweet.id}
              ref={(ref) => {
                animatedTweetRefs.current[index] = ref;
              }}
              initial={{
                opacity: 0,
                transform: 'translate3d(0, 64px, 0)',
              }}
              animate={{
                opacity: 1,
                transform: 'translate3d(0, 0px, 0)',
              }}
              exit={{
                opacity: 0,
                transform: 'translate3d(0, -100px, 0)',
              }}
              transition={{ ease: 'linear' }}
              onAnimationComplete={() => {
                setTimeout(() =>
                  animatedTweetRefs.current.map((element) => {
                    if (!element) {
                      return;
                    }
                    element.style.transform = 'none';
                  }),
                );
              }}
            >
              <Tweet
                tweetObj={tweet}
                isOwner={tweet.creatorId === userObj.uid}
              />
            </AnimatedListItem>
          );
        })}
      </AnimatePresence>
      <BottomGap />
    </Layout>
  );
};

export default Home;

const ShineButton = styled.div`
  margin-right: -7px;
  width: 32px;
  height: 32px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShineIcon = styled(ShineOutlineIcon)`
  fill: rgb(239, 243, 244);
  width: 20px;
  height: 20px;
`;

const FormWrapper = styled.div`
  border-bottom: 1px solid rgb(47, 51, 54);
`;

const AnimatedListItem = styled(motion.li)`
  list-style-type: none;
`;

const BottomGap = styled.div`
  width: 100%;
  height: 100px;
`;
