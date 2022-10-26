import {useCallback, useRef, useState} from 'react';
import {Lock, Unlock, XCircle} from 'react-feather';
import styled, {css} from 'styled-components';
import userImg from '../../../src/googleUser.png';

type PropType = {
  isGoalIn: boolean;
};

const Wrapper = styled.div`
  min-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgWrapper = styled.img``;

const Ball = styled.div`
  & svg {
    width: 50px;
    height: 50px;
  }
`;

const Target = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 7px solid #19ce60;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: PropType) => (props.isGoalIn ? '#19ce60' : null)};
  & svg {
  }
`;

const Flyer = () => {
  const [isGoalIn, setIsGoalIn] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const ballRef = useRef<HTMLDivElement | null>(null);

  const onDragStart = useCallback(
    (event: any) => {
      event.preventDefault();
      setIsInside(true);
      console.log('drag');
    },
    [isInside],
  );

  const onDragEnd = useCallback(
    (event: any) => {
      event.preventDefault();
      setIsGoalIn(true);
      console.log('drop');
    },
    [isGoalIn],
  );

  return (
    <>
      <Wrapper>
        <ImgWrapper src={userImg} />
        <Ball draggable ref={ballRef}>
          <XCircle />
        </Ball>
        <Target
          isGoalIn={isGoalIn}
          onDragOver={e => onDragStart(e)}
          onDragLeave={() => setIsInside(false)}
          onDrop={e => onDragEnd(e)}
        >
          {isInside ? <Unlock /> : <Lock />}
        </Target>
      </Wrapper>
    </>
  );
};

export default Flyer;
