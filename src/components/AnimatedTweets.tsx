import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { ActivityIndicator } from './ActivityIndicator';
import { Tweet } from './Tweet';
import { Retweet } from './Tweet/Retweet';

type Props = {
  user: any;
  tweets: any[];
};

export const AnimatedTweets: React.FC<Props> = ({ user, tweets }) => {
  const animatedTweetRefs = useRef<HTMLLIElement[]>([]);

  return (
    <React.Fragment>
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
              {tweet.type === 'RETWEET' ? (
                <Retweet
                  retweetObject={tweet}
                  isOwner={tweet.creator.uid === user?.uid}
                />
              ) : (
                <Tweet
                  tweetObj={tweet}
                  isOwner={tweet.creator.uid === user?.uid}
                />
              )}
            </AnimatedListItem>
          );
        })}
      </AnimatePresence>
      <BottomGap />
    </React.Fragment>
  );
};

const AnimatedListItem = styled(motion.li)`
  list-style-type: none;
`;

const BottomGap = styled.div`
  width: 100%;
  height: 100px;
`;
