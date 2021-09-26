import * as DateFns from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import CalendarIcon from '../assets/calendar.svg';

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
  const firebase = useFirebase();
  const [firestore, auth] = [firebase.firestore(), firebase.auth()];
  const user = auth.currentUser;

  const router = useRouter();
  useEffect(() => {
    if (!firestore) {
      return;
    }
    if (!user) {
      router.replace('/landing');
      return;
    }
    router.replace(`/user/${user.uid}`);
  }, []);

  return null;
};

export default ProfilePage;
