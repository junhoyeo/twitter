import React from 'react';
import { useFirebase } from '../utils/firebase';
import styled from 'styled-components';

export const Tweet = ({ tweetObj, isOwner }) => {
  const firebase = useFirebase();
  const firestore = firebase?.firestore();
  const storage = firebase?.storage();

  const onDeleteClick = async () => {
    if (!firebase) {
      return;
    }
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (ok) {
      await firestore.doc(`tweets/${tweetObj.id}`).delete();
      await storage.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

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
              <span onClick={onDeleteClick}>Trash</span>
            </div>
          )}
        </Content>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  border-top: 1px solid rgb(47, 51, 54);
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

  outline-style: none;
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
  font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif;
`;
const Metadata = styled.span`
  margin-left: 4px;
  color: rgb(110, 118, 125);
  line-height: 20px;
  overflow-wrap: break-word;
  min-width: 0px;

  font-weight: 400;
  font-size: 15px;
  font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif;
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
  font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif;
`;
const ImageContainer = styled.div`
  margin-top: 12px;
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  border-radius: 16px;
  border: 1px solid rgb(47, 51, 54);
  overflow: hidden;
  outline-style: none;
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
