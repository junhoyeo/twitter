import { atom, AtomEffect } from 'recoil';

const localStorageEffect =
  (key: string): AtomEffect<any[]> =>
  ({ setSelf, onSet }) => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const bookmarksAtom = atom<any[]>({
  key: 'Bookmarks',
  default: [],
  effects_UNSTABLE: [localStorageEffect('@bookmarks')],
});
