import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFirebase } from '../utils/firebase';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
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
    if (nweet === '') {
      return;
    }
    let attachmentUrl: string | undefined;
    if (attachment !== '') {
      attachmentUrl = await uploadAttachment(attachment);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl || '',
    };
    await firestore.collection('nweets').add(nweetObj);
    setNweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
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
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            Times
          </div>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
