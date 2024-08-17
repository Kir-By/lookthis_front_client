import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css';
import {Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";

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
    userId: string;
    insertPointParamData: insertPointAPIParamType | undefined;
    setInsertPointParamData: Dispatch<SetStateAction<insertPointAPIParamType>>;
};

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .image-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 14.67%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.5) 90%);
    pointer-events: none;
  }
`;

const SwiperImage = ({
                         props: {images, userId, insertPointParamData, setInsertPointParamData},
                     }: PropsWithChildren<{ props: SwiperImageProps }>) => {
    const [swiperIdx, setSwiperIdx] = useState<number>(0);

    useEffect(() => {
        const flyer = images?.find((flyer, i) => i === swiperIdx);
        setInsertPointParamData({
            point: 5,
            userId: userId,
            flyerId: flyer?.flyerId,
            spotId: flyer?.spotId,
        });
    }, [images, setInsertPointParamData, swiperIdx]);

    // console.log('insertPointParamData', insertPointParamData);

    return (
        <>
            <StyledSwiper
                mousewheel={true}
                direction="vertical"
                modules={[Pagination]}
                // pagination={{clickable: true}}
                scrollbar={{draggable: true}}
                onSlideChange={swiper => setSwiperIdx(swiper.realIndex)}
            >
                {images?.map((flyer, i) => {
                    return (
                        <StyledSwiperSlide key={i} virtualIndex={i}>
                            <div className="image-container">
                                <img
                                    src={`${`https://lookthis.s3.ap-northeast-2.amazonaws.com/flyer/image${flyer?.path}`}`}
                                />
                            </div>
                        </StyledSwiperSlide>
                    );
                })}
            </StyledSwiper>
        </>
    );
};

export default SwiperImage;
