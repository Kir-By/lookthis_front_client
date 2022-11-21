import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css';

type FlyerType = {
  createDate: Date;
  endValidDate: Date;
  flyerId: number;
  path: string;
  status: number;
  storeId: number;
};

const SwiperImage = ({images}: {images: FlyerType[] | undefined}) => {
  return (
    <>
      <Swiper
        mousewheel={true}
        direction="vertical"
        modules={[Pagination]}
        // pagination={{clickable: true}}
        scrollbar={{draggable: true}}
      >
        {images?.map((flyer, i) => (
          <SwiperSlide key={i}>
            <img
              src={`${`https://lookthis.s3.ap-northeast-2.amazonaws.com/flyer/image${flyer?.path}`}`}
              style={{height: '637px'}}
            />
          </SwiperSlide>
        ))}
      </Swiper>{' '}
    </>
  );
};

export default SwiperImage;
