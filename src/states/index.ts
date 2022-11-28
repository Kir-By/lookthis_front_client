import {atom} from 'recoil';

type User = {
  name: string;
  userId: string;
};

const user: User = {
  name: '',
  userId: '',
};

// user 정보
const userState = atom({
  key: `user`,
  default: user,
});

const currentPosition = atom({
  key: `currentPosition`,
  default: {
    lat: 37.504548,
    lng: 127.024501,
  },
});

export {userState, currentPosition};
