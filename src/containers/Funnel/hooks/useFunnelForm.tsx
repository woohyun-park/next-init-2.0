import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FunnelType {
  type: 'A' | 'B';
  door: 'white' | 'black';
  body: 'white' | 'black';
  option: string;
}

const editProfileFormSchema = yup.object().shape({
  type: yup.string().required('타입을 선택해주세요'),
  door: yup.string().required('도어를 선택해주세요'),
  body: yup.string().required('몸통을 선택해주세요'),
  option: yup.string().required('추가옵션을 선택해주세요'),
});

const useFunnelForm = (options?: UseFormProps<FunnelType>) => {
  return useForm<FunnelType>({
    resolver: yupResolver(editProfileFormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useFunnelForm;
