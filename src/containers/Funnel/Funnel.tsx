import { Box, Input, Select } from '@chakra-ui/react';

import useFunnel from '@/hooks/useFunnel/useFunnel';

import FunnelPage from './components/FunnelPage';
import useFunnelForm from './hooks/useFunnelForm';

function Funnel() {
  const { register, getValues } = useFunnelForm({});
  const [Funnel, setStep] =
    useFunnel<
      ['타입선택', '도어선택', '몸통선택', '추가옵션선택', '최종내역보기']
    >('타입선택');

  return (
    <Funnel>
      <Funnel.Step name="타입선택">
        <FunnelPage title="타입선택" onNext={() => setStep('도어선택')}>
          <Select placeholder="타입" {...register('type')} variant="flushed">
            <option>A</option>
            <option>B</option>
          </Select>
        </FunnelPage>
      </Funnel.Step>
      <Funnel.Step name="도어선택">
        <FunnelPage
          title="도어선택"
          onPrevious={() => setStep('타입선택')}
          onNext={() => setStep('몸통선택')}
        >
          <Select placeholder="도어" {...register('door')} variant="flushed">
            <option>White</option>
            <option>Black</option>
          </Select>
        </FunnelPage>
      </Funnel.Step>
      <Funnel.Step name="몸통선택">
        <FunnelPage
          title="몸통선택"
          onPrevious={() => setStep('도어선택')}
          onNext={() => setStep('추가옵션선택')}
        >
          <Select placeholder="몸통" {...register('body')} variant="flushed">
            <option>White</option>
            <option>Black</option>
          </Select>
        </FunnelPage>
      </Funnel.Step>
      <Funnel.Step name="추가옵션선택">
        <FunnelPage
          title="추가옵션선택"
          onPrevious={() => setStep('몸통선택')}
          onNext={() => setStep('최종내역보기')}
        >
          <Input {...register('option')} />
        </FunnelPage>
      </Funnel.Step>
      <Funnel.Step name="최종내역보기">
        <FunnelPage
          title="최종내역보기"
          onPrevious={() => setStep('추가옵션선택')}
        >
          <Box>타입: {getValues().type}</Box>
          <Box>도어: {getValues().door}</Box>
          <Box>몸통: {getValues().body}</Box>
          <Box>추가옵션: {getValues().option}</Box>
        </FunnelPage>
      </Funnel.Step>
    </Funnel>
  );
}

export default Funnel;
