import * as DateFns from 'date-fns';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import AddBookmarkIcon from '../../assets/add-bookmark.svg';
import HeartOutlineIcon from '../../assets/heart-outline.svg';
import HeartFilledIcon from '../../assets/heart-solid.svg';
import LinkIcon from '../../assets/link.svg';
import TrashIcon from '../../assets/trash.svg';
import { bookmarksAtom } from '../../recoil/bookmarks';
import { copyToClipboard } from '../../utils/clipboard';
import { useFirebase } from '../../utils/firebase';
import { MenuItem } from '../MenuItem';
import { Modal } from '../Modal';
import Portal from '../Portal';
import { ActionCircle, ActionItem } from './Actions';
import { ExportButton } from './ExportButton';
import { MoreButton } from './MoreButton';
import { RetweetButton } from './RetweetButton';
import { useDelete } from './useDelete';

export const LargeTweet = ({ tweetObj, isOwner }) => {
  const firebase = useFirebase();
  const user = firebase.auth().currentUser;

  const [heartAnimationState, setHeartAnimationState] = useState<
    'UNDETERMINED' | 'ANIMATED' | 'LIKED'
  >(!tweetObj.likes?.includes(user?.uid) ? 'UNDETERMINED' : 'LIKED');
  const [likes, setLikes] = useState<number>(tweetObj.likes?.length);

  const [bookmarks, setBookmarks] = useRecoilState(bookmarksAtom);
  const isBookmarked =
    bookmarks.findIndex((bookmarked) => bookmarked.id === tweetObj.id) !== -1;

  const onClickLike = useCallback(() => {
    const isUndetermined = heartAnimationState === 'UNDETERMINED';
    setHeartAnimationState(!isUndetermined ? 'UNDETERMINED' : 'ANIMATED');
    if (isUndetermined) {
      firebase
        .firestore()
        .collection('tweets')
        .doc(tweetObj.id)
        .update({
          likes: [...(tweetObj.likes || []), user.uid],
        });
      setLikes((likes) => likes + 1);
      setBookmarks((bookmarksToUpdate) =>
        bookmarksToUpdate.map((bookmarkedTweet) =>
          bookmarkedTweet.id !== tweetObj.id
            ? bookmarkedTweet
            : {
                ...bookmarkedTweet,
                likes: [...(bookmarkedTweet.likes || []), user.uid],
              },
        ),
      );
      setTimeout(() => setHeartAnimationState('LIKED'), 500);
    } else {
      firebase
        .firestore()
        .collection('tweets')
        .doc(tweetObj.id)
        .update({
          likes: tweetObj.likes?.filter((userId) => userId !== user.uid) || [],
        });
      setLikes((likes) => likes - 1);
      setBookmarks((bookmarksToUpdate) =>
        bookmarksToUpdate.map((bookmarkedTweet) =>
          bookmarkedTweet.id !== tweetObj.id
            ? bookmarkedTweet
            : {
                ...bookmarkedTweet,
                likes:
                  bookmarkedTweet.likes?.filter(
                    (userId) => userId !== user.uid,
                  ) || [],
              },
        ),
      );
    }
  }, [tweetObj]);

  const firestore = firebase.firestore();
  const onClickRetweet = async () => {
    const retweet = {
      type: 'RETWEET',
      createdAt: Date.now(),
      creator: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      parent: tweetObj,
    };
    await firestore.collection('tweets').add(retweet);
    toast('This tweet was retweeted.');
  };
  const { isDeleteModalOpen, setDeleteModalOpen, onClickDelete } =
    useDelete(tweetObj);

  const createdAt = useMemo(() => {
    if (!tweetObj || !tweetObj) {
      return undefined;
    }
    const createdTime = new Date(tweetObj.createdAt);

    const formattedTime = DateFns.format(createdTime, 'h:mm a');
    const formattedDate = DateFns.format(createdTime, 'MMM d, yyyy');
    return `${formattedTime} · ${formattedDate}`;
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Profile>
          <Link href={`/user/${tweetObj.creator?.uid}`}>
            <Avatar src={tweetObj.creator?.photoURL} alt="avatar" />
          </Link>
          <ProfileText>
            <Link href={`/user/${tweetObj.creator?.uid}`}>
              <DisplayName>{tweetObj.creator?.displayName}</DisplayName>
            </Link>
            <UsernameContainer>
              <Link href={`/user/${tweetObj.creator?.uid}`}>
                <Username>{`@${tweetObj.creator?.uid}`}</Username>
              </Link>
            </UsernameContainer>
          </ProfileText>
          {isOwner && (
            <MoreButton>
              <MenuItem
                icon={<TrashIcon />}
                title="Delete"
                destructive
                onClick={() => setDeleteModalOpen(true)}
              />
            </MoreButton>
          )}
        </Profile>
        <Content>
          <Paragraph>{tweetObj.text}</Paragraph>
          {tweetObj.attachmentUrl && (
            <ImageContainer>
              <Image src={tweetObj.attachmentUrl} />
            </ImageContainer>
          )}
          <Metadata>{createdAt} · Twitter for iPhone</Metadata>
          <Actions>
            <Likes>
              <ActionCircle className="heart-circle">
                <HeartContainer onClick={onClickLike}>
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
              </ActionCircle>
              <LikeCount
                className="like-count"
                liked={heartAnimationState !== 'UNDETERMINED'}
              >
                {likes || 0}
              </LikeCount>
            </Likes>
            <RetweetButton onClick={onClickRetweet} />
            <ExportButton>
              <MenuItem
                icon={<AddBookmarkIcon />}
                title={
                  !isBookmarked
                    ? 'Add Tweet to Bookmarks'
                    : 'Remove Tweet from Bookmarks'
                }
                onClick={() => {
                  !isBookmarked
                    ? setBookmarks([...bookmarks, tweetObj])
                    : setBookmarks(
                        bookmarks.filter(
                          (bookmarkedTweet) =>
                            bookmarkedTweet.id !== tweetObj.id,
                        ),
                      );
                }}
              />
              <MenuItem
                icon={<LinkIcon />}
                title="Copy link to Tweet"
                onClick={() => {
                  copyToClipboard(`${location.origin}/tweet/${tweetObj.id}`);
                }}
              />
            </ExportButton>
          </Actions>
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

const _Container = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(47, 51, 54);
`;
const Container = dynamic(async () => _Container, { ssr: false });
const Profile = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-right: 12px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 2px inset;
  background-color: black;
`;

const ProfileText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const DisplayName = styled.span`
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;

  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  color: rgba(217, 217, 217, 1);
`;
const UsernameContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(110, 118, 125);
`;
const Username = styled.span`
  cursor: pointer;

  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: rgb(110, 118, 125);

  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Paragraph = styled.p`
  margin: 0;
  margin-top: 12px;
  margin-right: 20px;
  position: relative;
  min-width: 0px;
  overflow-wrap: break-word;
  white-space: break-spaces;

  user-select: text;
  font-weight: 400;
  font-size: 23px;
  line-height: 28px;
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
  background-color: black;
`;

const Metadata = styled.div`
  margin: 16px 0;
  font-size: 15px;
  font-weight: 400px;
  line-height: 20px;
  color: rgb(110, 118, 125);
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgb(47, 51, 54);
  border-bottom: 1px solid rgb(47, 51, 54);
  height: 48px;

  & > div {
    width: 25%;
  }
`;
const Likes = styled(ActionItem)`
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

const HeartContainer = styled.div`
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
