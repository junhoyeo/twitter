import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ActivityIndicator } from '../../components/ActivityIndicator';
import { AnimatedTweets } from '../../components/AnimatedTweets';
import { Layout } from '../../components/Layout';
import { NavigationBar } from '../../components/NavigationBar';
import { LargeTweet } from '../../components/Tweet/LargeTweet';
import { useTweets } from '../../hooks/useTweets';
import { useFirebase } from '../../utils/firebase';

const TweetPage = () => {
  const router = useRouter();
  const [tweet, setTweet] = useState(undefined);
  const firebase = useFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;

  const moreTweets = useTweets();

  useEffect(() => {
    if (!firestore || !router.query.id) {
      return;
    }
    const tweetId = router.query.id as string;
    firestore
      .collection('tweets')
      .doc(tweetId)
      .get()
      .then((snapshot) => setTweet(snapshot.data()));
  }, [router.query.id]);

  return (
    <Layout>
      <NavigationBar title="Tweet" />
      {typeof tweet !== 'undefined' ? (
        <LargeTweet
          tweetObj={{ ...tweet, id: router.query.id }}
          isOwner={tweet.creator.uid === user.uid}
        />
      ) : (
        <ActivityIndicatorContainer>
          <ActivityIndicator />
        </ActivityIndicatorContainer>
      )}
      <Heading>More Tweets</Heading>
      <AnimatedTweets user={user} tweets={moreTweets} />
    </Layout>
  );
};

export default TweetPage;

const Heading = styled.h2`
  margin: 0;
  padding: 12px 16px;
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
`;

const ActivityIndicatorContainer = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
