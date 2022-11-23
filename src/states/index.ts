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

export {userState};
