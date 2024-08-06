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
    const parsedData: FlyerListPropType = JSON.parse(data);
    console.log('Parsed data:', parsedData);

    const responseData = await useAxios.get('/spot/flyers', { params: parsedData }).then(response => response.data);
    console.log('Response data:', responseData);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getFlyerHistoryList = async (data: string) => {
  try {
    const responseData = await useAxios

      .get('/spot/history/flyers', { params:  JSON.parse(data) })

      .then(response => response.data);
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const insertPoint = async (data: insertPointAPIParamType) => {
  try {
    const responseData = await useAxios.put('/spot/point', data).then(response => response.data);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
