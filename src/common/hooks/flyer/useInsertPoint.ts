import {Dispatch, SetStateAction, useCallback} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {insertPoint} from '../../apis/flyer';

type insertPointAPIParamType = {
  point: number;
  userId: string;
  flyerId?: number;
  spotId?: number;
};

type needChangeType = {
  setIsGoalIn: Dispatch<SetStateAction<boolean>>;
  setIsInside: Dispatch<SetStateAction<boolean>>;
  setGivePoint: Dispatch<SetStateAction<number[]>>;
};

export default (data: insertPointAPIParamType, needChangeFunc: needChangeType, queryKey: Array<string>) => {
  const userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
  // 1~10 point 난수 생성 함수
  const onRandomPoint = useCallback(() => {
    return Math.floor(Math.random() * 10 + 1);
  }, []);
  const queryClient = useQueryClient();
  const paramData = JSON.stringify(data);
  const insertPointMutation = useMutation({
    mutationFn: () => insertPoint(data),
    onMutate: () => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return {id: 1};
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.error(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries(queryKey);
      needChangeFunc.setIsGoalIn(false);
      needChangeFunc.setIsInside(false);
      needChangeFunc.setGivePoint([onRandomPoint(), onRandomPoint()]);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(['pointHistoryList', userInfo?.userId]);
      queryClient.invalidateQueries(['userInfo', userInfo?.userId]);
    },
  });
  return insertPointMutation;
};
