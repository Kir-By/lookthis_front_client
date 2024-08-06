import useAxios from '../hooks/common/useAxios';

export const getUser = async (data: string) => {
  try {
    const responseData = await useAxios
        .get('/user', {params:JSON.parse(data)})
        .then(response => response.data);

    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getPointHistoryList = async (data: string) => {
  try {
    const responseData = await useAxios

      .get('user/history/points', {params:JSON.parse(data)})
      .then(response => response.data);
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    // console.error(error);
  }
};
