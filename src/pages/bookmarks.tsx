import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useMemo } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';

import { AnimatedTweets } from '../components/AnimatedTweets';
import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';

import { useFirebase } from '../utils/firebase';

import { bookmarksAtom } from '../recoil/bookmarks';

const BookmarksPage = () => {
  const bookmarks = useRecoilValueLoadable(bookmarksAtom);

  const auth = useFirebase('auth');
  const user = auth.currentUser;

  const subtitle = useMemo(() => {
    if (user === null) {
      return undefined;
    }
    return `@${user.uid}`;
  }, []);

  return (
    <Layout>
      <Head>
        <title>Bookmarks / Twitter</title>
      </Head>
      <NavigationBar title="Bookmarks" subtitle={subtitle} />
      {bookmarks.state !== 'loading' && bookmarks.contents.length === 0 && (
        <EmptyMessage />
      )}
      <AnimatedTweets user={user} tweets={bookmarks.contents} />
    </Layout>
  );
};

export default BookmarksPage;

const _EmptyMessage = () => (
  <EmptyMessageContainer>
    <EmptyTitle>You haven’t added any Tweets to your Bookmarks yet</EmptyTitle>
    <EmptyDescription>When you do, they’ll show up here.</EmptyDescription>
  </EmptyMessageContainer>
);
const EmptyMessage = dynamic(async () => _EmptyMessage, { ssr: false });

const EmptyMessageContainer = styled.div`
  margin: 32px auto;
  padding: 0 32px;
  max-width: 400px;

  display: flex;
  flex-direction: column;
`;
const EmptyTitle = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  line-height: 36px;
  font-size: 31px;
  font-weight: 800;
  color: rgba(217, 217, 217, 1);
`;
const EmptyDescription = styled.p`
  margin: 0;
  margin-bottom: 28px;
  color: rgb(110, 118, 125);
  font-size: 15px;
  line-height: 20px;
`;
