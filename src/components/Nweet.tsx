import React, { useState } from 'react';
import { useFirebase } from '../utils/firebase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const firebase = useFirebase();
  const firestore = firebase?.firestore();
  const storage = firebase?.storage();

  const onDeleteClick = async () => {
    if (!firebase) {
      return;
    }
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await firestore.doc(`nweets/${nweetObj.id}`).delete();
      await storage.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    if (!firestore) {
      return;
    }
    event.preventDefault();
    await firestore.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>Trash</span>
              <span onClick={toggleEditing}>Edit</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
