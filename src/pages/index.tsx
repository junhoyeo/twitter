import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ShineOutlineIcon from '../assets/shine-outline.svg';

import { AnimatedTweets } from '../components/AnimatedTweets';
import { CreateTweetForm } from '../components/CreateTweetForm';
import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';

import { useFirebase } from '../utils/firebase';

const Home = () => {
  const [tweets, setTweets] = useState(undefined);

  const firebase = useFirebase();
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const user = auth.currentUser;

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
      <FormWrapper>{user && <CreateTweetForm user={user} />}</FormWrapper>
      <AnimatedTweets user={user} tweets={tweets} />
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
