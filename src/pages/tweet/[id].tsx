import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ActivityIndicator } from '../../components/ActivityIndicator';
import { Layout } from '../../components/Layout';
import { NavigationBar } from '../../components/NavigationBar';
import { LargeTweet } from '../../components/Tweet/LargeTweet';
import { useFirebase } from '../../utils/firebase';

const TweetPage = () => {
  const router = useRouter();
  const [tweet, setTweet] = useState(undefined);
  const firebase = useFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;

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
        <LargeTweet tweetObj={tweet} isOwner={tweet.creator.id === user.uid} />
      ) : (
        <ActivityIndicator />
      )}
    </Layout>
  );
};

export default TweetPage;
