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
  try {
    // console.log('JSON.parse(data)', JSON.parse(data));
    const responseData = await useAxios.get('/spot/getFlyerList', JSON.parse(data)).then(response => response.data);
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getFlyerHistoryList = async (data: string) => {
  try {
    const responseData = await useAxios
      .post('/spot/getFlyerHistoryList', JSON.parse(data))
      .then(response => response.data);
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const insertPoint = async (data: insertPointAPIParamType) => {
  try {
    const responseData = await useAxios.put('/spot/insertPoint', data).then(response => response.data);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
