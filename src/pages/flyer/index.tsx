import {useDrag} from '@use-gesture/react';
import {useCallback, useRef, useState, useEffect, Dispatch, SetStateAction} from 'react';
import {useQueryClient} from 'react-query';
import {Lock, Unlock, XCircle} from 'react-feather';
import {useQuery} from 'react-query';
import styled, {css} from 'styled-components';
import mobileFlyer from '../../../src/mobile-flyer.jpg';
import mobileFlyer2 from '../../../src/mobile-flyer2.jpg';
import {getFlyerList} from '../../common/apis/flyer';
import useGeolocation from '../../common/hooks/location/useGeolocation';
import {device} from '../../common/style/layout/device';
import SwiperImage from '../../common/components/swiper/SwiperImage';
import Header from '../../common/components/header/Header';
import useInsertPoint from '../../common/hooks/flyer/useInsertPoint';

type MovePropType = {
  circlePosition: PositionType;
};

type PositionType = {
  x: number;
  y: number;
};

type DragPropType = {
  isGoalIn: boolean;
};

type FlyerListPropType = {
  userId: string;
  lat: number | undefined;
  lng: number | undefined;
};

type FlyerType = {
  createDate: Date;
  endValidDate: Date;
  flyerId: number;
  path: string;
  status: number;
  storeId: number;
  spotId: number;
};

type insertPointAPIParamType = {
  point: number;
  userId: string;
  flyerId?: number;
  spotId?: number;
};

type SwiperImageProps = {
  images: FlyerType[] | undefined;
  insertPointParamData: insertPointAPIParamType | undefined;
  setInsertPointParamData: Dispatch<SetStateAction<insertPointAPIParamType>>;
};

type needChangeType = {
  setIsGoalIn: Dispatch<SetStateAction<boolean>>;
  setIsInside: Dispatch<SetStateAction<boolean>>;
};

const Ball = styled.div`
  z-index: 9999px;
  position: relative;
  left: ${(prop: MovePropType) => prop.circlePosition.x}px;
  top: ${(prop: MovePropType) => prop.circlePosition.y}px;
  & svg {
    width: 50px;
    height: 50px;
  }
`;

const Target = styled.div`
  position: relative;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 7px solid #19ce60;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: DragPropType) => (props.isGoalIn ? '#19ce60' : null)};
  & svg {
  }
`;

const ImgWrapper = styled.img`
  position: relative;
`;

const DragWrapper = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  justify-content: center;
  & ${Ball} {
    position: relative;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 0 0 50px 0;
  min-height: calc(100vh - 140px);
  max-width: 1680px;
  position: relative;
  width: 100%;
  height: inherit;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${device.mobile} {
    max-width: 767px;
    & img {
      width: 100%;
    }

    & ${DragWrapper} {
      width: 100%;
    }
    background-color: #f4364c;
  }

  @media ${device.tablet} {
    max-width: 1366px;
    & img {
      width: 100%;
    }

    & ${DragWrapper} {
      width: 100%;
    }
    background-color: #19ce60;
  }

  @media ${device.laptop} {
    max-width: 1679px;
    & img {
      width: 100%;
    }

    & ${DragWrapper} {
      width: 100%;
    }
    background-color: #a500d8;
  }
`;

const Flyer = () => {
  const queryClient = useQueryClient();
  const location = useGeolocation();
  const locationData = location.loaded ? location : null;
  const lat = location?.coordinates?.lat;
  const lng = location?.coordinates?.lng;

  // console.log('lat', lat);
  // console.log('lng', lng);
  const flyerListParam = JSON.stringify({userId: 'nsw2', lat: 37.504548, lng: 127.024501});
  const {data: flyerList} = useQuery<FlyerType[] | undefined>({
    queryKey: ['flyerList'],
    queryFn: () => getFlyerList(flyerListParam),
  });

  // insertPoint를 위한 paramState
  const [insertPointParamData, setInsertPointParamData] = useState<insertPointAPIParamType>({
    point: 5,
    userId: 'nsw2',
    flyerId: flyerList ? flyerList[0]?.flyerId : 1,
    spotId: flyerList ? flyerList[0]?.spotId : 1,
  });

  // drag & drop state
  const [isGoalIn, setIsGoalIn] = useState(false);
  const [isInside, setIsInside] = useState(false);

  const needChangeFunc = {
    setIsGoalIn,
    setIsInside,
  };

  // insertPoint를 위한 mutation
  const insertPointMutation = useInsertPoint(insertPointParamData, needChangeFunc);

  // insertPoint를 위한 func
  const onInsertPoint = useCallback(() => {
    setIsGoalIn(true);
    setIsInside(true);
    insertPointMutation.mutate();
  }, [insertPointMutation]);

  // move state
  const ballRef = useRef<HTMLDivElement>(null);
  const [circlePosition, setCirclePosition] = useState<PositionType>({x: 0, y: 0});

  // use-gesture-hook 사용
  const bindCirclePosition = useDrag(param => {
    setCirclePosition({
      x: param.offset[0],
      y: 0,
    });
  });

  // move 이벤트

  // drag & drop 이벤트
  const onDragStart = useCallback(
    (event: any) => {
      console.log('event', event);
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

  const insertPointParam = {
    point: 5,
    userId: 'nsw2',
    flyerId: 2,
    spotId: 1,
  };

  return (
    <>
      <Header />
      <Wrapper>
        {/* {flyerList?.map((flyer: FlyerType) => (
          <ImgWrapper
            key={flyer?.flyerId}
            src={`https://lookthis.s3.ap-northeast-2.amazonaws.com/flyer/image${flyer?.path}`}
          />
        ))} */}
        <SwiperImage
          props={{
            images: flyerList,
            insertPointParamData,
            setInsertPointParamData,
          }}
        />
        <DragWrapper>
          <Ball circlePosition={circlePosition} {...bindCirclePosition()} ref={ballRef}>
            <XCircle />
          </Ball>
          {/* <Target
            isGoalIn={isGoalIn}
            onDragOver={e => onDragStart(e)}
            onDragLeave={() => setIsInside(false)}
            onDrop={e => onDragEnd(e)}
          >
            {isInside ? <Unlock /> : <Lock />}
          </Target> */}
          <Target
            isGoalIn={isGoalIn}
            onClick={() => {
              onInsertPoint();
            }}
          >
            {isInside ? <Unlock /> : <Lock />}
          </Target>
        </DragWrapper>
        {/* {location.loaded ? JSON.stringify(location) : 'Location data not available yet !'} */}
      </Wrapper>
    </>
  );
};

export default Flyer;
