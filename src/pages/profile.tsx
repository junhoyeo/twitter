import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useFirebase } from '../utils/firebase';

const ProfilePage = () => {
  const firebase = useFirebase();
  const [firestore, auth] = [firebase.firestore(), firebase.auth()];
  const user = auth.currentUser;

  const router = useRouter();
  useEffect(() => {
    if (!firestore) {
      return;
    }
    if (!user) {
      router.replace('/landing');
      return;
    }
    router.replace(`/user/${user.uid}`);
  }, []);

  return null;
};

export default ProfilePage;
