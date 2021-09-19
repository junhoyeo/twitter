import React, { useCallback, useEffect, useState } from 'react';
import { useFirebase } from '../utils/firebase';
import styled, { css } from 'styled-components';
import { Modal } from './Modal';
import Portal from './Portal';
import HeartOutlineIcon from '../assets/heart-outline.svg';
import HeartFilledIcon from '../assets/heart-filled.svg';
import { motion } from 'framer-motion';
import { MoreButton } from './MoreButton';
import TrashIcon from '../assets/trash.svg';
import { MenuItem } from './MenuItem';
import { firestore } from 'firebase';

export const Tweet = ({ tweetObj, isOwner }) => {
  const firebase = useFirebase();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [heartAnimationState, setHeartAnimationState] = useState<
    'UNDETERMINED' | 'ANIMATED' | 'LIKED'
  >(!tweetObj.likes?.includes('test') ? 'UNDETERMINED' : 'LIKED');

  const onClickDelete = useCallback(async () => {
    if (!firebase) {
      return;
    }

    setDeleteModalOpen(false);
    setTimeout(() => {
      firebase.firestore().doc(`tweets/${tweetObj.id}`).delete();
      firebase.storage().refFromURL(tweetObj.attachmentUrl).delete();
    }, 200);
  }, []);

  return (
    <React.Fragment>
      <Container>
        <AvatarContainer>
          <Avatar src="https://github.com/junhoyeo.png" alt="avatar" />
        </AvatarContainer>
        <Content>
          <TopRow>
            <span>
              <DisplayName>Junho Yeo</DisplayName>
              <Metadata>@_junhoyeo · 5h</Metadata>
            </span>
            <MoreButton>
              <MenuItem
                icon={<TrashIcon />}
                title="Delete"
                destructive
                onClick={() => setDeleteModalOpen(true)}
              />
            </MoreButton>
          </TopRow>
          <Paragraph>{tweetObj.text}</Paragraph>
          {tweetObj.attachmentUrl && (
            <ImageContainer>
              <Image src={tweetObj.attachmentUrl} />
            </ImageContainer>
          )}
          {isOwner && (
            <Actions>
              <Likes>
                <HeartCircle className="heart-circle">
                  <HeartContainer
                    onClick={() => {
                      const isUndetermined =
                        heartAnimationState === 'UNDETERMINED';
                      setHeartAnimationState(
                        !isUndetermined ? 'UNDETERMINED' : 'ANIMATED',
                      );
                      if (isUndetermined) {
                        firebase
                          .firestore()
                          .collection('tweets')
                          .doc(tweetObj.id)
                          .update({
                            likes: [...(tweetObj.likes || []), 'test'],
                          });
                        setTimeout(() => setHeartAnimationState('LIKED'), 500);
                      } else {
                        firebase
                          .firestore()
                          .collection('tweets')
                          .doc(tweetObj.id)
                          .update({
                            likes:
                              tweetObj.likes?.filter(
                                (userId) => userId !== 'test',
                              ) || [],
                          });
                      }
                    }}
                  >
                    <HeartCenter>
                      {heartAnimationState === 'UNDETERMINED' ? (
                        <HeartOutline className="heart-outline" />
                      ) : heartAnimationState === 'ANIMATED' ? (
                        <HeartAnimation />
                      ) : (
                        <HeartFilled />
                      )}
                    </HeartCenter>
                  </HeartContainer>
                </HeartCircle>
                <LikeCount
                  className="like-count"
                  liked={heartAnimationState !== 'UNDETERMINED'}
                >
                  {tweetObj.likes?.length || 0}
                </LikeCount>
              </Likes>
            </Actions>
          )}
        </Content>
      </Container>
      <Portal>
        <Modal
          isShown={isDeleteModalOpen}
          onDismiss={() => setDeleteModalOpen(false)}
          title="Delete Tweet?"
          description="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results."
          buttons={[
            { title: 'Delete', onClick: onClickDelete, destructive: true },
            { title: 'Cancel', onClick: () => setDeleteModalOpen(false) },
          ]}
        />
      </Portal>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  border-top: 1px solid rgb(47, 51, 54);

  &:last-of-type {
    border-bottom: 1px solid rgb(47, 51, 54);
  }
`;

const AvatarContainer = styled.div`
  margin-right: 12px;
  display: flex;
  flex-basis: 48px;
  flex-grow: 0;
`;
const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 2px inset;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DisplayName = styled.span`
  white-space: nowrap;
  line-height: 20px;
  min-width: 0px;
  color: rgba(217, 217, 217, 1);

  font-weight: 700;
  font-size: 15px;
`;
const Metadata = styled.span`
  margin-left: 4px;
  color: rgb(110, 118, 125);
  line-height: 20px;
  overflow-wrap: break-word;
  min-width: 0px;

  font-weight: 400;
  font-size: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Paragraph = styled.p`
  margin: 0;
  margin-right: 20px;
  position: relative;
  min-width: 0px;
  overflow-wrap: break-word;

  user-select: text;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: rgba(217, 217, 217, 1);
`;
const ImageContainer = styled.div`
  margin-top: 12px;
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  border-radius: 16px;
  border: 1px solid rgb(47, 51, 54);
  overflow: hidden;
  width: 100%;
  padding-bottom: 56.2061%;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  object-position: center;
`;

const Actions = styled.div``;
const Likes = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  &:hover {
    & > .heart-circle {
      background-color: rgba(249, 24, 128, 0.1);
    }

    & .heart-outline {
      fill: rgb(249, 24, 128);
    }

    & .like-count {
      color: rgb(249, 24, 128);
    }
  }
`;

type LikeCountProps = {
  liked?: boolean;
};
const LikeCount = styled.span<LikeCountProps>`
  margin-left: 4.65px;
  margin-right: 12px;
  margin-top: 2px;

  font-size: 13px;
  line-height: 16px;
  color: rgb(110, 118, 125);

  ${({ liked }) =>
    liked &&
    css`
      color: rgb(249, 24, 128);
    `};
`;

const HeartCircle = styled.div`
  width: 34.75px;
  height: 34.75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
`;
const HeartContainer = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: relative;
`;
const HeartCenter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

// Based on https://codepen.io/chrismabry/pen/ZbjZEj
const HEART_ANIMATION_FRAMES = 23;
const HEART_ANIMATION_SIZE = 52;

const HeartAnimation = styled(motion.div).attrs({
  initial: { backgroundPosition: 'left' },
  animate: { backgroundPosition: 'right' },
  transition: { duration: 0 },
})`
  display: flex;
  min-width: ${HEART_ANIMATION_SIZE}px;
  width: ${HEART_ANIMATION_SIZE}px;
  height: ${HEART_ANIMATION_SIZE}px;

  background: url('/images/heart-animation.png');
  background-repeat: no-repeat;
  background-size: ${HEART_ANIMATION_FRAMES * 100}%;
  transition: background-position 1s steps(${HEART_ANIMATION_FRAMES - 1});
`;
const HeartOutline = styled(HeartOutlineIcon)`
  fill: rgb(110, 118, 125);
  width: 20px;
  height: 20px;
`;
const HeartFilled = styled(HeartFilledIcon)`
  fill: rgb(249, 24, 128);
  width: 20px;
  height: 20px;
`;
