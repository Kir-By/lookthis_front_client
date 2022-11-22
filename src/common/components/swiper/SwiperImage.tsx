import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css';
import {Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useState} from 'react';

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

const SwiperImage = ({
  props: {images, insertPointParamData, setInsertPointParamData},
}: PropsWithChildren<{props: SwiperImageProps}>) => {
  const [swiperIdx, setSwiperIdx] = useState<number>(0);

  useEffect(() => {
    const flyer = images?.find((flyer, i) => i === swiperIdx);
    setInsertPointParamData({
      point: 5,
      userId: 'nsw2',
      flyerId: flyer?.flyerId,
      spotId: flyer?.spotId,
    });
  }, [images, setInsertPointParamData, swiperIdx]);

  // console.log('insertPointParamData', insertPointParamData);

  return (
    <>
      <Swiper
        mousewheel={true}
        direction="vertical"
        modules={[Pagination]}
        // pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        onSlideChange={swiper => setSwiperIdx(swiper.realIndex)}
      >
        {images?.map((flyer, i) => {
          return (
            <SwiperSlide key={i} virtualIndex={i}>
              <img
                src={`${`https://lookthis.s3.ap-northeast-2.amazonaws.com/flyer/image${flyer?.path}`}`}
                style={{height: '637px'}}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperImage;
