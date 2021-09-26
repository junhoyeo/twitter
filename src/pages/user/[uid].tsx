import * as DateFns from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import CalendarIcon from '../../assets/calendar.svg';
import { AnimatedTweets } from '../../components/AnimatedTweets';
import { Layout } from '../../components/Layout';
import { NavigationBar } from '../../components/NavigationBar';
import { Tab } from '../../components/Tab';
import { useFirebase } from '../../utils/firebase';

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
  const [firestore] = [firebase.firestore(), firebase.auth()];

  const router = useRouter();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (!firestore || !router.query.uid) {
      return;
    }
    const userId = router.query.uid as string;
    firestore
      .collection('users')
      .doc(userId)
      .get()
      .then((snapshot) => setUser(snapshot.data()));
  }, [router.query.uid]);

  const subtitle = useMemo(() => {
    if (typeof myTweets !== 'undefined') {
      return `${myTweets.length} Tweets`;
    }
    if (!user) {
      return undefined;
    }
    return `@${user.uid}`;
  }, [myTweets, user]);

  useEffect(() => {
    if (!firestore || !user || !user.uid) {
      return;
    }
    firestore
      .collection('tweets')
      .where('creator.uid', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyTweets(tweetArray);
      });
  }, [user]);

  const joinedAt = useMemo(() => {
    if (!user || !user.joinedAt) {
      return undefined;
    }
    const createdTime = new Date(user.joinedAt);
    return `Joined ${DateFns.format(createdTime, 'MMMM yyyy')}`;
  }, [user]);

  return (
    <Layout>
      <NavigationBar title={user?.displayName} subtitle={subtitle} />
      <CoverImage src="/images/profile-background.png" />
      <ProfileContainer>
        <ProfileImage src={user?.photoURL} />
        <DisplayName>{user?.displayName}</DisplayName>
        <Username>{`@${user?.uid}`}</Username>
        <UserMetadata>
          <CreatedAt>
            <CalendarIcon />
            {joinedAt}
          </CreatedAt>
        </UserMetadata>
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
const UserMetadata = styled.div`
  margin-bottom: 12px;
`;
const CreatedAt = styled.span`
  font-size: 15px;
  font-weight: 400;
  line-height: 12px;
  color: rgb(110, 118, 125);

  display: flex;
  align-items: center;

  & > svg {
    margin-right: 4px;
    width: 18.75px;
    height: 18.75px;
    fill: rgb(110, 118, 125);
  }
`;
