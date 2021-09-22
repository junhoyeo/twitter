import { useEffect, useState } from 'react';

import { useFirebase } from '../utils/firebase';

export const useTweets = () => {
  const [tweets, setTweets] = useState(undefined);

  const firestore = useFirebase('firestore');

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

  return tweets;
};
