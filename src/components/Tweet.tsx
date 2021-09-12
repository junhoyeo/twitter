import React, { useState } from 'react';
import { useFirebase } from '../utils/firebase';

export const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
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
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    if (!firestore) {
      return;
    }
    event.preventDefault();
    await firestore.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div className="tweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Tweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={onDeleteClick}>Trash</span>
              <span onClick={toggleEditing}>Edit</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
