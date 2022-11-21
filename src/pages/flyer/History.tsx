import {useDrag} from '@use-gesture/react';
import {useCallback, useRef, useState, useEffect} from 'react';
import {useQueryClient} from 'react-query';
import {Lock, Unlock, XCircle} from 'react-feather';
import {useQuery} from 'react-query';
import styled, {css} from 'styled-components';
import mobileFlyer from '../../../src/mobile-flyer.jpg';
import mobileFlyer2 from '../../../src/mobile-flyer2.jpg';
import {getFlyerHistoryList, getFlyerList} from '../../common/apis/flyer';
import useGeolocation from '../../common/hooks/location/useGeolocation';
import {device} from '../../common/style/layout/device';
import SwiperImage from '../../common/components/swiper/SwiperImage';
import Header from '../../common/components/header/Header';

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
    background-color: #19ce60;
  }

  @media ${device.tablet} {
    max-width: 1366px;
    & img {
      width: 100%;
    }

    & ${DragWrapper} {
      width: 100%;
    }
    background-color: #f4364c;
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

const History = () => {
  const queryClient = useQueryClient();
  const location = useGeolocation();
  const locationData = location.loaded ? location : null;
  const lat = location?.coordinates?.lat;
  const lng = location?.coordinates?.lng;
  console.log('locationData', locationData);
  // console.log('lat', lat);
  // console.log('lng', lng);
  const flyerListParam = JSON.stringify({userId: 'nsw2', lat: 37.504548, lng: 127.024501});
  const {data: flyerHistoryList} = useQuery<FlyerType[] | undefined>({
    queryKey: ['flyerList'],
    queryFn: () => getFlyerHistoryList(flyerListParam),
  });
  console.log('flyerHistoryList', flyerHistoryList);

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

  // drag & drop state
  const [isGoalIn, setIsGoalIn] = useState(false);
  const [isInside, setIsInside] = useState(false);

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

  return (
    <>
      <Header />
      <Wrapper>
        <SwiperImage images={flyerHistoryList} />
      </Wrapper>
    </>
  );
};

export default History;
