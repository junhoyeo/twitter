import firebase from 'firebase/app';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CrossIcon from '../assets/cross.svg';
import EmojiIcon from '../assets/emoji.svg';
import GifIcon from '../assets/gif.svg';
import GlobeIcon from '../assets/globe.svg';
import PhotoSelectIcon from '../assets/picture.svg';
import PollIcon from '../assets/poll.svg';
import ScheduleIcon from '../assets/schedule.svg';

import { useFirebase } from '../utils/firebase';

type Props = {
  user: firebase.User;
  onSuccess?: () => void;
};
export const CreateTweetForm: React.FC<Props> = ({ user, ...props }) => {
  const [tweet, setTweet] = useState('');
  const [isDraftInputDirty, setDraftInputDirty] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState('');

  const submitDisabled = useMemo(
    () => tweet.trim().length === 0 && !attachment.length,
    [tweet, attachment],
  );

  const firebase = useFirebase();
  const storage = firebase?.storage();
  const firestore = firebase?.firestore();

  const uploadAttachment = useCallback(
    async (attachment: string) => {
      if (!storage) {
        return;
      }
      const attachmentRef = storage.ref().child(`${user.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      const attachmentUrl = await response.ref.getDownloadURL();
      return attachmentUrl;
    },
    [storage],
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl: string | undefined;
    if (attachment !== '') {
      attachmentUrl = await uploadAttachment(attachment);
    }
    const tweetObj = {
      text: tweet.trim(),
      createdAt: Date.now(),
      creator: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      attachmentUrl: attachmentUrl || '',
    };
    await firestore.collection('tweets').add(tweetObj);
    setTweet('');
    setAttachment('');
    toast('Your tweet was sent.');
    if (props.onSuccess) {
      props.onSuccess();
    }
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
        <Avatar src={user.photoURL} alt="avatar" />
      </AvatarContainer>
      <Content>
        <Input
          value={tweet}
          onChange={onChange}
          onFocus={() => setDraftInputDirty(true)}
          placeholder="What's happening?"
        />
        {attachment && (
          <ImageContainer>
            <Image
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <DeleteButton onClick={onClearAttachment}>
              <CrossIcon />
            </DeleteButton>
          </ImageContainer>
        )}
        {isDraftInputDirty && (
          <PublicScopeNudge>
            <BlueGlobe />
            <span>Everyone can reply</span>
          </PublicScopeNudge>
        )}
        <ToolbarContainer>
          <Toolbar>
            <input
              ref={fileInputRef}
              type="file"
              onChange={onFileChange}
              style={{ display: 'none' }}
            />
            <PhotoSelectIcon onClick={() => fileInputRef?.current.click()} />
            <GifIcon />
            <PollIcon />
            <EmojiIcon />
            <ScheduleIcon />
          </Toolbar>
          <SubmitButton disabled={submitDisabled}>Tweet</SubmitButton>
        </ToolbarContainer>
      </Content>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 12px 16px;
  display: flex;
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
  background-color: black;

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

  & > svg {
    fill: rgb(29, 155, 240);
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:not(:first-of-type) {
      margin-left: 16px;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
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

const ImageContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  border-radius: 16px;
  aspect-ratio: 1.77;
  position: relative;
  overflow: hidden;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  backdrop-filter: blur(4px);
  top: 4px;
  left: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(15, 20, 25, 0.75);
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(39, 44, 48, 0.75);
  }

  & > svg {
    width: 18px;
    height: 18px;
    fill: white;
  }
`;
