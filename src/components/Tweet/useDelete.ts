import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { bookmarksAtom } from '../../recoil/bookmarks';
import { useFirebase } from '../../utils/firebase';

export const useDelete = (tweetObj) => {
  const firebase = useFirebase();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const setBookmarks = useSetRecoilState(bookmarksAtom);

  const onClickDelete = useCallback(async () => {
    if (!firebase) {
      return;
    }

    setDeleteModalOpen(false);
    setTimeout(() => {
      setBookmarks((bookmarksToUpdate) =>
        bookmarksToUpdate.filter(
          (bookmarkedTweet) => bookmarkedTweet.id !== tweetObj.id,
        ),
      );
      firebase
        .firestore()
        .doc(`tweets/${tweetObj.id}`)
        .delete()
        .catch(() => {});

      if (tweetObj.attachmentUrl) {
        firebase
          .storage()
          .refFromURL(tweetObj.attachmentUrl)
          .delete()
          .catch(() => {});
      }
      toast('Your tweet was deleted.');
    }, 200);
  }, []);

  return { isDeleteModalOpen, setDeleteModalOpen, onClickDelete };
};
