import React, { useCallback, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import GlobeIcon from '../assets/globe.svg';

import { useFirebase } from '../utils/firebase';

export const CreateTweetForm = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const submitDisabled = useMemo(() => tweet.trim().length === 0, [tweet]);
  const [isDraftInputDirty, setDraftInputDirty] = useState<boolean>(false);

  const [attachment, setAttachment] = useState('');

  const firebase = useFirebase();
  const storage = firebase?.storage();
  const firestore = firebase?.firestore();

  const uploadAttachment = useCallback(
    async (attachment: string) => {
      if (!storage) {
        return;
      }
      const attachmentRef = storage.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      const attachmentUrl = await response.ref.getDownloadURL();
      return attachmentUrl;
    },
    [storage],
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    if (tweet === '') {
      return;
    }
    let attachmentUrl: string | undefined;
    if (attachment !== '') {
      attachmentUrl = await uploadAttachment(attachment);
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl || '',
    };
    await firestore.collection('tweets').add(tweetObj);
    setTweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        // FIXME: proper typing
        // @ts-ignore
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment('');

  return (
    <Form onSubmit={onSubmit}>
      <AvatarContainer>
        <Avatar src="https://github.com/junhoyeo.png" alt="avatar" />
      </AvatarContainer>
      <Content>
        <Input
          value={tweet}
          onChange={onChange}
          onFocus={() => setDraftInputDirty(true)}
          placeholder="What's happening?"
        />
        {isDraftInputDirty && (
          <PublicScopeNudge>
            <BlueGlobe />
            <span>Everyone can reply</span>
          </PublicScopeNudge>
        )}
        <ToolbarContainer>
          <Toolbar>
            {/* <label htmlFor="attach-file">
              <span>Add photos</span>
              Plus
            </label>
            <input
              id="attach-file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{
                opacity: 0,
              }}
            /> */}
          </Toolbar>
          <SubmitButton disabled={submitDisabled}>Tweet</SubmitButton>
        </ToolbarContainer>
        {attachment && (
          <div>
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div onClick={onClearAttachment}>
              <span>Remove</span>
              Times
            </div>
          </div>
        )}
      </Content>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
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

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 2px inset;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled(TextareaAutosize)`
  padding: 14px 0;
  line-height: 24px;
  font-size: 20px;
  font-weight: 400;
  background-color: transparent;
  border: 0;
  color: #d9d9d9;
  width: 100%;
  resize: none;

  &::placeholder {
    color: #6e767d;
  }
`;

const PublicScopeNudge = styled.div`
  padding-top: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(47, 51, 54);

  display: flex;
  align-items: center;

  & > span {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    color: rgb(29, 155, 240);
  }
`;
const BlueGlobe = styled(GlobeIcon)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  fill: rgb(29, 155, 240);
`;

const ToolbarContainer = styled.div`
  width: 100%;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Toolbar = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
  margin-top: 12px;
  margin-left: 12px;
  padding: 0 16px;
  min-width: 36px;
  min-height: 36px;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;

  border-radius: 48px;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgb(29, 155, 240);

  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  color: rgb(255, 255, 255);

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `};
`;
