import React, { useCallback, useState } from 'react';
import { useFirebase } from '../utils/firebase';
import styled from 'styled-components';
import { Modal } from './Modal';
import Portal from './Portal';

export const Tweet = ({ tweetObj, isOwner }) => {
  const firebase = useFirebase();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

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
          <AuthorRow>
            <DisplayName>Junho Yeo</DisplayName>
            <Metadata>@_junhoyeo · 5h</Metadata>
          </AuthorRow>
          <Paragraph>{tweetObj.text}</Paragraph>
          {tweetObj.attachmentUrl && (
            <ImageContainer>
              <Image src={tweetObj.attachmentUrl} />
            </ImageContainer>
          )}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={() => setDeleteModalOpen(true)}>Trash</span>
            </div>
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

const AuthorRow = styled.span``;
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
  position: relative;
  min-width: 0px;
  line-height: 20px;
  overflow-wrap: break-word;
  color: rgba(217, 217, 217, 1);

  font-weight: 400;
  font-size: 15px;
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
