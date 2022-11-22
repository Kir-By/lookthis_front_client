import {Dispatch, SetStateAction} from 'react';
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
};

export default (data: insertPointAPIParamType, needChangeFunc: needChangeType) => {
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
      needChangeFunc.setIsGoalIn(false);
      needChangeFunc.setIsInside(false);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(['flyerList']);
    },
  });
  return insertPointMutation;
};
