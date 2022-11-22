import useAxios from '../hooks/common/useAxios';

type FlyerListPropType = {
  userId: string;
  lat: number;
  lng: number;
};

type insertPointAPIParamType = {
  point: number;
  userId: string;
  flyerId?: number;
  spotId?: number;
};

export const getFlyerList = async (data: string) => {
  const updateData = {userId: 'nsw2', lat: 37.504548, lng: 127.024501};
  try {
    const responseData = await useAxios.post('/getFlyerList', JSON.parse(data)).then(response => response.data);
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getFlyerHistoryList = async (data: string) => {
  const updateData = {userId: 'nsw2', lat: 37.504548, lng: 127.024501};
  try {
    const responseData = await useAxios.post('/getFlyerHistoryList', JSON.parse(data)).then(response => response.data);
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const insertPoint = async (data: insertPointAPIParamType) => {
  try {
    const responseData = await useAxios.put('/insertPoint', data).then(response => response.data);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
