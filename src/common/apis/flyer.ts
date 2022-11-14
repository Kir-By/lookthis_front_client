import useAxios from '../hooks/common/useAxios';

type FlyerListPropType = {
  userId: string;
  lat: number;
  lng: number;
};

export const getFlyerList = async () => {
  const updateData = {userId: 'nsw2', lat: 37.5353423, lng: 127.0108803};
  try {
    const responseData = await useAxios.post('/getFlyerHistoryList', updateData).then(response => response.data);
    console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
