import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { AnimatedTweets } from '../components/AnimatedTweets';
import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';
import { Tab } from '../components/Tab';

import { useFirebase } from '../utils/firebase';

type ProfileTab = 'Tweets' | 'Tweets & replies' | 'Media' | 'Likes';
const PROFILE_TABS: ProfileTab[] = [
  'Tweets',
  'Tweets & replies',
  'Media',
  'Likes',
];

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState<ProfileTab>(PROFILE_TABS[0]);
  const [myTweets, setMyTweets] = useState(undefined);

  const firebase = useFirebase();
  const [firestore, auth] = [firebase.firestore(), firebase.auth()];
  const user = auth.currentUser;

  const subtitle = useMemo(() => {
    if (typeof myTweets !== 'undefined') {
      return `${myTweets.length} Tweets`;
    }
    return `@${user.uid}`;
  }, [myTweets, user.uid]);

  useEffect(() => {
    if (!firestore) {
      return;
    }
    firestore
      .collection('tweets')
      .where('creatorId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyTweets(tweetArray);
      });
  }, []);

  return (
    <Layout>
      <NavigationBar title={user.displayName} subtitle={subtitle} />
      <CoverImage src="/images/profile-background.png" />
      <ProfileContainer>
        <ProfileImage src={user.photoURL} />
        <DisplayName>{user.displayName}</DisplayName>
        <Username>{`@${user.uid}`}</Username>
      </ProfileContainer>
      <Tab
        selected={currentTab}
        items={PROFILE_TABS}
        onChangeTab={(tab) => setCurrentTab(tab)}
      />
      {currentTab === 'Tweets' && (
        <AnimatedTweets user={user} tweets={myTweets} />
      )}
    </Layout>
  );
};

export default ProfilePage;

const CoverImage = styled.img`
  width: 100%;
  aspect-ratio: 3;
  object-fit: cover;
`;

const ProfileContainer = styled.div`
  padding: 12px 16px 16px;
`;
const ProfileImage = styled.img`
  margin-top: -18%;
  width: 140px;
  height: 140px;

  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 2px inset;
  background-color: black;
  background-color: black;
`;

const DisplayName = styled.h2`
  margin: 4px 0 0;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  color: rgba(217, 217, 217, 1);
`;
const Username = styled.p`
  margin: 0 0 12px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: rgb(110, 118, 125);
`;
