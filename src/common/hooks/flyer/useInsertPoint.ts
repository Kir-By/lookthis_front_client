import {useMutation, useQueryClient} from 'react-query';
import {insertPoint} from '../../apis/flyer';

type insertPointAPIParamType = {
  point: number;
  userId: string;
  flyerId: number;
  spotId: number;
};

export default (data: insertPointAPIParamType) => {
  const queryClient = useQueryClient();
  const paramData = JSON.stringify(data);
  const insertPointMutation = useMutation({
    mutationFn: () => insertPoint(data),
    onMutate: variables => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return {id: 1};
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.error(error);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(['flyerList']);
    },
  });
  return insertPointMutation;
};
